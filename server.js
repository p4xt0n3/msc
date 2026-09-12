const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

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
