// ============================================================================
// 真夜 · 个人博客 — 前端交互脚本
// ============================================================================

const TRACKS = [
  { id: 'kaiduan', title: '开端', cover: '/static/images/cover_kaiduan.jpg', audio: '/static/audio/kaiduan.mp3' },
  { id: 'chun', title: '春', cover: '/static/images/cover_chun.png', audio: '/static/audio/chun.mp3' },
  { id: 'xia', title: '夏', cover: '/static/images/cover_xia.jpg', video: '/static/video/xia.mp4', audio: '/static/audio/xia.mp3' },
  { id: 'qiu', title: '秋', cover: '/static/images/cover_qiu.jpg', video: '/static/video/qiu.mp4', audio: '/static/audio/qiu.mp3' },
  { id: 'dong', title: '冬', cover: '/static/images/cover_dong.png', audio: '/static/audio/dong.mp3' },
];

const audioEl = new Audio();
audioEl.preload = 'metadata';
audioEl.volume = 0.8;

const el = {
  cover: document.getElementById('player-cover'),
  miniCover: document.getElementById('mini-cover'),
  title: document.getElementById('player-title'),
  progress: document.getElementById('progress-bar'),
  timeCur: document.getElementById('time-current'),
  timeDur: document.getElementById('time-duration'),
  btnPlay: document.getElementById('btn-play'),
  playIcon: document.getElementById('play-icon'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  volume: document.getElementById('volume-bar'),
  btnMv: document.getElementById('btn-mv'),
  cards: Array.from(document.querySelectorAll('.track-card')),
  miniPlayer: document.getElementById('mini-player'),
  miniToggle: document.getElementById('mini-toggle'),
  miniClose: document.getElementById('mini-close'),
  mvModal: document.getElementById('mv-modal'),
  mvVideo: document.getElementById('mv-video'),
  mvClose: document.getElementById('mv-close'),
};

let currentIndex = 0;
let isPlaying = false;

function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function loadTrack(index, autoplay) {
  currentIndex = (index + TRACKS.length) % TRACKS.length;
  const t = TRACKS[currentIndex];

  el.title.textContent = t.title;
  el.cover.src = t.cover;
  el.miniCover.src = t.cover;

  audioEl.src = t.audio;
  el.progress.value = 0;
  el.timeCur.textContent = '0:00';
  el.timeDur.textContent = '0:00';

  el.btnMv.style.display = t.id === 'qiu' ? 'inline-flex' : 'none';

  el.cards.forEach((c, i) => c.classList.toggle('active', i === currentIndex));

  if (autoplay) {
    audioEl.play().then(() => setPlayingState(true)).catch(() => setPlayingState(false));
  } else {
    setPlayingState(false);
  }
}

function setPlayingState(playing) {
  isPlaying = playing;
  el.playIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
}

function togglePlay() {
  if (isPlaying) {
    audioEl.pause();
    setPlayingState(false);
  } else {
    audioEl.play().then(() => setPlayingState(true)).catch(() => setPlayingState(false));
  }
}

audioEl.addEventListener('timeupdate', () => {
  if (audioEl.duration) {
    el.progress.value = (audioEl.currentTime / audioEl.duration) * 100;
    el.timeCur.textContent = fmtTime(audioEl.currentTime);
  }
});
audioEl.addEventListener('loadedmetadata', () => {
  el.timeDur.textContent = fmtTime(audioEl.duration);
});
audioEl.addEventListener('ended', () => {
  loadTrack(currentIndex + 1, true);
});

el.progress.addEventListener('input', () => {
  if (audioEl.duration) audioEl.currentTime = (el.progress.value / 100) * audioEl.duration;
});
el.volume.addEventListener('input', () => {
  audioEl.volume = el.volume.value / 100;
});

el.btnPlay.addEventListener('click', togglePlay);
el.btnPrev.addEventListener('click', () => loadTrack(currentIndex - 1, true));
el.btnNext.addEventListener('click', () => loadTrack(currentIndex + 1, true));

el.cards.forEach((card, i) => {
  card.addEventListener('click', () => {
    loadTrack(i, true);
    el.miniPlayer.classList.add('open');
  });
});

// 左下角悬浮播放器 展开/收起
el.miniToggle.addEventListener('click', () => el.miniPlayer.classList.add('open'));
el.miniClose.addEventListener('click', () => el.miniPlayer.classList.remove('open'));

// MV 弹窗（秋 - 竖屏带音效版本）
el.btnMv.addEventListener('click', () => {
  audioEl.pause();
  setPlayingState(false);
  el.mvVideo.src = '/static/video/qiu.mp4';
  el.mvModal.classList.add('open');
  el.mvVideo.play().catch(() => {});
});
el.mvClose.addEventListener('click', closeMv);
el.mvModal.addEventListener('click', (e) => {
  if (e.target === el.mvModal) closeMv();
});
function closeMv() {
  el.mvVideo.pause();
  el.mvVideo.currentTime = 0;
  el.mvModal.classList.remove('open');
}

loadTrack(0, false);

// ============================================================================
// 板块独立切换（首页 / 音乐 / 简历），各板块互不滚动叠加
// ============================================================================
const views = {
  home: document.getElementById('view-home'),
  music: document.getElementById('view-music'),
  resume: document.getElementById('view-resume'),
};
const navTriggers = document.querySelectorAll('[data-nav]');

function showView(name) {
  if (!views[name]) return;
  Object.entries(views).forEach(([key, el]) => {
    el.classList.toggle('active', key === name);
  });
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === name);
  });
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

navTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const name = trigger.dataset.nav;
    if (location.hash === `#${name}`) {
      showView(name);
    } else {
      location.hash = name;
    }
  });
});

// 支持浏览器前进/后退与直接 hash 访问，如 #music / #resume
function applyHash() {
  const name = (location.hash || '#home').replace('#', '') || 'home';
  showView(views[name] ? name : 'home');
}
window.addEventListener('hashchange', applyHash);
applyHash();

// 移动端导航菜单
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);
