const icons = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z"/>',
  radio: '<path d="M4.9 19.1a10 10 0 1 1 14.2 0"/><path d="M8.4 15.6a5 5 0 1 1 7.2 0"/><circle cx="12" cy="12" r="1"/>',
  heart: '<path d="M20.8 8.8c0 5.4-8.8 10.1-8.8 10.1S3.2 14.2 3.2 8.8A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.4Z"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  sparkles: '<path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2zM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7z"/>',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
  'more-horizontal': '<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>', 'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/>',
  'play-filled': '<path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none"/>', 'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  shuffle: '<path d="M3 6h3c5 0 7 12 12 12h3M18 15l3 3-3 3M3 18h3c1.4 0 2.4-1 3.3-2.3M15.7 8.3C16.5 7 17.5 6 19 6h2M18 3l3 3-3 3"/>',
  'skip-back': '<path d="M6 5v14M18 6l-8 6 8 6z"/>', 'skip-forward': '<path d="M18 5v14M6 6l8 6-8 6z"/>', repeat: '<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
  'mic-2': '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v4m-4 0h8"/>', 'list-music': '<path d="M21 15V4M3 10h11M3 15h11M3 20h7M16 8h5"/>', 'volume-2': '<path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>', 'maximize-2': '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'
};

const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;
const viewRoot = document.querySelector('#viewRoot');
const audio = document.querySelector('#audioEngine');
const searchInput = document.querySelector('#searchInput');
const progress = document.querySelector('#progress');
const durationLabel = document.querySelector('#duration');
const elapsedLabel = document.querySelector('#elapsed');
const toast = document.querySelector('#toast');
const randomButton = document.querySelector('#randomButton');
const loopButton = document.querySelector('#loopButton');

let currentTrack = null;
let currentQueue = [...catalogTracks];
let currentQueueIndex = -1;
let playMode = 'normal';
let isPlaying = false;
let toastTimer;
let routeHistory = [{ type: 'home' }];
let routeIndex = 0;
const accountStorageKey = 'stellarmusic-account';
const sessionStorageKey = 'stellarmusic-session';
const legacyAccountStorageKey = 'pulse-account';
const legacySessionStorageKey = 'pulse-session';

function readAccount() {
  try { return JSON.parse(localStorage.getItem(accountStorageKey) || localStorage.getItem(legacyAccountStorageKey) || 'null'); } catch { return null; }
}

function hasSession() {
  return localStorage.getItem(sessionStorageKey) === 'true' || localStorage.getItem(legacySessionStorageKey) === 'true';
}

let currentUsername = readAccount()?.username || 'New listener';
const lyricsPanel = document.querySelector('#lyricsPanel');
const lyricsContent = document.querySelector('#lyricsContent');
const lyricsTitle = document.querySelector('#lyricsTitle');
const lyricsArtist = document.querySelector('#lyricsArtist');
const lyricsCache = new Map();
let parsedLyrics = [];
let activeLyricIndex = -1;
const demoAudioCache = new Map();
const youtubeForm = document.querySelector('#youtubeForm');
const youtubeUrl = document.querySelector('#youtubeUrl');
const youtubeSubmit = document.querySelector('#youtubeSubmit');
const youtubeStatus = document.querySelector('#youtubeStatus');
const externalVideoPlayer = document.querySelector('#externalVideoPlayer');
const youtubeTracks = [];
const youtubeHistoryStorageKey = 'stellarmusic-youtube-history';
let youtubePlayer = null;
let youtubePlayerReady = false;
let youtubeApiReady = false;
let pendingYoutubeTrack = null;
let youtubeProgressTimer = null;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function readYoutubeHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(youtubeHistoryStorageKey) || '[]');
    return Array.isArray(history) ? history.filter((track) => track?.youtubeId && track?.title).slice(0, 30) : [];
  } catch { return []; }
}

function recordYoutubeHistory(track) {
  if (!track?.youtubeId) return;
  const entry = {
    id: `youtube-${track.youtubeId}`,
    title: String(track.title || 'YouTube video'),
    artist: String(track.artist || 'YouTube'),
    album: 'YouTube',
    duration: track.duration || '—',
    art: '▶',
    artClass: 'art-youtube',
    youtubeId: track.youtubeId,
    playedAt: Date.now(),
  };
  const nextHistory = [entry, ...readYoutubeHistory().filter((item) => item.youtubeId !== entry.youtubeId)].slice(0, 30);
  try { localStorage.setItem(youtubeHistoryStorageKey, JSON.stringify(nextHistory)); } catch {}
  if (routeHistory[routeIndex]?.type === 'history') renderHistory();
}

document.querySelectorAll('[data-icon]').forEach((element) => { element.innerHTML = icon(element.dataset.icon); });

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

function updatePlayModeControls() {
  const isRandom = playMode === 'random';
  const isLoop = playMode === 'loop';
  randomButton.classList.toggle('mode-active', isRandom);
  loopButton.classList.toggle('mode-active', isLoop);
  randomButton.setAttribute('aria-pressed', String(isRandom));
  loopButton.setAttribute('aria-pressed', String(isLoop));
}

function setPlayMode(mode) {
  playMode = playMode === mode ? 'normal' : mode;
  updatePlayModeControls();
  showToast(`${playMode === 'normal' ? 'Normal' : playMode === 'random' ? 'Random' : 'Loop'} mode`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function setAccountUser(username) {
  currentUsername = username || 'New listener';
  const cleanName = currentUsername.slice(0, 1).toUpperCase() + currentUsername.slice(1);
  const avatar = cleanName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'NL';
  document.querySelector('#profileName').textContent = cleanName;
  document.querySelector('#profileAvatar').textContent = avatar;
  document.querySelector('#profileStatus').textContent = username ? 'Remembered locally' : 'Free plan';
}

const authOverlay = document.querySelector('#authOverlay');
const authForm = document.querySelector('#authForm');
const authUsername = document.querySelector('#authUsername');
const authPassword = document.querySelector('#authPassword');
const authConfirm = document.querySelector('#authConfirm');
const authConfirmLabel = document.querySelector('#authConfirmLabel');
const authTitle = document.querySelector('#authTitle');
const authSubtitle = document.querySelector('#authSubtitle');
const authSubmit = document.querySelector('#authSubmit');
const authSwitch = document.querySelector('#authSwitch');
const authError = document.querySelector('#authError');
const accountActions = document.querySelector('#accountActions');
let authMode = 'register';

function openAuth(mode = 'register', required = false) {
  authMode = mode;
  const account = readAccount();
  authOverlay.hidden = false;
  authOverlay.setAttribute('aria-hidden', 'false');
  document.querySelector('#authClose').hidden = required;
  authForm.hidden = mode === 'account';
  accountActions.hidden = mode !== 'account';
  authError.textContent = '';
  if (mode === 'register') {
    authTitle.textContent = 'Join the rhythm.';
    authSubtitle.textContent = 'Create an account to save your place and make StellarMusic yours.';
    authConfirmLabel.hidden = false;
    authSubmit.innerHTML = 'Create account <span>↗</span>';
    authSwitch.innerHTML = 'Already have an account? <button type="button" id="authSwitchButton">Sign in</button>';
  } else if (mode === 'login') {
    authTitle.textContent = 'Welcome back.';
    authSubtitle.textContent = `Sign in as ${account?.username || 'a returning listener'} to continue.`;
    authConfirmLabel.hidden = true;
    authSubmit.innerHTML = 'Sign in <span>↗</span>';
    authSwitch.innerHTML = 'New to StellarMusic? <button type="button" id="authSwitchButton">Create an account</button>';
    authUsername.value = account?.username || '';
  } else {
    authTitle.textContent = `Hey, ${currentUsername}.`;
    authSubtitle.textContent = 'Your account is ready on this browser, so StellarMusic can remember you next time.';
  }
  const switchButton = document.querySelector('#authSwitchButton');
  if (switchButton) switchButton.onclick = () => openAuth(authMode === 'register' ? 'login' : 'register', false);
  if (mode !== 'account') setTimeout(() => authUsername.focus(), 40);
}

function closeAuth() {
  if (!hasSession()) return;
  authOverlay.hidden = true;
  authOverlay.setAttribute('aria-hidden', 'true');
}

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  authError.textContent = '';
  authSubmit.disabled = true;
  try {
    const username = authUsername.value.trim();
    const password = authPassword.value;
    if (authMode === 'register') {
      if (password !== authConfirm.value) throw new Error('Your passwords do not match.');
      if (username.length < 2) throw new Error('Username must be at least 2 characters.');
      const account = { username, passwordHash: await hashPassword(password) };
      localStorage.setItem(accountStorageKey, JSON.stringify(account));
      localStorage.setItem(sessionStorageKey, 'true');
      setAccountUser(username);
      closeAuth();
      renderRoute(routeHistory[routeIndex]);
      showToast(`Welcome to StellarMusic, ${username}`);
    } else {
      const account = readAccount();
      if (!account || username.toLowerCase() !== account.username.toLowerCase() || await hashPassword(password) !== account.passwordHash) throw new Error('That username or password is not right.');
      localStorage.setItem(sessionStorageKey, 'true');
      setAccountUser(account.username);
      closeAuth();
      renderRoute(routeHistory[routeIndex]);
      showToast(`Welcome back, ${account.username}`);
    }
  } catch (error) { authError.textContent = error.message; }
  authSubmit.disabled = false;
});

document.querySelector('#authClose').addEventListener('click', closeAuth);
document.querySelector('#profileButton').addEventListener('click', () => openAuth('account', false));
document.querySelector('#signOutButton').addEventListener('click', () => {
  localStorage.removeItem(sessionStorageKey);
  setAccountUser('');
  openAuth('login', true);
});

function trackRow(track, index = 0) {
  return `<div class="track ${currentTrack?.id === track.id ? 'active' : ''}" data-track-row="${escapeHtml(track.id)}">
    <div class="track-number">${String(index + 1).padStart(2, '0')}</div>
    <button class="track-play" aria-label="Play ${escapeHtml(track.title)}" data-track="${escapeHtml(track.id)}" data-youtube-id="${escapeHtml(track.youtubeId || '')}">${icon('play-filled')}</button>
    <div class="track-info"><span class="track-art ${escapeHtml(track.artClass || '')}">${escapeHtml(track.art || '♪')}</span><div><strong>${escapeHtml(track.title)}</strong><span>${escapeHtml(track.artist)}</span></div></div>
    <div class="track-album">${escapeHtml(track.album)}</div><span class="track-duration">${escapeHtml(track.duration)}</span>
    <button class="track-heart" aria-label="Like ${escapeHtml(track.title)}">${icon('heart')}</button>
  </div>`;
}

function trackList(tracks) {
  return `<div class="track-list">${tracks.length ? tracks.map(trackRow).join('') : '<div class="empty-state">No songs found</div>'}</div>`;
}

function artistCard(artist) {
  return `<button class="artist-card" data-route="artist" data-id="${artist.id}">
    <span class="artist-avatar ${artist.artClass}">${artist.initials}</span><strong>${artist.name}</strong><small>${artist.genre}</small><span class="artist-link">View artist ${icon('arrow-up-right')}</span>
  </button>`;
}

function albumCard(album, artist) {
  return `<button class="catalog-album" data-route="album" data-id="${album.id}">
    <span class="album-art ${album.artClass}">${album.art || '✦'}</span><strong>${album.title}</strong><small>${artist.name}${album.year ? ` · ${album.year}` : ''}</small>
  </button>`;
}

function renderHome() {
  const quickTracks = catalogTracks.slice(0, 7);
  const featured = catalogArtists[0];
  const featuredAlbum = featured.albums[0];
  viewRoot.innerHTML = `<div class="greeting-row"><div><p class="eyebrow">Monday, September 07</p><h1>Good evening, ${currentUsername} <span>✦</span></h1></div><button class="icon-button" aria-label="More options">${icon('more-horizontal')}</button></div>
    <section class="hero-grid"><article class="hero-card"><div class="hero-content"><span class="eyebrow">Your daily mix</span><h2>Find your<br /><em>frequency.</em></h2><p>A handpicked mix from the artists in your library, refreshed every day.</p><button class="primary-button" data-track="${quickTracks[0].id}">${icon('play-filled')} Play mix</button></div><div class="hero-art" aria-hidden="true"><div class="orb orb-one"></div><div class="orb orb-two"></div><div class="orb orb-three"></div><span class="hero-note note-one">♪</span><span class="hero-note note-two">·</span></div><div class="hero-glow"></div></article>
    <article class="feature-card"><div class="feature-art album-art ${featuredAlbum.artClass}"><span>✦</span></div><div class="feature-copy"><span class="eyebrow">Featured artist</span><h3>${featured.name}</h3><p>${featured.genre}</p><button class="text-button" data-route="artist" data-id="${featured.id}">Open artist ${icon('arrow-up-right')}</button></div></article></section>
    <section class="section-block"><div class="section-heading"><div><span class="eyebrow">Your artists</span><h2>Made for your ears</h2></div><button class="see-all" data-route="artists">See all ${icon('arrow-right')}</button></div><div class="artist-row">${catalogArtists.slice(0, 4).map(artistCard).join('')}</div></section>
    <section class="section-block quick-picks"><div class="section-heading"><div><span class="eyebrow">Curated for you</span><h2>Quick picks</h2></div><button class="see-all" data-route="albums">All albums ${icon('arrow-right')}</button></div>${trackList(quickTracks)}</section>`;
}

function renderArtists() {
  viewRoot.innerHTML = `<div class="page-heading"><div><span class="eyebrow">Your library</span><h1>Artists</h1><p>Follow the sound wherever it goes.</p></div></div><div class="artist-grid">${catalogArtists.map(artistCard).join('')}</div>`;
}

function renderAlbums() {
  viewRoot.innerHTML = `<div class="page-heading"><div><span class="eyebrow">Your library</span><h1>Albums</h1><p>A growing collection of records and little worlds.</p></div></div><div class="catalog-grid">${catalogArtists.flatMap((artist) => artist.albums.map((album) => albumCard(album, artist))).join('')}</div>`;
}

function renderHistory() {
  const history = readYoutubeHistory();
  viewRoot.innerHTML = `<div class="page-heading"><div><span class="eyebrow">Recently played</span><h1>History</h1><p>Your recently played YouTube songs.</p></div></div>${history.length ? trackList(history) : '<div class="empty-state history-empty">Your played YouTube songs will appear here.</div>'}`;
}

function renderArtist(artist) {
  const artistTracks = artist.albums.flatMap((album) => album.tracks.map((track) => ({ ...track, artist: artist.name, album: album.title, albumId: album.id, artClass: album.artClass })));
  viewRoot.innerHTML = `<button class="back-link" data-route="artists">${icon('chevron-left')} All artists</button><section class="artist-hero"><div class="artist-avatar artist-avatar-large ${artist.artClass}">${artist.initials}</div><div><span class="eyebrow">Artist</span><h1>${artist.name}</h1><p>${artist.bio}</p><small>${artist.genre} · ${artist.albums.length} albums</small></div><button class="primary-button" data-track="${artistTracks[0]?.id}">${icon('play-filled')} Play artist</button></section><section class="section-block"><div class="section-heading"><div><span class="eyebrow">Discography</span><h2>Albums</h2></div></div><div class="catalog-grid">${artist.albums.map((album) => albumCard(album, artist)).join('')}</div></section><section class="section-block"><div class="section-heading"><div><span class="eyebrow">From the catalog</span><h2>All songs</h2></div></div>${trackList(artistTracks)}</section>`;
}

function renderAlbum(album, artist) {
  const albumTracks = album.tracks.map((track) => ({ ...track, artist: artist.name, album: album.title, albumId: album.id, artClass: album.artClass }));
  viewRoot.innerHTML = `<button class="back-link" data-route="artist" data-id="${artist.id}">${icon('chevron-left')} ${artist.name}</button><section class="album-hero"><div class="album-hero-art album-art ${album.artClass}">${album.art || '✦'}</div><div><span class="eyebrow">Album</span><h1>${album.title}</h1><p>${artist.name}${album.year ? ` · ${album.year}` : ''} · ${albumTracks.length} songs</p><button class="primary-button" data-track="${albumTracks[0]?.id}">${icon('play-filled')} Play album</button></div></section><section class="section-block album-songs"><div class="section-heading"><div><span class="eyebrow">${artist.genre}</span><h2>Tracklist</h2></div></div>${trackList(albumTracks)}</section>`;
}

function renderSearch(query) {
  const matches = catalogTracks.filter((track) => `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(query.toLowerCase())).map((track) => ({ ...track, artist: track.artist, album: track.album }));
  viewRoot.innerHTML = `<div class="page-heading"><div><span class="eyebrow">Search results</span><h1>${query ? `“${query}”` : 'Search'}</h1><p>${matches.length} ${matches.length === 1 ? 'song' : 'songs'} in your catalog</p></div></div>${trackList(matches)}`;
}

function renderRoute(route) {
  if (route.type === 'artists') renderArtists();
  else if (route.type === 'albums') renderAlbums();
  else if (route.type === 'history') renderHistory();
  else if (route.type === 'artist') renderArtist(findArtist(route.id));
  else if (route.type === 'album') {
    const artist = catalogArtists.find((item) => item.albums.some((album) => album.id === route.id));
    renderAlbum(findAlbum(route.id), artist);
  } else renderHome();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigate(route, addHistory = true) {
  if (addHistory) { routeHistory = routeHistory.slice(0, routeIndex + 1); routeHistory.push(route); routeIndex += 1; }
  renderRoute(route);
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', (route.type === 'home' && item.dataset.view === 'Home') || (route.type === 'artists' && item.dataset.view === 'Artists') || (route.type === 'albums' && item.dataset.view === 'Albums') || (route.type === 'history' && item.dataset.view === 'History')));
}

function setPlayerMetadata(track) {
  document.querySelector('#nowTitle').textContent = track?.title || 'Choose a song';
  document.querySelector('#nowArtist').textContent = track?.artist || 'Your library';
  lyricsTitle.textContent = track?.title || 'Lyrics';
  lyricsArtist.textContent = track?.artist || 'Choose a song';
  const art = document.querySelector('.mini-art');
  art.className = `mini-art ${track?.artClass || 'art-moonlight'}`;
  art.textContent = track?.art || '◐';
  durationLabel.textContent = track?.duration || '0:00';
  parsedLyrics = [];
  activeLyricIndex = -1;
  if (lyricsPanel && !lyricsPanel.hidden) loadLyrics(track);
}

function parseYoutubeUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
    if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      const parts = url.pathname.split('/').filter(Boolean);
      if (['shorts', 'embed', 'live'].includes(parts[0])) id = parts[1] || '';
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

function parseVideoLink(value) {
  const youtubeId = parseYoutubeUrl(value);
  if (youtubeId) return { provider: 'youtube', id: youtubeId, label: 'YouTube' };
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const bilibiliMatch = url.pathname.match(/\/video\/(BV[0-9A-Za-z]+|av\d+)/i);
    if (host === 'bilibili.com' || host.endsWith('.bilibili.com')) {
      if (bilibiliMatch) return { provider: 'bilibili', id: bilibiliMatch[1], label: 'Bilibili' };
      return null;
    }
    if (host === 'b23.tv') return null;
    if (/\.(mp4|webm|m4v|mov|ogv)(?:$|[?#])/i.test(url.pathname + url.search + url.hash)) {
      const filename = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || 'Video').replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
      return { provider: 'direct', id: `direct-${url.href}`, label: 'Video file', title: filename || 'Video file', url: url.href };
    }
  } catch {}
  return null;
}

function sendBilibiliCommand(command, value = true) {
  const target = externalVideoPlayer.contentWindow;
  if (!target) return;
  const payload = JSON.stringify({ type: command, value });
  target.postMessage(`setPlayer-${payload}`, 'https://player.bilibili.com');
  target.postMessage(JSON.stringify({ method: command, value }), 'https://player.bilibili.com');
}

function setYoutubeStatus(message = '', type = '') {
  youtubeStatus.textContent = message;
  youtubeStatus.className = `youtube-status ${type}`.trim();
}

function youtubePlaybackTime() {
  if (currentTrack?.youtubeId && youtubePlayer?.getCurrentTime) return youtubePlayer.getCurrentTime() || 0;
  return audio.currentTime;
}

function updateYoutubeProgress() {
  if (!currentTrack?.youtubeId || !youtubePlayer?.getDuration) return;
  const total = youtubePlayer.getDuration() || 0;
  const current = youtubePlaybackTime();
  if (!total) return;
  const value = (current / total) * 100;
  progress.value = value;
  progress.style.background = `linear-gradient(to right, var(--lime) ${value}%, #3b404a ${value}%)`;
  elapsedLabel.textContent = formatTime(current);
  durationLabel.textContent = formatTime(total);
  syncLyrics();
}

function startYoutubeProgress() {
  clearInterval(youtubeProgressTimer);
  youtubeProgressTimer = setInterval(updateYoutubeProgress, 250);
}

function stopYoutubeProgress() {
  clearInterval(youtubeProgressTimer);
  youtubeProgressTimer = null;
}

function createYoutubePlayer() {
  if (!youtubeApiReady || youtubePlayer || !window.YT?.Player) return;
  youtubePlayer = new window.YT.Player('youtubePlayer', {
    width: 200,
    height: 200,
    playerVars: { autoplay: 0, controls: 0, disablekb: 1, modestbranding: 1, playsinline: 1, rel: 0 },
    events: {
      onReady: () => {
        youtubePlayerReady = true;
        if (!pendingYoutubeTrack) return;
        const track = pendingYoutubeTrack;
        pendingYoutubeTrack = null;
        youtubePlayer.loadVideoById(track.youtubeId);
        youtubePlayer.playVideo();
      },
      onStateChange: (event) => {
        if (!currentTrack?.youtubeId) return;
        if (!window.YT) return;
        if (event.data === window.YT.PlayerState.PLAYING) {
          recordYoutubeHistory(currentTrack);
          isPlaying = true;
          startYoutubeProgress();
          updatePlayButton();
        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.CUED) {
          isPlaying = false;
          updatePlayButton();
        } else if (event.data === window.YT.PlayerState.ENDED) {
          stopYoutubeProgress();
          isPlaying = false;
          nextTrack(1, true);
        }
      },
      onError: () => {
        if (!currentTrack?.youtubeId) return;
        stopYoutubeProgress();
        isPlaying = false;
        updatePlayButton();
        showToast('This YouTube video could not be played');
      },
    },
  });
}

window.onYouTubeIframeAPIReady = () => {
  youtubeApiReady = true;
  createYoutubePlayer();
};

function parseLrc(text) {
  const offset = Number(text.match(/\[offset:([-\d]+)\]/i)?.[1] || 0) / 1000;
  return text.split(/\r?\n/).flatMap((line) => {
    const timestamps = [...line.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
    const lyricText = line.replace(/\[\d+:\d+(?:\.\d+)?\]/g, '').trim();
    return timestamps.map((match) => ({ time: Math.max(0, Number(match[1]) * 60 + Number(match[2]) + offset), text: lyricText || '♪' }));
  }).filter((line) => line.text).sort((a, b) => a.time - b.time);
}

function renderLyrics() {
  if (!parsedLyrics.length) {
    lyricsContent.innerHTML = `<div class="lyrics-empty"><span>♪</span><p>${currentTrack?.lyrics ? 'No timestamped lyrics found in this file.' : 'Lyrics are not available for this song yet.'}</p></div>`;
    return;
  }
  lyricsContent.innerHTML = parsedLyrics.map((line, index) => `<button class="lyric-line" data-lyric-index="${index}">${line.text}</button>`).join('');
  syncLyrics(true);
}

async function loadLyrics(track) {
  parsedLyrics = [];
  activeLyricIndex = -1;
  if (!track) { renderLyrics(); return; }
  if (!track.lyrics) { renderLyrics(); return; }
  if (lyricsCache.has(track.id)) { parsedLyrics = lyricsCache.get(track.id); renderLyrics(); return; }
  lyricsContent.innerHTML = '<div class="lyrics-loading">Loading lyrics…</div>';
  try {
    const response = await fetch(track.lyrics);
    if (!response.ok) throw new Error('Lyrics file unavailable');
    parsedLyrics = parseLrc(await response.text());
    lyricsCache.set(track.id, parsedLyrics);
    if (currentTrack?.id === track.id) renderLyrics();
  } catch {
    lyricsContent.innerHTML = '<div class="lyrics-empty"><span>♪</span><p>Lyrics could not be loaded for this song.</p></div>';
  }
}

function syncLyrics(force = false) {
  if (!parsedLyrics.length) return;
  let nextIndex = 0;
  const playbackTime = youtubePlaybackTime();
  for (let index = 0; index < parsedLyrics.length; index += 1) if (playbackTime >= parsedLyrics[index].time) nextIndex = index;
  if (!force && nextIndex === activeLyricIndex) return;
  activeLyricIndex = nextIndex;
  document.querySelectorAll('.lyric-line').forEach((line, index) => line.classList.toggle('active', index === activeLyricIndex));
  document.querySelector(`.lyric-line[data-lyric-index="${activeLyricIndex}"]`)?.scrollIntoView({ behavior: force ? 'auto' : 'smooth', block: 'center' });
}

function updatePlayButton() {
  document.querySelector('#playButton').innerHTML = isPlaying ? '<span class="pause-bars"><i></i><i></i></span>' : icon('play-filled');
}

function trackSeed(track) {
  return [...track.id].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function midiFrequency(note) {
  return 440 * (2 ** ((note - 69) / 12));
}

function createDemoAudio(track) {
  const sampleRate = 22050;
  const seconds = 24;
  const frameCount = sampleRate * seconds;
  const samples = new Int16Array(frameCount * 2);
  const seed = trackSeed(track);
  const tempo = 88 + (seed % 20);
  const beat = 60 / tempo;
  const root = 48 + (seed % 8);
  const chordSteps = [0, 3, 7, 10];

  for (let frame = 0; frame < frameCount; frame += 1) {
    const time = frame / sampleRate;
    const beatIndex = Math.floor(time / beat);
    const beatTime = time % beat;
    const bar = Math.floor(beatIndex / 4);
    const chordRoot = root + chordSteps[bar % chordSteps.length];
    const bass = Math.sin(time * Math.PI * 2 * midiFrequency(chordRoot - 12)) * 0.2;
    const pad = (Math.sin(time * Math.PI * 2 * midiFrequency(chordRoot + 12))
      + Math.sin(time * Math.PI * 2 * midiFrequency(chordRoot + 16))
      + Math.sin(time * Math.PI * 2 * midiFrequency(chordRoot + 19))) * 0.055;
    const arpeggioNote = chordRoot + [12, 16, 19, 24][beatIndex % 4];
    const arpeggio = Math.sin(time * Math.PI * 2 * midiFrequency(arpeggioNote)) * Math.max(0, 1 - (beatTime / beat)) * 0.13;
    const kick = beatIndex % 4 === 0 ? Math.sin(beatTime * Math.PI * 2 * (72 - beatTime * 45)) * Math.exp(-beatTime * 18) * 0.35 : 0;
    const snareBeat = beatIndex % 4 === 2;
    const snareNoise = Math.sin(frame * 17.31) * Math.sin(frame * 0.071) * Math.exp(-beatTime * 30);
    const snare = snareBeat ? snareNoise * 0.12 : 0;
    const fade = Math.min(1, time * 2) * Math.min(1, (seconds - time) * 2);
    const value = Math.max(-1, Math.min(1, (bass + pad + arpeggio + kick + snare) * fade));
    const sample = Math.round(value * 32767);
    samples[frame * 2] = sample;
    samples[frame * 2 + 1] = Math.round(sample * 0.97);
  }

  const wav = new ArrayBuffer(44 + samples.byteLength);
  const view = new DataView(wav);
  const writeText = (offset, text) => [...text].forEach((character, index) => view.setUint8(offset + index, character.charCodeAt(0)));
  writeText(0, 'RIFF');
  view.setUint32(4, 36 + samples.byteLength, true);
  writeText(8, 'WAVE');
  writeText(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  writeText(36, 'data');
  view.setUint32(40, samples.byteLength, true);
  new Int16Array(wav, 44).set(samples);
  return URL.createObjectURL(new Blob([wav], { type: 'audio/wav' }));
}

function getTrackAudioSource(track) {
  if (track.mediaUrl) return track.mediaUrl;
  if (track.src) return track.src;
  if (!demoAudioCache.has(track.id)) demoAudioCache.set(track.id, createDemoAudio(track));
  return demoAudioCache.get(track.id);
}

async function playTrack(trackOrId, queue = null) {
  const track = typeof trackOrId === 'string' ? findTrack(trackOrId) : trackOrId;
  if (!track) return;
  if (queue) { currentQueue = queue; currentQueueIndex = queue.findIndex((item) => item.id === track.id); }
  else { currentQueue = catalogTracks; currentQueueIndex = currentQueue.findIndex((item) => item.id === track.id); }
  currentTrack = track;
  setPlayerMetadata(track);
  if (track.youtubeId) {
    externalVideoPlayer.hidden = true;
    externalVideoPlayer.src = 'about:blank';
    audio.pause();
    stopYoutubeProgress();
    isPlaying = false;
    updatePlayButton();
    pendingYoutubeTrack = track;
    if (!youtubePlayer || !youtubePlayerReady) {
      createYoutubePlayer();
      showToast('YouTube player is loading…');
      return;
    }
    pendingYoutubeTrack = null;
    youtubePlayer.loadVideoById(track.youtubeId);
    youtubePlayer.playVideo();
    showToast(`Playing ${track.title}`);
    return;
  }
  if (track.provider === 'bilibili') {
    audio.pause();
    if (youtubePlayer && youtubePlayerReady) youtubePlayer.pauseVideo();
    const bilibiliParam = /^av/i.test(track.providerId) ? `aid=${encodeURIComponent(track.providerId.slice(2))}` : `bvid=${encodeURIComponent(track.providerId)}`;
    externalVideoPlayer.src = `https://player.bilibili.com/player.html?${bilibiliParam}&autoplay=1&danmaku=0`;
    externalVideoPlayer.hidden = false;
    pendingYoutubeTrack = null;
    stopYoutubeProgress();
    isPlaying = true;
    updatePlayButton();
    showToast(`Playing ${track.title}`);
    return;
  }
  externalVideoPlayer.hidden = true;
  externalVideoPlayer.src = 'about:blank';
  if (youtubePlayer && youtubePlayerReady) youtubePlayer.pauseVideo();
  pendingYoutubeTrack = null;
  stopYoutubeProgress();
  audio.src = getTrackAudioSource(track);
  audio.load();
  try { await audio.play(); isPlaying = true; updatePlayButton(); renderRoute(routeHistory[routeIndex]); showToast(`Playing ${track.title}`); }
  catch { isPlaying = false; updatePlayButton(); showToast('This song could not be loaded'); }
}

function togglePlayback() {
  if (!currentTrack) { playTrack(catalogTracks[0]); return; }
  if (currentTrack.youtubeId) {
    if (!youtubePlayer || !youtubePlayerReady) { showToast('YouTube player is still loading'); return; }
    if (isPlaying) youtubePlayer.pauseVideo();
    else youtubePlayer.playVideo();
    return;
  }
  if (currentTrack.provider === 'bilibili') {
    sendBilibiliCommand('play', !isPlaying);
    isPlaying = !isPlaying;
    updatePlayButton();
    return;
  }
  if (audio.paused) audio.play().then(() => { isPlaying = true; updatePlayButton(); }).catch(() => showToast('This song could not be loaded'));
  else { audio.pause(); isPlaying = false; updatePlayButton(); }
}

function stopAtQueueEnd() {
  if (currentTrack?.youtubeId && youtubePlayer?.stopVideo) youtubePlayer.stopVideo();
  else audio.pause();
  isPlaying = false;
  updatePlayButton();
}

function nextTrack(direction = 1, fromEnded = false) {
  if (!currentQueue.length) return;
  if (fromEnded && playMode === 'loop') {
    playTrack(currentTrack, currentQueue);
    return;
  }
  if (fromEnded && playMode === 'normal' && direction > 0 && currentQueueIndex >= currentQueue.length - 1) {
    stopAtQueueEnd();
    return;
  }
  let nextIndex;
  if (playMode === 'random' && direction > 0 && currentQueue.length > 1) {
    do { nextIndex = Math.floor(Math.random() * currentQueue.length); } while (nextIndex === currentQueueIndex);
  } else {
    nextIndex = (currentQueueIndex + direction + currentQueue.length) % currentQueue.length;
  }
  playTrack(currentQueue[nextIndex], currentQueue);
}

document.addEventListener('click', (event) => {
  const trackTarget = event.target.closest('[data-track]');
  if (trackTarget) {
    if (trackTarget.dataset.youtubeId) {
      const history = readYoutubeHistory();
      const historyTrack = history.find((track) => track.youtubeId === trackTarget.dataset.youtubeId);
      if (historyTrack) playTrack(historyTrack, history);
      return;
    }
    const scope = trackTarget.closest('.album-songs, .artist-hero, .artist-hero + .section-block');
    const queue = scope ? [...catalogTracks] : null;
    playTrack(trackTarget.dataset.track, queue);
    return;
  }
  const routeTarget = event.target.closest('[data-route]');
  if (routeTarget) { navigate({ type: routeTarget.dataset.route, id: routeTarget.dataset.id }); return; }
  const nav = event.target.closest('.nav-item');
  if (nav) { const route = nav.dataset.view === 'Home' ? { type: 'home' } : nav.dataset.view === 'Artists' ? { type: 'artists' } : nav.dataset.view === 'Albums' ? { type: 'albums' } : nav.dataset.view === 'History' ? { type: 'history' } : { type: 'home' }; navigate(route); if (!['Home', 'Artists', 'Albums', 'History'].includes(nav.dataset.view)) showToast(`${nav.dataset.view} is ready for your catalog`); return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'back' && routeIndex > 0) { routeIndex -= 1; renderRoute(routeHistory[routeIndex]); }
  if (action === 'forward' && routeIndex < routeHistory.length - 1) { routeIndex += 1; renderRoute(routeHistory[routeIndex]); }
  const heart = event.target.closest('.track-heart, .player-heart');
  if (heart) { heart.classList.toggle('liked'); showToast(heart.classList.contains('liked') ? 'Added to liked songs' : 'Removed from liked songs'); }
});

document.querySelector('#playButton').addEventListener('click', togglePlayback);
randomButton.addEventListener('click', () => setPlayMode('random'));
loopButton.addEventListener('click', () => setPlayMode('loop'));
document.querySelector('[data-action="previous"]').addEventListener('click', () => nextTrack(-1));
document.querySelector('[data-action="next"]').addEventListener('click', () => nextTrack(1));
searchInput.addEventListener('input', (event) => { const query = event.target.value.trim(); if (query) renderSearch(query); else renderRoute(routeHistory[routeIndex]); });
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.focus(); } });

youtubeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const rawUrl = youtubeUrl.value.trim();
  const source = parseVideoLink(rawUrl);
  if (!source) { setYoutubeStatus('Use a YouTube, Bilibili, or direct video-file link.', 'error'); return; }
  youtubeSubmit.disabled = true;
  setYoutubeStatus('Loading video details…');
  try {
    let info = { title: source.title || `${source.label} video`, artist: source.label, duration: '—' };
    if (source.provider === 'youtube') {
      const response = await fetch('/api/youtube-info', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: rawUrl }) });
      const youtubeInfo = await response.json();
      if (!response.ok) throw new Error(youtubeInfo.error || 'YouTube could not be loaded.');
      info = { title: youtubeInfo.title, artist: youtubeInfo.artist, duration: '—' };
    }
    const track = { id: `${source.provider}-${source.id}`, title: info.title, artist: info.artist, album: source.label, duration: info.duration, art: '▶', artClass: 'art-youtube', provider: source.provider, providerId: source.id, youtubeId: source.provider === 'youtube' ? source.id : null, mediaUrl: source.url };
    const existingIndex = youtubeTracks.findIndex((item) => item.id === track.id);
    if (existingIndex >= 0) youtubeTracks[existingIndex] = track;
    else youtubeTracks.push(track);
    setYoutubeStatus('Ready to play as audio.', 'success');
    youtubeUrl.value = '';
    playTrack(track, youtubeTracks);
  } catch (error) {
    setYoutubeStatus(error.message, 'error');
  } finally {
    youtubeSubmit.disabled = false;
  }
});

audio.addEventListener('timeupdate', () => { if (!audio.duration || currentTrack?.youtubeId) return; const value = (audio.currentTime / audio.duration) * 100; progress.value = value; progress.style.background = `linear-gradient(to right, var(--lime) ${value}%, #3b404a ${value}%)`; elapsedLabel.textContent = formatTime(audio.currentTime); syncLyrics(); });
audio.addEventListener('loadedmetadata', () => { durationLabel.textContent = formatTime(audio.duration); });
audio.addEventListener('play', () => { isPlaying = true; updatePlayButton(); });
audio.addEventListener('pause', () => { isPlaying = false; updatePlayButton(); });
audio.addEventListener('ended', () => nextTrack(1, true));
audio.addEventListener('error', () => { isPlaying = false; updatePlayButton(); showToast('This song could not be loaded'); });
progress.addEventListener('input', () => { const value = Number(progress.value); if (currentTrack?.youtubeId && youtubePlayer?.seekTo) youtubePlayer.seekTo((youtubePlayer.getDuration() || 0) * value / 100, true); else if (audio.duration) audio.currentTime = audio.duration * value / 100; progress.style.background = `linear-gradient(to right, var(--lime) ${value}%, #3b404a ${value}%)`; elapsedLabel.textContent = formatTime(((currentTrack?.youtubeId ? youtubePlayer?.getDuration?.() : audio.duration) || 252) * value / 100); });
document.querySelector('.volume-control input').addEventListener('input', (event) => { const volume = Number(event.target.value) / 100; audio.volume = volume; if (youtubePlayer?.setVolume) youtubePlayer.setVolume(Number(event.target.value)); event.target.style.background = `linear-gradient(to right, var(--text) ${event.target.value}%, #3b404a ${event.target.value}%)`; });
document.querySelector('#lyricsButton').addEventListener('click', () => {
  const opening = lyricsPanel.hidden;
  lyricsPanel.hidden = !opening;
  lyricsPanel.setAttribute('aria-hidden', String(!opening));
  document.querySelector('#lyricsButton').setAttribute('aria-pressed', String(opening));
  document.querySelector('#lyricsButton').classList.toggle('lyrics-active', opening);
  if (opening) loadLyrics(currentTrack);
});
document.querySelector('#lyricsClose').addEventListener('click', () => {
  lyricsPanel.hidden = true;
  lyricsPanel.setAttribute('aria-hidden', 'true');
  document.querySelector('#lyricsButton').setAttribute('aria-pressed', 'false');
  document.querySelector('#lyricsButton').classList.remove('lyrics-active');
});
lyricsContent.addEventListener('click', (event) => {
  const line = event.target.closest('[data-lyric-index]');
  if (!line || !parsedLyrics[Number(line.dataset.lyricIndex)]) return;
  audio.currentTime = parsedLyrics[Number(line.dataset.lyricIndex)].time;
  syncLyrics(true);
});

setPlayerMetadata(null);
updatePlayModeControls();
setAccountUser(currentUsername === 'New listener' ? '' : currentUsername);
renderRoute({ type: 'home' });

if (readAccount() && hasSession()) closeAuth();
else if (readAccount()) openAuth('login', true);
else openAuth('register', true);
