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
  dharma: '<circle cx="12" cy="12" r="2.6"/><circle cx="12" cy="12" r="8.8"/><path d="M12 3.2v6.2M12 14.6v6.2M3.2 12h6.2M14.6 12h6.2M5.8 5.8l4.4 4.4M13.8 13.8l4.4 4.4M18.2 5.8l-4.4 4.4M10.2 13.8l-4.4 4.4"/>',
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
const secretsOverlay = document.querySelector('#secretsOverlay');
const secretList = document.querySelector('#secretList');
const secretWallpaperList = document.querySelector('#secretWallpaperList');
const secretClose = document.querySelector('#secretClose');
const secretPasswordOverlay = document.querySelector('#secretPasswordOverlay');
const secretPasswordClose = document.querySelector('#secretPasswordClose');
const secretPasswordDots = document.querySelector('#secretPasswordDots');
const secretPasswordStatus = document.querySelector('#secretPasswordStatus');
const brandMark = document.querySelector('.brand-mark');
const infinityReveal = document.querySelector('#infinityReveal');
const searchSubmit = document.querySelector('#searchSubmit');
const abstractHuntOverlay = document.querySelector('#abstractHuntOverlay');
const abstractHuntClose = document.querySelector('#abstractHuntClose');
const abstractChat = document.querySelector('#abstractChat');
const abstractChatText = document.querySelector('#abstractChatText');
const playerBar = document.querySelector('#playerBar');
const playerVisualizer = document.querySelector('.player-visualizer');
const visualizerBarCount = 112;
let audioContext = null;
let audioAnalyser = null;
let audioSourceNode = null;
let visualizerData = null;

let currentTrack = null;
let currentQueue = [...catalogTracks];
let currentQueueIndex = -1;
let playMode = 'normal';
let isPlaying = false;
let toastTimer;
let routeHistory = [{ type: 'home' }];
let routeIndex = 0;
const radioStations = [
  {
    id: 'radio-groove-salad',
    title: 'Groove Salad',
    artist: 'SomaFM',
    album: 'Ambient · downtempo',
    duration: 'LIVE',
    art: '◌',
    artClass: 'radio-art-groove',
    radioUrl: 'https://ice5.somafm.com/groovesalad-128-mp3',
    description: 'A chilled plate of ambient beats and grooves.',
  },
  {
    id: 'radio-drone-zone',
    title: 'Drone Zone',
    artist: 'SomaFM',
    album: 'Atmospheric · space',
    duration: 'LIVE',
    art: '◒',
    artClass: 'radio-art-drone',
    radioUrl: 'https://ice5.somafm.com/dronezone-128-mp3',
    description: 'Atmospheric textures for a slower orbit.',
  },
  {
    id: 'radio-secret-agent',
    title: 'Secret Agent',
    artist: 'SomaFM',
    album: 'Spy · jazz · lounge',
    duration: 'LIVE',
    art: '✦',
    artClass: 'radio-art-agent',
    radioUrl: 'https://ice5.somafm.com/secretagent-128-mp3',
    description: 'Soundtracks for after-dark missions.',
  },
  {
    id: 'radio-space-station',
    title: 'Space Station Soma',
    artist: 'SomaFM',
    album: 'Electronic · ambient',
    duration: 'LIVE',
    art: '✧',
    artClass: 'radio-art-space',
    radioUrl: 'https://ice5.somafm.com/spacestation-128-mp3',
    description: 'Electronic signals from the far side.',
  },
  {
    id: 'radio-poptron',
    title: 'PopTron',
    artist: 'SomaFM',
    album: 'Indie · pop · rock',
    duration: 'LIVE',
    art: '✺',
    artClass: 'radio-art-pop',
    radioUrl: 'https://ice5.somafm.com/poptron-128-mp3',
    description: 'Indie pop and rock with a bright signal.',
  },
  {
    id: 'radio-dalian-1043',
    title: '大连 104.3 FM',
    artist: '经济之声',
    album: '中文 · 新闻 · 财经',
    duration: 'LIVE',
    art: '辽',
    artClass: 'radio-art-china',
    radioUrl: '/api/radio/dalian-1043',
    description: '大连 FM104.3 覆盖的中文经济广播。',
  },
].map((station) => ({ ...station, radio: true }));
const radioStationsById = new Map(radioStations.map((station) => [station.id, station]));
let chineseRadioStations = [];
let chineseRadioLoading = true;
let chineseRadioError = '';
let chineseRadioLoadPromise = null;
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
const secretUnlockStorageKey = 'stellarmusic-secret-unlocks';
const secretSongs = [
  { id: 'secret-defiance', title: 'Defiance', art: '⚔', artClass: 'art-defiance', mediaUrl: 'defiance.mp3' },
  { id: 'secret-abstract', title: 'Abstract', art: '◌', artClass: 'art-abstract', mediaUrl: 'abstract.mp3' },
  { id: 'secret-infinity', title: '∞', art: '∞', artClass: 'art-infinity', mediaUrl: '∞.mp3' },
  { id: 'secret-expanding', title: 'Expanding', art: '↗', artClass: 'art-expanding', mediaUrl: 'expanding.mp3', fallbackMediaUrl: 'expanding.wav' },
  { id: 'secret-lighted', title: 'Lighted', art: '✦', artClass: 'art-lighted', mediaUrl: 'lighted.mp3', fallbackMediaUrl: 'lighted.wav' },
].map((track) => ({ ...track, artist: 'P4XT0N', album: 'Secret songs', duration: '—' }));
const secretTracksById = new Map(secretSongs.map((track) => [track.id, track]));
const wallpaperUnlockStorageKey = 'stellarmusic-secret-wallpapers';
const secretWallpaperPassword = '1225';
const secretWallpapers = [
  { id: 'secret-wallpaper-1', title: 'LongJing & MoLi', file: '1.png' },
  { id: 'secret-wallpaper-2', title: 'QiHong & PuEr', file: '2.png' },
  { id: 'secret-wallpaper-3', title: 'KeJia', file: '3.png' },
  { id: 'secret-wallpaper-4', title: 'YinZhen', file: '4.png' },
  { id: 'secret-wallpaper-5', title: 'LongJing & PuEr', file: '5.png' },
];
let secretPasswordInput = '';
const infinitySearchTerms = new Set(['infinite', 'infinitive', 'unlimited', 'limitless']);
let defianceSubmitCount = 0;
let infinitySearchCount = 0;
let infinityRevealTimer = null;
let abstractMarkClicks = 0;
let abstractHuntActive = false;
let abstractHuntClicks = 0;
let abstractHuntTimer = null;
let abstractChatTimer = null;
let abstractChatHideTimer = null;
let abstractMarkParent = null;
let abstractMarkNextSibling = null;
let youtubePlayer = null;
let youtubePlayerReady = false;
let youtubeApiReady = false;
let pendingYoutubeTrack = null;
let youtubeProgressTimer = null;
let hlsPlayer = null;
const historyNav = document.querySelector('.nav-item[data-view="History"]');
let historyHoldStartTimer = null;
let historyHoldCompleteTimer = null;
let historyHoldActive = false;
let suppressHistoryClick = false;
let lightedClickCount = 0;
let lightedSequenceActive = false;
let lightedSequenceTimer = null;

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

function readSecretUnlocks() {
  const unlocked = new Set();
  try {
    const stored = JSON.parse(localStorage.getItem(secretUnlockStorageKey) || '[]');
    if (Array.isArray(stored)) stored.filter((id) => typeof id === 'string').forEach((id) => unlocked.add(id));
  } catch {}
  return unlocked;
}

function isSecretUnlocked(trackId) {
  return readSecretUnlocks().has(trackId);
}

function unlockSecretSong(trackId) {
  const unlocked = readSecretUnlocks();
  unlocked.add(trackId);
  try { localStorage.setItem(secretUnlockStorageKey, JSON.stringify([...unlocked])); } catch {}
  if (!secretsOverlay.hidden) renderSecretSongs();
}

function areSecretWallpapersUnlocked() {
  try { return localStorage.getItem(wallpaperUnlockStorageKey) === 'true'; } catch { return false; }
}

function unlockSecretWallpapers() {
  try { localStorage.setItem(wallpaperUnlockStorageKey, 'true'); } catch {}
  renderSecretWallpapers();
}

function playSecretSong(trackId) {
  const track = secretTracksById.get(trackId);
  if (!track || !isSecretUnlocked(trackId)) return;
  closeSecrets();
  playTrack(track, [track]);
}

function renderSecretSongs() {
  if (!secretList) return;
  secretList.innerHTML = secretSongs.map((track) => {
    const unlocked = isSecretUnlocked(track.id);
    return `<div class="secret-song ${unlocked ? 'unlocked' : 'locked'}"><span class="secret-song-art ${track.artClass}">${unlocked ? escapeHtml(track.art) : '?'}</span><div class="secret-song-copy"><strong>${unlocked ? escapeHtml(track.title) : '???'}</strong><span>${escapeHtml(track.artist)}</span></div>${unlocked ? `<button class="secret-song-play" data-secret-track="${track.id}" aria-label="Play ${escapeHtml(track.title)}">${icon('play-filled')}</button>` : '<span class="secret-song-lock">Locked</span>'}</div>`;
  }).join('');
  renderSecretWallpapers();
}

function renderSecretWallpapers() {
  if (!secretWallpaperList) return;
  const unlocked = areSecretWallpapersUnlocked();
  secretWallpaperList.innerHTML = secretWallpapers.map((wallpaper) => `<button class="secret-wallpaper ${unlocked ? 'unlocked' : 'locked'}" data-secret-wallpaper="${wallpaper.id}" aria-label="${unlocked ? `Set ${escapeHtml(wallpaper.title)}` : `Unlock ${escapeHtml(wallpaper.title)}`} wallpaper"><span class="wallpaper-frame ${unlocked ? '' : 'wallpaper-locked-art'}" data-file="${escapeHtml(wallpaper.file)}">${unlocked ? `<img src="./${escapeHtml(wallpaper.file)}" alt="${escapeHtml(wallpaper.title)} wallpaper" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('missing')" /><span>Wallpaper file not found</span>` : '<span class="wallpaper-lock-mark">?</span>'}</span><strong>${escapeHtml(wallpaper.title)}</strong><small>${unlocked ? escapeHtml(wallpaper.file) : 'Locked · enter password'}</small></button>`).join('');
}

function renderSecretPasswordDots() {
  if (!secretPasswordDots) return;
  secretPasswordDots.innerHTML = secretWallpaperPassword.split('').map((_digit, index) => `<span class="${index < secretPasswordInput.length ? 'filled' : ''}"></span>`).join('');
}

function openSecretPassword() {
  secretPasswordInput = '';
  renderSecretPasswordDots();
  secretPasswordStatus.textContent = 'Use the keypad or your keyboard.';
  secretPasswordStatus.classList.remove('error', 'success');
  secretPasswordOverlay.hidden = false;
  secretPasswordOverlay.setAttribute('aria-hidden', 'false');
  secretPasswordClose.focus();
}

function closeSecretPassword() {
  secretPasswordOverlay.hidden = true;
  secretPasswordOverlay.setAttribute('aria-hidden', 'true');
  secretPasswordInput = '';
}

function submitSecretPasswordDigit(digit) {
  if (secretPasswordOverlay.hidden) return;
  if (digit === 'clear') secretPasswordInput = '';
  else if (digit === 'backspace') secretPasswordInput = secretPasswordInput.slice(0, -1);
  else if (/^\d$/.test(digit) && secretPasswordInput.length < secretWallpaperPassword.length) secretPasswordInput += digit;
  renderSecretPasswordDots();
  if (secretPasswordInput.length < secretWallpaperPassword.length) return;
  if (secretPasswordInput === secretWallpaperPassword) {
    unlockSecretWallpapers();
    secretPasswordStatus.textContent = 'Unlocked. The wallpapers are yours.';
    secretPasswordStatus.classList.remove('error');
    secretPasswordStatus.classList.add('success');
    setTimeout(closeSecretPassword, 500);
    showToast('Secret wallpapers unlocked');
  } else {
    secretPasswordStatus.textContent = 'Wrong key. Try again.';
    secretPasswordStatus.classList.add('error');
    secretPasswordInput = '';
    renderSecretPasswordDots();
    secretPasswordOverlay.querySelector('.secret-password-modal')?.classList.remove('shake');
    requestAnimationFrame(() => secretPasswordOverlay.querySelector('.secret-password-modal')?.classList.add('shake'));
  }
}

function applySecretWallpaper(wallpaperId, notify = true) {
  const wallpaper = secretWallpapers.find((item) => item.id === wallpaperId);
  if (!wallpaper || !areSecretWallpapersUnlocked()) return;
  document.body.style.setProperty('--secret-wallpaper', `url("./${wallpaper.file}")`);
  document.body.classList.add('secret-wallpaper-active');
  try { localStorage.setItem('stellarmusic-selected-wallpaper', wallpaper.id); } catch {}
  closeSecretPassword();
  closeSecrets();
  if (notify) showToast(`${wallpaper.title} is now your wallpaper`);
}

function restoreSecretWallpaper() {
  try {
    const savedWallpaper = localStorage.getItem('stellarmusic-selected-wallpaper');
    if (savedWallpaper && areSecretWallpapersUnlocked()) applySecretWallpaper(savedWallpaper, false);
  } catch {}
}

function openSecrets() {
  renderSecretSongs();
  secretsOverlay.hidden = false;
  secretsOverlay.setAttribute('aria-hidden', 'false');
  secretClose.focus();
}

function closeSecrets() {
  secretsOverlay.hidden = true;
  secretsOverlay.setAttribute('aria-hidden', 'true');
}

function handleDefianceSubmit() {
  if (isSecretUnlocked('secret-defiance')) {
    setYoutubeStatus('Defiance unlocked. Playing…', 'success');
    playSecretSong('secret-defiance');
    return true;
  }
  defianceSubmitCount += 1;
  if (defianceSubmitCount <= 3) setYoutubeStatus('Error: video could not be found.', 'error');
  else if (defianceSubmitCount === 4) setYoutubeStatus('...?');
  else if (defianceSubmitCount === 5) setYoutubeStatus('I remember something');
  else {
    setYoutubeStatus('Defiance...?');
    unlockSecretSong('secret-defiance');
    playSecretSong('secret-defiance');
  }
  return true;
}

function moveAbstractMark() {
  if (!abstractHuntActive) return;
  const width = brandMark.offsetWidth || 24;
  const height = brandMark.offsetHeight || 22;
  const maxX = Math.max(12, window.innerWidth - width - 12);
  const maxY = Math.max(60, window.innerHeight - height - 120);
  brandMark.style.left = `${12 + Math.random() * (maxX - 12)}px`;
  brandMark.style.top = `${48 + Math.random() * Math.max(1, maxY - 48)}px`;
  brandMark.style.transform = `rotate(${Math.round(Math.random() * 24 - 12)}deg)`;
  clearTimeout(abstractHuntTimer);
  abstractHuntTimer = setTimeout(moveAbstractMark, 900);
}

function hideAbstractChat() {
  clearInterval(abstractChatTimer);
  abstractChatTimer = null;
  clearTimeout(abstractChatHideTimer);
  abstractChatHideTimer = null;
  abstractChat.hidden = true;
  abstractChatText.textContent = '';
}

function showAbstractChat() {
  hideAbstractChat();
  abstractChat.hidden = false;
  abstractChatHideTimer = setTimeout(hideAbstractChat, 5000);
  const message = 'Damn bro try harder lol ez ggs';
  let index = 0;
  abstractChatTimer = setInterval(() => {
    abstractChatText.textContent = message.slice(0, index += 1);
    if (index >= message.length) {
      clearInterval(abstractChatTimer);
      abstractChatTimer = null;
    }
  }, 55);
}

function restoreAbstractMark() {
  if (abstractMarkParent) abstractMarkParent.insertBefore(brandMark, abstractMarkNextSibling);
  brandMark.removeAttribute('style');
  brandMark.classList.remove('abstract-flying');
}

function closeAbstractHuntOverlay() {
  abstractHuntOverlay.hidden = true;
  abstractHuntOverlay.setAttribute('aria-hidden', 'true');
}

function finishAbstractHunt() {
  abstractHuntActive = false;
  clearTimeout(abstractHuntTimer);
  abstractHuntTimer = null;
  closeAbstractHuntOverlay();
  restoreAbstractMark();
  hideAbstractChat();
  abstractMarkClicks = 0;
  abstractHuntClicks = 0;
  unlockSecretSong('secret-abstract');
  playSecretSong('secret-abstract');
}

function cancelAbstractHunt() {
  if (!abstractHuntActive) return;
  abstractHuntActive = false;
  clearTimeout(abstractHuntTimer);
  abstractHuntTimer = null;
  closeAbstractHuntOverlay();
  restoreAbstractMark();
  abstractMarkClicks = 0;
  abstractHuntClicks = 0;
}

function exitAbstractHunt() {
  if (!abstractHuntActive) return;
  abstractHuntActive = false;
  clearTimeout(abstractHuntTimer);
  abstractHuntTimer = null;
  closeAbstractHuntOverlay();
  restoreAbstractMark();
  abstractMarkClicks = 0;
  abstractHuntClicks = 0;
  showAbstractChat();
}

function startAbstractHunt() {
  if (abstractHuntActive) return;
  const rect = brandMark.getBoundingClientRect();
  abstractMarkParent = brandMark.parentElement;
  abstractMarkNextSibling = brandMark.nextSibling;
  document.body.appendChild(brandMark);
  brandMark.classList.add('abstract-flying');
  brandMark.style.position = 'fixed';
  brandMark.style.left = `${rect.left}px`;
  brandMark.style.top = `${rect.top}px`;
  brandMark.style.width = `${rect.width}px`;
  brandMark.style.zIndex = '45';
  abstractHuntActive = true;
  abstractHuntClicks = 0;
  hideAbstractChat();
  abstractHuntOverlay.hidden = false;
  abstractHuntOverlay.setAttribute('aria-hidden', 'false');
  abstractHuntClose.focus();
  moveAbstractMark();
}

function handleBrandMarkClick(event) {
  event.preventDefault();
  event.stopPropagation();
  if (abstractHuntActive) {
    abstractHuntClicks += 1;
    if (abstractHuntClicks >= 3) finishAbstractHunt();
    return;
  }
  hideAbstractChat();
  abstractMarkClicks += 1;
  if (abstractMarkClicks >= 4) startAbstractHunt();
}

function triggerInfinityReveal() {
  if (isSecretUnlocked('secret-infinity') || infinityRevealTimer) return;
  unlockSecretSong('secret-infinity');
  infinityReveal.hidden = false;
  infinityReveal.setAttribute('aria-hidden', 'false');
  infinityRevealTimer = setTimeout(() => {
    infinityReveal.hidden = true;
    infinityReveal.setAttribute('aria-hidden', 'true');
    infinityRevealTimer = null;
    playSecretSong('secret-infinity');
  }, 2000);
}

function handleInfinitySearchSubmit() {
  const query = searchInput.value.trim().toLowerCase();
  if (!infinitySearchTerms.has(query) || isSecretUnlocked('secret-infinity')) return;
  infinitySearchCount += 1;
  if (infinitySearchCount >= 5) triggerInfinityReveal();
}

function clearHistoryHoldTimers() {
  clearTimeout(historyHoldStartTimer);
  clearTimeout(historyHoldCompleteTimer);
  historyHoldStartTimer = null;
  historyHoldCompleteTimer = null;
}

function resetHistoryHold() {
  clearHistoryHoldTimers();
  historyHoldActive = false;
  historyNav?.classList.remove('history-holding');
}

function finishExpandingUnlock() {
  if (!historyHoldActive) return;
  clearHistoryHoldTimers();
  historyHoldActive = false;
  historyNav?.classList.remove('history-holding');
  suppressHistoryClick = true;
  unlockSecretSong('secret-expanding');
  playSecretSong('secret-expanding');
}

function startHistoryHold(event) {
  if (!historyNav || event.button !== 0 || isSecretUnlocked('secret-expanding')) return;
  resetHistoryHold();
  historyHoldActive = true;
  historyNav.setPointerCapture?.(event.pointerId);
  historyHoldStartTimer = setTimeout(() => {
    if (!historyHoldActive) return;
    historyNav.classList.add('history-holding');
    historyHoldCompleteTimer = setTimeout(finishExpandingUnlock, 3000);
  }, 1000);
}

function finishHistoryPointer(event) {
  if (!historyHoldActive) return;
  historyNav.releasePointerCapture?.(event.pointerId);
  resetHistoryHold();
}

function finishLightedUnlock() {
  if (!lightedSequenceActive) return;
  lightedSequenceActive = false;
  clearTimeout(lightedSequenceTimer);
  lightedSequenceTimer = null;
  document.body.classList.remove('lighted-reveal');
  unlockSecretSong('secret-lighted');
  playSecretSong('secret-lighted');
}

function handleLightedClick() {
  if (lightedSequenceActive || isSecretUnlocked('secret-lighted')) return;
  lightedClickCount += 1;
  if (lightedClickCount < 5) return;
  lightedClickCount = 0;
  lightedSequenceActive = true;
  document.body.classList.add('lighted-reveal');
  lightedSequenceTimer = setTimeout(finishLightedUnlock, 3600);
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

function chineseRadioStation(station, index) {
  const tags = Array.isArray(station.tags) ? station.tags.join(' · ') : '';
  const location = station.state || 'China';
  const streamUrl = station.streamUrl || '';
  const hls = Boolean(station.hls) || /\.m3u8(?:$|[?#])/i.test(streamUrl);
  return {
    id: `china-${station.id}`,
    title: station.name,
    artist: `Chinese FM · ${location}`,
    album: `${station.codec || 'LIVE'}${station.bitrate ? ` · ${station.bitrate} kbps` : ''}`,
    duration: 'LIVE',
    art: station.name.slice(0, 2) || `中${index + 1}`,
    artClass: 'radio-art-china',
    radioUrl: hls || !/^https:/i.test(streamUrl) ? `/api/radio/china/stream/${station.id}` : streamUrl,
    radioHls: hls,
    radio: true,
    description: tags || 'Chinese-language live broadcast.',
  };
}

function radioQueue() {
  return [...radioStations, ...chineseRadioStations];
}

function loadChineseRadio() {
  if (chineseRadioLoadPromise) return chineseRadioLoadPromise;
  chineseRadioLoadPromise = fetch('/api/radio/china')
    .then((response) => {
      if (!response.ok) throw new Error('Directory unavailable');
      return response.json();
    })
    .then((payload) => {
      chineseRadioStations = (payload.stations || []).map(chineseRadioStation);
      chineseRadioStations.forEach((station) => radioStationsById.set(station.id, station));
      chineseRadioLoading = false;
      if (routeHistory[routeIndex]?.type === 'radio') renderRadio();
    })
    .catch(() => {
      chineseRadioLoading = false;
      chineseRadioError = 'The live Chinese station directory is unavailable right now.';
      if (routeHistory[routeIndex]?.type === 'radio') renderRadio();
    });
  return chineseRadioLoadPromise;
}

function renderHome() {
  const quickTracks = catalogTracks.slice(0, 7);
  const featured = catalogArtists[0];
  const featuredAlbum = featured.albums[0];
  viewRoot.innerHTML = `<div class="greeting-row"><div><p class="eyebrow">Monday, September 07</p><h1>Good evening, ${currentUsername} <span>✦</span></h1></div><button class="icon-button" data-secret-lighted aria-label="More options">${icon('more-horizontal')}</button></div>
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

function radioStationCard(station) {
  const active = currentTrack?.id === station.id;
  return `<button class="radio-station ${active ? 'active' : ''}" data-radio-station="${escapeHtml(station.id)}" aria-pressed="${active}">
    <span class="radio-station-art ${escapeHtml(station.artClass)}"><span>${escapeHtml(station.art)}</span><i></i><i></i><i></i></span>
    <span class="radio-station-copy"><strong>${escapeHtml(station.title)}</strong><small>${escapeHtml(station.artist)} · ${escapeHtml(station.album)}</small><em>${escapeHtml(station.description)}</em></span>
    <span class="radio-station-action">${active && isPlaying ? '<span class="pause-bars"><i></i><i></i></span>' : icon('play-filled')}</span>
    <span class="radio-live-pill">LIVE</span>
  </button>`;
}

function renderRadio() {
  const activeStation = currentTrack?.radio ? currentTrack : null;
  viewRoot.innerHTML = `<section class="radio-page">
    <div class="radio-hero">
      <div class="radio-hero-copy"><span class="eyebrow">Live signal</span><h1>Radio</h1><p>Open a live frequency and let the player carry it while you browse.</p><div class="radio-now"><span class="radio-now-dot"></span><span>${activeStation ? `Receiving ${escapeHtml(activeStation.title)}` : 'Ready to receive'}</span><b>${activeStation && isPlaying ? 'ON AIR' : 'STANDBY'}</b></div></div>
      <div class="radio-visual" aria-hidden="true"><div class="radio-visual-core">◉</div><span class="radio-ring ring-one"></span><span class="radio-ring ring-two"></span><span class="radio-ring ring-three"></span><div class="radio-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
    </div>
    <section class="section-block radio-stations-section"><div class="section-heading"><div><span class="eyebrow">Available frequencies</span><h2>Choose a signal</h2></div><span class="radio-count">${radioStations.length} stations</span></div><div class="radio-station-grid">${radioStations.map(radioStationCard).join('')}</div></section>
    <section class="section-block radio-directory"><div class="section-heading"><div><span class="eyebrow">Chinese FM · live directory</span><h2>All listenable stations</h2></div><span class="radio-count">${chineseRadioLoading ? 'Loading…' : chineseRadioError ? 'Unavailable' : `${chineseRadioStations.length} stations`}</span></div>${chineseRadioLoading ? '<div class="radio-directory-status">Loading the current Chinese station directory…</div>' : chineseRadioError ? `<div class="radio-directory-status">${escapeHtml(chineseRadioError)}</div>` : `<div class="radio-station-grid">${chineseRadioStations.map(radioStationCard).join('')}</div>`}</section>
  </section>`;
  if (chineseRadioLoading) loadChineseRadio();
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
  cancelAbstractHunt();
  if (route.type === 'artists') renderArtists();
  else if (route.type === 'albums') renderAlbums();
  else if (route.type === 'radio') renderRadio();
  else if (route.type === 'history') renderHistory();
  else if (route.type === 'artist') renderArtist(findArtist(route.id));
  else if (route.type === 'album') {
    const artist = catalogArtists.find((item) => item.albums.some((album) => album.id === route.id));
    renderAlbum(findAlbum(route.id), artist);
  } else renderHome();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigate(route, addHistory = true) {
  cancelAbstractHunt();
  if (route.type !== 'home') lightedClickCount = 0;
  if (addHistory) { routeHistory = routeHistory.slice(0, routeIndex + 1); routeHistory.push(route); routeIndex += 1; }
  renderRoute(route);
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', (route.type === 'home' && item.dataset.view === 'Home') || (route.type === 'artists' && item.dataset.view === 'Artists') || (route.type === 'albums' && item.dataset.view === 'Albums') || (route.type === 'radio' && item.dataset.view === 'Radio') || (route.type === 'history' && item.dataset.view === 'History')));
}

function setPlayerMetadata(track) {
  document.querySelector('#nowTitle').textContent = track?.title || 'Choose a song';
  document.querySelector('#nowArtist').textContent = track?.artist || 'Your library';
  lyricsTitle.textContent = track?.title || 'Lyrics';
  lyricsArtist.textContent = track?.artist || 'Choose a song';
  const art = document.querySelector('.mini-art');
  art.className = `mini-art ${track?.artClass || 'art-moonlight'}`;
  art.textContent = track?.art || '◐';
  durationLabel.textContent = track?.radio ? 'LIVE' : track?.duration || '0:00';
  elapsedLabel.textContent = track?.radio ? 'LIVE' : '0:00';
  progress.disabled = Boolean(track?.radio);
  progress.value = 0;
  progress.style.background = track?.radio ? '#3b404a' : 'linear-gradient(to right, var(--lime) 0%, #3b404a 0%)';
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
  playerBar?.classList.toggle('is-playing', isPlaying);
}

function setupAudioAnalyser() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioContext = new AudioContextClass();
      audioAnalyser = audioContext.createAnalyser();
      audioAnalyser.fftSize = 512;
      audioAnalyser.smoothingTimeConstant = .78;
      audioSourceNode = audioContext.createMediaElementSource(audio);
      audioSourceNode.connect(audioAnalyser);
      audioAnalyser.connect(audioContext.destination);
      visualizerData = new Uint8Array(audioAnalyser.frequencyBinCount);
    } catch {
      audioContext = null;
      audioAnalyser = null;
    }
  }
  if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
}

function renderAudioVisualizer() {
  if (audioAnalyser && visualizerData && isPlaying && !audio.paused) {
    audioAnalyser.getByteFrequencyData(visualizerData);
    const binCount = visualizerData.length;
    playerVisualizer?.querySelectorAll('i').forEach((bar, index) => {
      const start = Math.floor((index / visualizerBarCount) ** 1.65 * binCount);
      const end = Math.max(start + 1, Math.floor(((index + 1) / visualizerBarCount) ** 1.65 * binCount));
      let total = 0;
      for (let bin = start; bin < Math.min(end, binCount); bin += 1) total += visualizerData[bin];
      const average = total / Math.max(1, end - start);
      bar.style.height = `${Math.max(2, Math.min(58, 2 + average * .31))}px`;
    });
  } else {
    playerVisualizer?.querySelectorAll('i').forEach((bar) => { bar.style.height = '2px'; });
  }
  requestAnimationFrame(renderAudioVisualizer);
}

if (playerVisualizer) {
  playerVisualizer.insertAdjacentHTML('beforeend', '<i></i>'.repeat(visualizerBarCount - playerVisualizer.children.length));
  requestAnimationFrame(renderAudioVisualizer);
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
  if (track.radioUrl) return track.radioUrl;
  if (track.mediaUrl) return track.mediaUrl;
  if (track.fallbackMediaUrl) return track.fallbackMediaUrl;
  if (track.src) return track.src;
  if (!demoAudioCache.has(track.id)) demoAudioCache.set(track.id, createDemoAudio(track));
  return demoAudioCache.get(track.id);
}

function destroyHlsPlayer() {
  if (hlsPlayer) {
    hlsPlayer.destroy();
    hlsPlayer = null;
  }
}

function playHlsTrack(track, source) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = () => {
      destroyHlsPlayer();
      if (!settled) {
        settled = true;
        reject(new Error('This station could not be reached'));
      } else {
        isPlaying = false;
        updatePlayButton();
        showToast(`The ${track.title} signal was lost`);
      }
    };
    const start = () => {
      audio.play().then(() => {
        settled = true;
        resolve();
      }).catch(fail);
    };

    if (window.Hls?.isSupported()) {
      hlsPlayer = new window.Hls({ enableWorker: true });
      hlsPlayer.on(window.Hls.Events.MANIFEST_PARSED, start);
      hlsPlayer.on(window.Hls.Events.ERROR, (_event, data) => { if (data.fatal) fail(); });
      hlsPlayer.loadSource(source);
      hlsPlayer.attachMedia(audio);
      return;
    }
    if (audio.canPlayType('application/vnd.apple.mpegurl')) {
      audio.src = source;
      audio.load();
      start();
      return;
    }
    fail();
  });
}

async function playTrack(trackOrId, queue = null) {
  const track = typeof trackOrId === 'string' ? findTrack(trackOrId) : trackOrId;
  if (!track) return;
  if (queue) { currentQueue = queue; currentQueueIndex = queue.findIndex((item) => item.id === track.id); }
  else { currentQueue = catalogTracks; currentQueueIndex = currentQueue.findIndex((item) => item.id === track.id); }
  currentTrack = track;
  setPlayerMetadata(track);
  destroyHlsPlayer();
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
  const audioSource = getTrackAudioSource(track);
  setupAudioAnalyser();
  if (track.radio && (track.radioHls || /\.m3u8(?:$|[?#])/i.test(audioSource))) {
    try {
      await playHlsTrack(track, audioSource);
      isPlaying = true;
      updatePlayButton();
      renderRoute(routeHistory[routeIndex]);
      showToast(`Playing ${track.title}`);
    } catch {
      isPlaying = false;
      updatePlayButton();
      showToast('This station could not be reached');
    }
    return;
  }
  audio.src = audioSource;
  audio.load();
  try {
    await audio.play();
    isPlaying = true;
    updatePlayButton();
    renderRoute(routeHistory[routeIndex]);
    showToast(`Playing ${track.title}`);
  } catch {
    if (track.mediaUrl && !track.secretFallbackAttempted) {
      track.secretFallbackAttempted = true;
      track.mediaUrl = '';
      audio.src = getTrackAudioSource(track);
      audio.load();
      try {
        await audio.play();
        isPlaying = true;
        updatePlayButton();
        renderRoute(routeHistory[routeIndex]);
        showToast(`Playing ${track.title}`);
        return;
      } catch {}
    }
    isPlaying = false;
    updatePlayButton();
    showToast(track.radio ? 'This station could not be reached' : 'This song could not be loaded');
  }
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
  const lightedTarget = event.target.closest('[data-secret-lighted]');
  if (lightedTarget) {
    handleLightedClick();
    return;
  }
  const secretTarget = event.target.closest('[data-secret-track]');
  if (secretTarget) {
    const secretTrack = secretTracksById.get(secretTarget.dataset.secretTrack);
    if (secretTrack && isSecretUnlocked(secretTrack.id)) {
      closeSecrets();
      playTrack(secretTrack, [secretTrack]);
    }
    return;
  }
  const wallpaperTarget = event.target.closest('[data-secret-wallpaper]');
  if (wallpaperTarget) {
    if (areSecretWallpapersUnlocked()) applySecretWallpaper(wallpaperTarget.dataset.secretWallpaper);
    else openSecretPassword();
    return;
  }
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
  const radioTarget = event.target.closest('[data-radio-station]');
  if (radioTarget) {
    const station = radioStationsById.get(radioTarget.dataset.radioStation);
    if (station) playTrack(station, radioQueue());
    return;
  }
  const routeTarget = event.target.closest('[data-route]');
  if (routeTarget) { navigate({ type: routeTarget.dataset.route, id: routeTarget.dataset.id }); return; }
  const nav = event.target.closest('.nav-item');
  if (nav) {
    if (nav.dataset.view === 'History' && suppressHistoryClick) {
      suppressHistoryClick = false;
      return;
    }
    const route = nav.dataset.view === 'Home' ? { type: 'home' } : nav.dataset.view === 'Artists' ? { type: 'artists' } : nav.dataset.view === 'Albums' ? { type: 'albums' } : nav.dataset.view === 'Radio' ? { type: 'radio' } : nav.dataset.view === 'History' ? { type: 'history' } : { type: 'home' };
    navigate(route);
    if (!['Home', 'Artists', 'Albums', 'Radio', 'History'].includes(nav.dataset.view)) showToast(`${nav.dataset.view} is ready for your catalog`);
    return;
  }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'back' && routeIndex > 0) { routeIndex -= 1; renderRoute(routeHistory[routeIndex]); }
  if (action === 'forward' && routeIndex < routeHistory.length - 1) { routeIndex += 1; renderRoute(routeHistory[routeIndex]); }
  const heart = event.target.closest('.track-heart, .player-heart');
  if (heart) { heart.classList.toggle('liked'); showToast(heart.classList.contains('liked') ? 'Added to liked songs' : 'Removed from liked songs'); }
});

document.querySelector('#playButton').addEventListener('click', togglePlayback);
document.querySelector('#secretButton').addEventListener('click', openSecrets);
historyNav?.addEventListener('pointerdown', startHistoryHold);
historyNav?.addEventListener('pointerup', finishHistoryPointer);
historyNav?.addEventListener('pointercancel', finishHistoryPointer);
historyNav?.addEventListener('lostpointercapture', resetHistoryHold);
secretClose.addEventListener('click', closeSecrets);
secretsOverlay.addEventListener('click', (event) => { if (event.target === secretsOverlay) closeSecrets(); });
secretPasswordClose.addEventListener('click', closeSecretPassword);
secretPasswordOverlay.addEventListener('click', (event) => { if (event.target === secretPasswordOverlay) closeSecretPassword(); });
document.querySelector('#secretKeypad').addEventListener('click', (event) => {
  const key = event.target.closest('[data-secret-key]');
  if (key) submitSecretPasswordDigit(key.dataset.secretKey);
});
abstractHuntClose.addEventListener('click', exitAbstractHunt);
abstractHuntOverlay.addEventListener('click', (event) => { if (event.target === abstractHuntOverlay) event.stopPropagation(); });
document.addEventListener('keydown', (event) => {
  if (!secretPasswordOverlay.hidden) {
    if (event.key === 'Escape') closeSecretPassword();
    else if (/^\d$/.test(event.key)) submitSecretPasswordDigit(event.key);
    else if (event.key === 'Backspace') submitSecretPasswordDigit('backspace');
    else if (event.key === 'Delete') submitSecretPasswordDigit('clear');
    return;
  }
  if (event.key !== 'Escape') return;
  if (!secretsOverlay.hidden) closeSecrets();
  if (abstractHuntActive) exitAbstractHunt();
});
brandMark.addEventListener('click', handleBrandMarkClick);
randomButton.addEventListener('click', () => setPlayMode('random'));
loopButton.addEventListener('click', () => setPlayMode('loop'));
document.querySelector('[data-action="previous"]').addEventListener('click', () => nextTrack(-1));
document.querySelector('[data-action="next"]').addEventListener('click', () => nextTrack(1));
searchInput.addEventListener('input', (event) => { const query = event.target.value.trim(); if (query) renderSearch(query); else renderRoute(routeHistory[routeIndex]); });
searchInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); handleInfinitySearchSubmit(); } });
searchSubmit.addEventListener('click', handleInfinitySearchSubmit);
searchSubmit.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleInfinitySearchSubmit(); } });
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.focus(); } });

youtubeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const rawUrl = youtubeUrl.value.trim();
  if (rawUrl.toLowerCase() === 'defiance') {
    handleDefianceSubmit();
    return;
  }
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

audio.addEventListener('timeupdate', () => { if (!audio.duration || currentTrack?.youtubeId || currentTrack?.radio) return; const value = (audio.currentTime / audio.duration) * 100; progress.value = value; progress.style.background = `linear-gradient(to right, var(--lime) ${value}%, #3b404a ${value}%)`; elapsedLabel.textContent = formatTime(audio.currentTime); syncLyrics(); });
audio.addEventListener('loadedmetadata', () => { if (currentTrack?.radio) durationLabel.textContent = 'LIVE'; else durationLabel.textContent = formatTime(audio.duration); });
audio.addEventListener('play', () => { isPlaying = true; updatePlayButton(); });
audio.addEventListener('pause', () => { isPlaying = false; updatePlayButton(); });
audio.addEventListener('ended', () => nextTrack(1, true));
audio.addEventListener('error', () => { isPlaying = false; updatePlayButton(); showToast(currentTrack?.radio ? 'This station could not be reached' : 'This song could not be loaded'); });
progress.addEventListener('input', () => { if (currentTrack?.radio) return; const value = Number(progress.value); if (currentTrack?.youtubeId && youtubePlayer?.seekTo) youtubePlayer.seekTo((youtubePlayer.getDuration() || 0) * value / 100, true); else if (audio.duration) audio.currentTime = audio.duration * value / 100; progress.style.background = `linear-gradient(to right, var(--lime) ${value}%, #3b404a ${value}%)`; elapsedLabel.textContent = formatTime(((currentTrack?.youtubeId ? youtubePlayer?.getDuration?.() : audio.duration) || 252) * value / 100); });
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
restoreSecretWallpaper();
renderRoute({ type: 'home' });

if (readAccount() && hasSession()) closeAuth();
else if (readAccount()) openAuth('login', true);
else openAuth('register', true);
