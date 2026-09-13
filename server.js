const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const DALIAN_RADIO_SOURCE = 'https://ngcdn002.cnr.cn/live/jjzs';
const RADIO_BROWSER_MIRRORS = ['https://de1.api.radio-browser.info/json', 'https://fi1.api.radio-browser.info/json'];
const chinaRadioAllowedHosts = new Map();
const CHINA_RADIO_STREAM_DOMAINS = ['qtfm.cn', 'qingting.fm', 'cnr.cn', 'myalicdn.com', 'ifeng.com', 'hndt.com', 'gdtv.cn', 'gdtv.com', 'vojs.cn', 'ximalaya.com', 'ximalaya.fm', 'zeno.fm', 'infomaniak.ch', 'rthk.hk', 'rti.org.tw', 'ginnet.cloud', 'akamaized.net'];

function radioHeaders(contentType) {
  return {
    'access-control-allow-origin': '*',
    'cache-control': 'no-store, no-cache, must-revalidate',
    'content-type': contentType,
  };
}

function browserHeaders() {
  return { accept: 'application/json', 'user-agent': 'StellarMusic/1.0 radio directory' };
}

function isChineseStation(station) {
  const languages = `${station.language || ''},${station.languagecodes || ''}`.toLowerCase();
  return languages.includes('chinese') || languages.split(',').some((value) => ['zh', 'cmn', 'yue'].includes(value.trim())) || /[\u4e00-\u9fff]/.test(station.name || '');
}

async function fetchRadioBrowser(path) {
  let lastError;
  for (const mirror of RADIO_BROWSER_MIRRORS) {
    try {
      const response = await fetch(`${mirror}${path}`, { headers: browserHeaders() });
      if (response.ok) return response;
      lastError = new Error(`Radio directory returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('Radio directory unavailable');
}

async function chinaRadioDirectory() {
  const response = await fetchRadioBrowser('/stations/bycountry/China?hidebroken=true&order=votes&reverse=true&limit=1000');
  const stations = await response.json();
  return stations
    .filter((station) => station.lastcheckok === 1 && isChineseStation(station) && (station.url_resolved || station.url))
    .map((station, index) => ({
      id: station.stationuuid,
      name: String(station.name || '').trim() || `Chinese station ${index + 1}`,
      state: String(station.state || '').trim(),
      tags: String(station.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 3),
      homepage: station.homepage || '',
      streamUrl: station.url_resolved || station.url || '',
      codec: station.codec || 'LIVE',
      bitrate: station.bitrate || 0,
      hls: Boolean(station.hls),
      votes: station.votes || 0,
    }));
}

function encodeRadioUrl(value) {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeRadioUrl(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  return atob(padded);
}

function isTrustedChinaRadioHost(host) {
  const normalized = host.toLowerCase();
  return CHINA_RADIO_STREAM_DOMAINS.some((domain) => normalized === domain || normalized.endsWith(`.${domain}`));
}

function chinaRadioAssetUrl(stationId, sourceUrl) {
  return `/api/radio/china/asset/${encodeURIComponent(stationId)}/${encodeRadioUrl(sourceUrl)}`;
}

function rewriteChinaPlaylist(playlist, sourceUrl, stationId) {
  const allowedHosts = chinaRadioAllowedHosts.get(stationId) || new Set();
  chinaRadioAllowedHosts.set(stationId, allowedHosts);
  allowedHosts.add(new URL(sourceUrl).host);
  return playlist.split('\n').map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;
    if (trimmed.startsWith('#')) {
      return line.replace(/URI="([^"]+)"/g, (_match, uri) => {
        const assetUrl = new URL(uri, sourceUrl);
        allowedHosts.add(assetUrl.host);
        return `URI="${chinaRadioAssetUrl(stationId, assetUrl.href)}"`;
      });
    }
    const assetUrl = new URL(trimmed, sourceUrl);
    allowedHosts.add(assetUrl.host);
    return chinaRadioAssetUrl(stationId, assetUrl.href);
  }).join('\n');
}

async function getChinaStation(stationId) {
  if (!/^[a-f0-9-]{36}$/i.test(stationId)) return null;
  const response = await fetchRadioBrowser(`/stations/byuuid/${encodeURIComponent(stationId)}`);
  const stations = await response.json();
  const station = Array.isArray(stations) ? stations[0] : null;
  if (!station || !isChineseStation(station)) return null;
  return station;
}

async function chinaRadioStream(request, stationId) {
  const station = await getChinaStation(stationId);
  const source = station?.url_resolved || station?.url;
  if (!source) return new Response('Station not found', { status: 404 });
  const sourceUrl = new URL(source);
  if (!['http:', 'https:'].includes(sourceUrl.protocol)) return new Response('Unsupported station', { status: 400 });
  const response = await fetch(source, { headers: { accept: '*/*', 'user-agent': 'StellarMusic/1.0 radio player' } });
  if (!response.ok) return new Response('Station unavailable', { status: 502 });
  const contentType = response.headers.get('content-type') || '';
  const isPlaylist = Boolean(station.hls) || /\.m3u8(?:$|[?#])/i.test(sourceUrl.pathname + sourceUrl.search) || contentType.includes('mpegurl');
  if (isPlaylist) {
    const playlist = await response.text();
    return new Response(rewriteChinaPlaylist(playlist, response.url || source, stationId), { status: 200, headers: radioHeaders('application/vnd.apple.mpegurl; charset=utf-8') });
  }
  return new Response(response.body, { status: 200, headers: radioHeaders(contentType || 'audio/mpeg') });
}

async function chinaRadioAsset(stationId, encodedUrl) {
  const station = await getChinaStation(stationId);
  const source = station?.url_resolved || station?.url;
  if (!source) return new Response('Station not found', { status: 404 });
  let target;
  try { target = new URL(decodeRadioUrl(encodedUrl)); } catch { return new Response('Invalid stream asset', { status: 400 }); }
  const sourceHost = new URL(source).host;
  const allowedHosts = chinaRadioAllowedHosts.get(stationId) || new Set([sourceHost]);
  if (!['http:', 'https:'].includes(target.protocol) || (!allowedHosts.has(target.host) && !isTrustedChinaRadioHost(target.hostname))) return new Response('Invalid stream asset', { status: 400 });
  const response = await fetch(target.href, { headers: { accept: '*/*', 'user-agent': 'StellarMusic/1.0 radio player' } });
  if (!response.ok) return new Response('Stream asset unavailable', { status: 502 });
  const contentType = response.headers.get('content-type') || '';
  const isPlaylist = /\.m3u8(?:$|[?#])/i.test(target.pathname + target.search) || contentType.includes('mpegurl');
  if (isPlaylist) {
    const playlist = await response.text();
    return new Response(rewriteChinaPlaylist(playlist, response.url || target.href, stationId), { status: 200, headers: radioHeaders('application/vnd.apple.mpegurl; charset=utf-8') });
  }
  return new Response(response.body, { status: 200, headers: radioHeaders(contentType || 'video/mp2t') });
}

async function dalianRadio(request, url) {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  const segmentMatch = url.pathname.match(/^\/api\/radio\/dalian-1043\/segment\/([A-Za-z0-9._-]+)$/);
  if (segmentMatch) {
    const segmentName = segmentMatch[1];
    if (!/^\d+\.ts$/.test(segmentName)) return new Response('Not found', { status: 404 });
    const response = await fetch(`${DALIAN_RADIO_SOURCE}/${segmentName}`);
    if (!response.ok) return new Response('Upstream segment unavailable', { status: 502 });
    return new Response(response.body, { status: response.status, headers: radioHeaders('video/mp2t') });
  }

  const response = await fetch(`${DALIAN_RADIO_SOURCE}/index.m3u8`, {
    headers: { accept: 'application/vnd.apple.mpegurl' },
  });
  if (!response.ok) return new Response('Upstream radio unavailable', { status: 502 });
  const playlist = await response.text();
  const rewrittenPlaylist = playlist.split('\n').map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return line;
    const segmentName = new URL(trimmed, `${DALIAN_RADIO_SOURCE}/index.m3u8`).pathname.split('/').pop();
    return `/api/radio/dalian-1043/segment/${encodeURIComponent(segmentName)}`;
  }).join('\n');
  return new Response(rewrittenPlaylist, { status: 200, headers: radioHeaders('application/vnd.apple.mpegurl; charset=utf-8') });
}

function videoIdFromUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || '';
    if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v') || '';
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') return parts[1] || '';
    }
  } catch {}
  return '';
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/radio/dalian-1043' || url.pathname.startsWith('/api/radio/dalian-1043/segment/')) {
      try { return await dalianRadio(request, url); } catch { return new Response('Radio unavailable', { status: 502 }); }
    }
    if (url.pathname === '/api/radio/china') {
      if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
      try {
        const stations = await chinaRadioDirectory();
        return new Response(JSON.stringify({ stations }), { status: 200, headers: { ...radioHeaders('application/json; charset=utf-8'), 'cache-control': 'public, max-age=300' } });
      } catch { return new Response(JSON.stringify({ error: 'Chinese radio directory unavailable' }), { status: 502, headers: radioHeaders('application/json; charset=utf-8') }); }
    }
    const chinaStreamMatch = url.pathname.match(/^\/api\/radio\/china\/stream\/([A-Fa-f0-9-]{36})$/);
    if (chinaStreamMatch) {
      if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
      try { return await chinaRadioStream(request, chinaStreamMatch[1]); } catch { return new Response('Radio unavailable', { status: 502 }); }
    }
    const chinaAssetMatch = url.pathname.match(/^\/api\/radio\/china\/asset\/([A-Fa-f0-9-]{36})\/([A-Za-z0-9_-]+)$/);
    if (chinaAssetMatch) {
      if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
      try { return await chinaRadioAsset(chinaAssetMatch[1], chinaAssetMatch[2]); } catch { return new Response('Stream asset unavailable', { status: 502 }); }
    }
    if (url.pathname !== '/api/youtube-info') return Response.json({ error: 'Not found' }, { status: 404 });
    if (request.method !== 'POST') return Response.json({ error: 'Use POST' }, { status: 405 });

    try {
      const body = await request.json();
      const videoId = videoIdFromUrl(String(body?.url || ''));
      if (!YOUTUBE_ID.test(videoId)) return Response.json({ error: 'Enter a valid YouTube video link.' }, { status: 400 });

      const sourceUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(sourceUrl)}&format=json`, {
        headers: { accept: 'application/json' },
      });
      if (!response.ok) return Response.json({ error: 'YouTube could not provide details for that video.' }, { status: 502 });
      const info = await response.json();
      return Response.json({
        videoId,
        title: info.title || 'YouTube video',
        artist: info.author_name || 'YouTube',
        thumbnail: info.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      });
    } catch {
      return Response.json({ error: 'That YouTube link could not be loaded right now.' }, { status: 502 });
    }
  },
};
