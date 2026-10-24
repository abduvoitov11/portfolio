// Force Download Utility
function forceDownload(url, filename) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
    .catch(console.error);
}

// Prevent FOUC: Fade in body when DOM and external assets are fully loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ============ LOCK SCREEN ============
const lockscreen = document.getElementById('lockscreen');
const lsClock = document.getElementById('lsClock');
const lsDay = document.getElementById('lsDay');

const lsDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const lsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const lsDaysUz = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
const lsMonthsUz = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktyabr', 'noyabr', 'dekabr'];

function pad(n) { return n < 10 ? '0' + n : n; }

function updateLsClock() {
  if (!lsClock) return;
  const now = new Date();
  const h = now.getHours();
  const m = pad(now.getMinutes());
  const isUz = (typeof currentLang === 'undefined' || currentLang === 'uz');

  if (isUz) {
    lsClock.innerHTML = `${pad(h)}:${m}`;
    if (lsDay) {
      lsDay.textContent = `${lsDaysUz[now.getDay()]}, ${now.getDate()}-${lsMonthsUz[now.getMonth()]}`;
    }
  } else {
    let h12 = h % 12;
    if (h12 === 0) h12 = 12;
    const ampm = h >= 12 ? 'PM' : 'AM';
    lsClock.innerHTML = `${h12}:${m}<span class="ls-ampm">${ampm}</span>`;
    if (lsDay) {
      lsDay.textContent = `${lsDays[now.getDay()]} ${lsMonths[now.getMonth()]} ${now.getDate()}`;
    }
  }
}
updateLsClock();
let lsClockInterval = setInterval(updateLsClock, 1000);

let unlocked = false;
function doUnlock() {
  if (unlocked) return;
  unlocked = true;
  clearInterval(lsClockInterval);
  lockscreen.classList.add('unlocking');
  setTimeout(() => lockscreen.classList.add('gone'), 780);
}

window.doLock = function() {
  unlocked = false;
  lockscreen.classList.remove('gone', 'unlocking');
  updateLsClock();
  clearInterval(lsClockInterval);
  lsClockInterval = setInterval(updateLsClock, 1000);
};

// Click anywhere to unlock
lockscreen.addEventListener('click', () => {
  doUnlock();
});

// Press any key to unlock when locked
document.addEventListener('keydown', (e) => {
  if (!unlocked && e.key !== 'Escape') {
    doUnlock();
  }
});

// Touch swipe up can still unlock
let tsY = 0;
lockscreen.addEventListener('touchstart', (e) => { tsY = e.touches[0].clientY; }, { passive: true });
lockscreen.addEventListener('touchend', (e) => {
  if (e.changedTouches[0].clientY - tsY < -50) doUnlock();
}, { passive: true });

// ---------- Live clock ----------
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now = new Date();
  const h = now.getHours();
  const m = pad(now.getMinutes());
  const isUz = (typeof currentLang === 'undefined' || currentLang === 'uz');

  if (isUz) {
    const dName = lsDaysUz[now.getDay()];
    const mName = lsMonthsUz[now.getMonth()].slice(0, 3);
    clockEl.textContent = `${dName}, ${now.getDate()}-${mName}  ${pad(h)}:${m}`;
  } else {
    let h12 = h % 12;
    if (h12 === 0) h12 = 12;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const dName = days[now.getDay()];
    const mName = months[now.getMonth()];
    clockEl.textContent = `${dName} ${mName} ${now.getDate()}  ${h12}:${m} ${ampm}`;
  }
}

window.updateClockAndDate = function() {
  updateLsClock();
  updateClock();
};
updateClock();
setInterval(updateClock, 1000);

// ---------- Dock magnification ----------
const dock = document.getElementById('dock');
const dockIcons = Array.from(dock.querySelectorAll('.dock-icon'));
const MAX_SCALE = 1.6, RANGE = 130;

dock.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  dockIcons.forEach(icon => {
    const ir = icon.getBoundingClientRect();
    const centerX = ir.left + ir.width / 2;
    const dist = Math.abs(mouseX - centerX);
    let scale = 1;
    if (dist < RANGE) {
      scale = 1 + (MAX_SCALE - 1) * (1 - dist / RANGE);
    }
    icon.style.transform = `scale(${scale})`;
    icon.style.zIndex = scale > 1.02 ? 5 : 1;
  });
});
dock.addEventListener('mouseleave', () => {
  dockIcons.forEach(icon => { icon.style.transform = 'scale(1)'; icon.style.zIndex = 1; });
});

// ---------- Bounce on click ----------
dockIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.add('bouncing');
    setTimeout(() => icon.classList.remove('bouncing'), 550);
  });
});

// ---------- Menu bar dropdowns (Apple / File / Edit / View / Go / Window / Help) ----------
const menuRoots = Array.from(document.querySelectorAll('.menu-root'));
let openRoot = null;

function closeAllMenus() {
  menuRoots.forEach(r => {
    r.querySelector('.menu-dropdown').classList.remove('open');
    r.querySelector('.menu-item').classList.remove('active');
  });
  openRoot = null;
}
function openMenu(root) {
  closeAllMenus();
  root.querySelector('.menu-dropdown').classList.add('open');
  root.querySelector('.menu-item').classList.add('active');
  openRoot = root;
}

menuRoots.forEach(root => {
  const trigger = root.querySelector('.menu-item');
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (openRoot === root) { closeAllMenus(); }
    else { openMenu(root); }
  });
  root.addEventListener('mouseenter', () => {
    if (openRoot && openRoot !== root) openMenu(root);
  });
  root.querySelectorAll('.mi:not(.disabled)').forEach(mi => {
    mi.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllMenus();
    });
  });
});
document.addEventListener('click', (e) => {
  if (openRoot && !openRoot.contains(e.target)) closeAllMenus();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllMenus();
});

// ---------- Spotlight Search ----------
const spotlightOverlay = document.getElementById('spotlightOverlay');
const spotlightInput = document.getElementById('spotlightInput');
const spotlightResults = document.getElementById('spotlightResults');
const spotlightClear = document.getElementById('spotlightClear');

const spotlightItems = [
  { id: 'about', titleUz: 'Men haqimda', titleEn: 'About Me', descUz: 'Biografiya, asosiy yo\'nalishlar va texnologiyalar', descEn: 'Biography, competencies & tech stack', type: 'Sahifa', icon: '👤', action: () => showPage('about') },
  { id: 'projects', titleUz: 'Proyektlar', titleEn: 'Projects', descUz: 'Barcha ishlab chiqilgan veb va AI loyihalar', descEn: 'All web & AI creations', type: 'Sahifa', icon: '📁', action: () => showPage('projects') },
  { id: 'experience', titleUz: 'Tajriba', titleEn: 'Experience', descUz: 'Ish faoliyati va informatika olimpiadasi tarixi', descEn: 'Work & competition history', type: 'Sahifa', icon: '💼', action: () => showPage('experience') },
  { id: 'skills', titleUz: "Ko'nikmalar", titleEn: 'Skills', descUz: 'Dasturlash tillari, frameworklar va vositalar', descEn: 'Languages, frameworks & dev tools', type: 'Sahifa', icon: '⚡', action: () => showPage('skills') },
  { id: 'resume', titleUz: 'Rezyume (CV)', titleEn: 'Resume (CV)', descUz: 'Rezyumeni ko\'rish va ma\'lumotlar', descEn: 'View Curriculum Vitae & info', type: 'Sahifa', icon: '📄', action: () => showPage('resume') },
  { id: 'contact', titleUz: "Bog'lanish", titleEn: 'Contact', descUz: 'Telegram, email va to\'g\'ridan-to\'g\'ri aloqa', descEn: 'Telegram, email & direct contact', type: 'Sahifa', icon: '💬', action: () => showPage('contact') },
  { id: 'optom', titleUz: 'Kiloli OPTOM Platformasi', titleEn: 'Kiloli OPTOM Platform', descUz: 'B2B ulgurji savdo veb-platformasi (React + FastAPI)', descEn: 'B2B wholesale trading platform', type: 'Loyiha', icon: '📦', action: () => window.open('https://optom-six.vercel.app/', '_blank') },
  { id: 'avto', titleUz: 'AvtoEmaktab Tizimi', titleEn: 'AvtoEmaktab System', descUz: 'Avtomaktab boshqaruvi va onlayn test simulyatori', descEn: 'Driving school LMS & test simulator', type: 'Loyiha', icon: '🚗', action: () => window.open('https://github.com/abduvoitov11/AvtoEmaktab', '_blank') },
  { id: 'focus', titleUz: 'Focus Media Tashkent', titleEn: 'Focus Media Tashkent', descUz: 'Raqamli media agentlik va video studio veb-sayti', descEn: 'Corporate digital agency website', type: 'Loyiha', icon: '🎬', action: () => window.open('https://abduvoitov11.github.io/focus-media-toshkent/', '_blank') },
  { id: 'grayhat', titleUz: 'GrayHat Kiberxavfsizlik Vositalari', titleEn: 'GrayHat Security Tools', descUz: 'Linux pentesting va tarmoq auditi skriptlari', descEn: 'Cybersecurity & network audit tools', type: 'Loyiha', icon: '🛡️', action: () => window.open('https://github.com/abduvoitov11/GrayHat-tools', '_blank') },
  { id: 'github', titleUz: 'GitHub Profil', titleEn: 'GitHub Profile', descUz: 'github.com/abduvoitov11', descEn: 'github.com/abduvoitov11', type: 'Havola', icon: '🐙', action: () => window.open('https://github.com/abduvoitov11', '_blank') },
  { id: 'telegram', titleUz: 'Telegram', titleEn: 'Telegram', descUz: '@TORABEK_ABDUVOITOV', descEn: '@TORABEK_ABDUVOITOV', type: 'Havola', icon: '✈️', action: () => window.open('https://t.me/TORABEK_ABDUVOITOV', '_blank') },
  { id: 'email', titleUz: 'Pochta (Email)', titleEn: 'Email', descUz: 'rgobzpe@gmail.com', descEn: 'rgobzpe@gmail.com', type: 'Havola', icon: '✉️', action: () => window.open('mailto:rgobzpe@gmail.com', '_blank') },
  { id: 'linkedin', titleUz: 'LinkedIn Profil', titleEn: 'LinkedIn Profile', descUz: 'linkedin.com/in/torabek', descEn: 'linkedin.com/in/torabek', type: 'Havola', icon: '💼', action: () => window.open('https://www.linkedin.com/in/torabek', '_blank') },
  { id: 'instagram', titleUz: 'Instagram', titleEn: 'Instagram', descUz: '@torabek_developer', descEn: '@torabek_developer', type: 'Havola', icon: '📸', action: () => window.open('https://www.instagram.com/torabek_developer/', '_blank') },
  { id: 'wallpaper', titleUz: 'Fon rasmi (Wallpaper)', titleEn: 'Wallpaper Picker', descUz: 'Desktop fon rasmlarini ko\'rish va almashtirish', descEn: 'Change desktop wallpaper', type: 'Sozlama', icon: '🖼️', action: () => { if (wpPicker) wpPicker.classList.add('show'); } },
  { id: 'lock', titleUz: 'Qulflash (Lock Screen)', titleEn: 'Lock Screen', descUz: 'Tizimni qulflash (Ctrl+Cmd+Q)', descEn: 'Lock the screen', type: 'Amal', icon: '🔒', action: () => doLock() },
  { id: 'lang', titleUz: 'Tilni almashtirish', titleEn: 'Switch Language', descUz: 'O\'zbekcha / English', descEn: 'English / O\'zbekcha', type: 'Amal', icon: '🌐', action: () => toggleLanguage() },
  { id: 'theme', titleUz: 'Mavzu (Theme)', titleEn: 'Toggle Theme', descUz: 'Qorong\'u / Yorug\' rejim', descEn: 'Dark / Light mode', type: 'Amal', icon: '🌓', action: () => document.body.classList.toggle('light-theme') },
];

let selectedSpotlightIndex = 0;
let currentSpotlightMatches = [];

function renderSpotlightResults(query) {
  if (!spotlightResults) return;
  const isUz = (typeof currentLang === 'undefined' || currentLang === 'uz');
  const q = (query || '').trim().toLowerCase();

  if (!q) {
    currentSpotlightMatches = spotlightItems.slice(0, 6);
  } else {
    currentSpotlightMatches = spotlightItems.filter(item => {
      const title = (isUz ? item.titleUz : item.titleEn).toLowerCase();
      const desc = (isUz ? item.descUz : item.descEn).toLowerCase();
      return title.includes(q) || desc.includes(q) || item.id.includes(q);
    });
  }

  selectedSpotlightIndex = 0;
  spotlightResults.innerHTML = '';

  if (currentSpotlightMatches.length === 0) {
    spotlightResults.innerHTML = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:14px;">${isUz ? "Hech narsa topilmadi" : "No results found"}</div>`;
    spotlightResults.classList.add('show');
    return;
  }

  currentSpotlightMatches.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'spotlight-item' + (idx === 0 ? ' selected' : '');
    const title = isUz ? item.titleUz : item.titleEn;
    const desc = isUz ? item.descUz : item.descEn;
    el.innerHTML = `
      <div class="spotlight-item-icon">${item.icon}</div>
      <div class="spotlight-item-info">
        <div class="spotlight-item-title">${title}</div>
        <div class="spotlight-item-desc">${desc}</div>
      </div>
      <div class="spotlight-item-tag">${item.type}</div>
    `;
    el.addEventListener('click', () => {
      closeOverlay('spotlightOverlay');
      item.action();
    });
    spotlightResults.appendChild(el);
  });

  spotlightResults.classList.add('show');
}

function updateSelectedSpotlightItem() {
  if (!spotlightResults) return;
  const items = spotlightResults.querySelectorAll('.spotlight-item');
  items.forEach((item, idx) => {
    item.classList.toggle('selected', idx === selectedSpotlightIndex);
    if (idx === selectedSpotlightIndex) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

if (spotlightInput) {
  spotlightInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (spotlightClear) spotlightClear.style.display = val ? 'flex' : 'none';
    renderSpotlightResults(val);
  });

  spotlightInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentSpotlightMatches.length > 0) {
        selectedSpotlightIndex = (selectedSpotlightIndex + 1) % currentSpotlightMatches.length;
        updateSelectedSpotlightItem();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentSpotlightMatches.length > 0) {
        selectedSpotlightIndex = (selectedSpotlightIndex - 1 + currentSpotlightMatches.length) % currentSpotlightMatches.length;
        updateSelectedSpotlightItem();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentSpotlightMatches.length > 0 && currentSpotlightMatches[selectedSpotlightIndex]) {
        closeOverlay('spotlightOverlay');
        currentSpotlightMatches[selectedSpotlightIndex].action();
      }
    }
  });
}

if (spotlightClear) {
  spotlightClear.addEventListener('click', () => {
    spotlightInput.value = '';
    spotlightClear.style.display = 'none';
    renderSpotlightResults('');
    spotlightInput.focus();
  });
}

const spotlightBtn = document.getElementById('spotlightBtn');
if (spotlightBtn) {
  spotlightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openOverlay('spotlightOverlay');
    renderSpotlightResults(spotlightInput ? spotlightInput.value : '');
    setTimeout(() => spotlightInput && spotlightInput.focus(), 80);
  });
}

// Global Shortcuts: Cmd/Ctrl+Space, Ctrl+Cmd+Q, Escape
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
    e.preventDefault();
    if (spotlightOverlay && spotlightOverlay.classList.contains('show')) {
      closeOverlay('spotlightOverlay');
    } else {
      openOverlay('spotlightOverlay');
      renderSpotlightResults(spotlightInput ? spotlightInput.value : '');
      setTimeout(() => spotlightInput && spotlightInput.focus(), 80);
    }
  }
  if (e.ctrlKey && (e.metaKey || e.altKey) && e.key.toLowerCase() === 'q') {
    e.preventDefault();
    doLock();
  }
  if (e.key === 'Escape') {
    closeOverlay('spotlightOverlay');
    if (wpPicker) wpPicker.classList.remove('show');
    closeAllMenus();
    if (document.body.classList.contains('page-active')) {
      showPage('home');
    }
  }
});

// ---------- Overlay helpers ----------
function openOverlay(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}
function closeOverlay(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => closeOverlay(el.dataset.close + 'Overlay'));
});

// Maximize page helper
window.toggleMaximizePage = function(pageId) {
  const page = typeof pageId === 'string' ? document.getElementById(pageId) : pageId.closest('.page-content');
  if (page) {
    page.classList.toggle('maximized');
  }
};

// ---------- Control Centre ----------
const ccPanel = document.getElementById('ccPanel');
const ccBtn = document.getElementById('ccBtn');
if (ccBtn && ccPanel) {
  ccBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ccPanel.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!ccPanel.contains(e.target) && e.target !== ccBtn && !ccBtn.contains(e.target)) {
      ccPanel.classList.remove('show');
    }
  });
}

const wifiIcon = document.getElementById('wifiIcon');
const btIcon = document.getElementById('btIcon');
const afIcon = document.getElementById('afIcon');

if (afIcon) {
  afIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    afIcon.classList.toggle('on');
    const isAirplane = afIcon.classList.contains('on');
    if (isAirplane) {
      if (wifiIcon) wifiIcon.classList.remove('on');
      if (btIcon) btIcon.classList.remove('on');
    } else {
      if (wifiIcon) wifiIcon.classList.add('on');
      if (btIcon) btIcon.classList.add('on');
    }
  });
}
if (wifiIcon) {
  wifiIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    wifiIcon.classList.toggle('on');
    if (wifiIcon.classList.contains('on') && afIcon) afIcon.classList.remove('on');
  });
}
if (btIcon) {
  btIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    btIcon.classList.toggle('on');
    if (btIcon.classList.contains('on') && afIcon) afIcon.classList.remove('on');
  });
}

// Display brightness slider
const ccDisplaySlider = document.getElementById('ccDisplaySlider');
if (ccDisplaySlider) {
  ccDisplaySlider.style.cursor = 'pointer';
  ccDisplaySlider.title = 'Yorug\'lik / Brightness';
  ccDisplaySlider.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = ccDisplaySlider.getBoundingClientRect();
    const pct = Math.max(25, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    ccDisplaySlider.style.background = `linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.85) ${pct}%, rgba(255,255,255,0.16) ${pct}%, rgba(255,255,255,0.16) 100%)`;
    const dt = document.querySelector('.desktop');
    if (dt) dt.style.filter = `brightness(${pct}%)`;
  });
}

// ---------- Wallpaper Picker ----------
const wallpapers = [
  { type: 'image', label: 'Mountains (Default)', value: 'assets/images/090846e8bea467388a24988b6239e86d.jpg' },
  { type: 'image', label: 'Valley Sunset', value: 'assets/images/valley-sunset.jpg' },
  { type: 'image', label: 'Cyberpunk Night', value: 'assets/images/cyberpunk-night.jpg' },
  { type: 'image', label: 'Deep Space', value: 'assets/images/deep-space.jpg' },
  { type: 'image', label: 'Foggy Forest', value: 'assets/images/foggy-forest.jpg' },
  { type: 'image', label: 'Aurora Sky', value: 'assets/images/aurora-sky.jpg' },
  { type: 'image', label: 'Desert Dunes', value: 'assets/images/desert-dunes.jpg' },
  { type: 'image', label: 'Abstract 3D Flow', value: 'assets/images/abstract-flow.jpg' },
  { type: 'image', label: 'Cyber Cityscape', value: 'assets/images/cyber-cityscape.jpg' },
  { type: 'image', label: 'Dark Classic', value: 'assets/images/6fba6553c9606fe12ebdc15512e1c6da.jpg' },
  { type: 'image', label: 'Batman', value: 'assets/images/BATMAN__.jfif' },
  { type: 'image', label: '4K Nebula', value: 'assets/images/4K_WALLPAPER.jpg' },
  { type: 'image', label: 'Minimalist Dark', value: 'assets/images/download.jfif' },
  { type: 'original', label: 'Aurora Vector' },
  { type: 'gradient', label: 'Nebula', value: 'linear-gradient(135deg,#1a0040 0%,#6600cc 30%,#cc00aa 60%,#ff6600 100%)' },
  { type: 'gradient', label: 'Sunset', value: 'linear-gradient(160deg,#0d0221 0%,#8b005d 30%,#e8003d 60%,#ff8c00 85%,#ffd000 100%)' },
  { type: 'gradient', label: 'Ocean', value: 'linear-gradient(160deg,#000428 0%,#004e92 40%,#009fff 75%,#00e4ff 100%)' },
  { type: 'gradient', label: 'Forest', value: 'linear-gradient(160deg,#0a1a00 0%,#1a5c00 35%,#00aa44 65%,#00ff99 100%)' },
  { type: 'gradient', label: 'Candy', value: 'linear-gradient(135deg,#fc466b 0%,#3f5efb 50%,#00d2ff 100%)' },
  { type: 'gradient', label: 'Volcano', value: 'linear-gradient(160deg,#0d0000 0%,#7a0000 30%,#cc2200 55%,#ff6600 75%,#ffcc00 100%)' },
  { type: 'gradient', label: 'Galaxy', value: 'linear-gradient(135deg,#020024 0%,#090979 40%,#00d4ff 100%)' },
  { type: 'gradient', label: 'Rose', value: 'linear-gradient(135deg,#1a0010 0%,#880055 40%,#ff0088 70%,#ffaacc 100%)' },
  { type: 'gradient', label: 'Arctic', value: 'linear-gradient(160deg,#000d1a 0%,#002244 35%,#0066cc 65%,#66ccff 100%)' },
];

const wpPicker = document.getElementById('wpPicker');
const wpGrid = document.getElementById('wpGrid');
const wallpaperEl = document.querySelector('.wallpaper');
let activeWpIndex = 0;

// Build thumbnails
if (wpGrid) {
  wallpapers.forEach((wp, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'wp-thumb' + (i === 0 ? ' active' : '');
    if (wp.type === 'original') {
      thumb.style.background = 'linear-gradient(135deg,#0a0c18,#1a0533 50%,#0a3a36)';
      thumb.innerHTML = `<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
          <defs>
            <linearGradient id="tg${i}" x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stop-color="#0a0c18"/><stop offset="50%" stop-color="#070811"/><stop offset="100%" stop-color="#04050a"/></linearGradient>
            <radialGradient id="pg${i}" cx="80%" cy="8%" r="55%"><stop offset="0%" stop-color="#8855ff" stop-opacity="0.5"/><stop offset="100%" stop-color="#8855ff" stop-opacity="0"/></radialGradient>
            <radialGradient id="cg${i}" cx="10%" cy="100%" r="65%"><stop offset="0%" stop-color="#15d6c4" stop-opacity="0.55"/><stop offset="100%" stop-color="#15d6c4" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="160" height="100" fill="url(#tg${i})"/>
          <rect width="160" height="100" fill="url(#pg${i})"/>
          <rect width="160" height="100" fill="url(#cg${i})"/>
          <path d="M-4,-4 C10,2 15,12 27,14 C40,17 43,10 56,15 C70,20 68,30 82,36 C96,42 104,36 118,43 C133,51 141,47 164,54 L164,73 C141,66 133,70 118,63 C104,55 96,62 82,56 C68,50 70,40 56,35 C43,30 40,37 27,34 C15,31 10,22 -4,15 Z" fill="url(#ribbonGrad)" opacity="0.6"/>
        </svg>`;
    } else if (wp.type === 'image') {
      thumb.style.background = `url(${wp.value}) center/cover`;
    } else {
      thumb.style.background = wp.value;
    }
    thumb.title = wp.label;
    thumb.addEventListener('click', () => applyWallpaper(i));
    wpGrid.appendChild(thumb);
  });
}

function checkBrightness(url, callback) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]; g += data[i + 1]; b += data[i + 2];
      }
      const total = data.length / 4;
      const brightness = ((r / total) * 299 + (g / total) * 587 + (b / total) * 114) / 1000;
      callback(brightness > 130);
    } catch (e) { callback(false); }
  };
  img.onerror = () => callback(false);
  img.src = url;
}

function applyWallpaper(index) {
  const wp = wallpapers[index];
  if (!wp) return;
  activeWpIndex = index;
  try { localStorage.setItem('torabek_wp', index); } catch (e) {}

  if (wpGrid) {
    wpGrid.querySelectorAll('.wp-thumb').forEach((t, i) => t.classList.toggle('active', i === index));
  }

  const setLightMode = (isLight) => {
    if (isLight) document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');
  };

  const lsBg = document.querySelector('.ls-bg');

  if (wp.type === 'original') {
    if (wallpaperEl) wallpaperEl.style.display = '';
    document.querySelector('.desktop').style.background = '';
    if (lsBg) lsBg.style.background = 'linear-gradient(135deg,#0a0c18,#1a0533 50%,#0a3a36)';
    setLightMode(false);
  } else if (wp.type === 'gradient') {
    if (wallpaperEl) wallpaperEl.style.display = 'none';
    document.querySelector('.desktop').style.background = wp.value;
    if (lsBg) lsBg.style.background = wp.value;
    setLightMode(false);
  } else if (wp.type === 'image') {
    if (wallpaperEl) wallpaperEl.style.display = 'none';
    document.querySelector('.desktop').style.background = `url(${wp.value}) center/cover no-repeat`;
    if (lsBg) lsBg.style.background = `url(${wp.value}) center/cover no-repeat`;
    checkBrightness(wp.value, setLightMode);
  }
}

// Manual Theme Toggle
const themeToggleBtn = document.getElementById('themeToggleBtn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });
}

// Upload handler
const wpUpload = document.getElementById('wpUpload');
if (wpUpload) {
  wpUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const idx = wallpapers.length;
    wallpapers.push({ type: 'image', label: file.name, value: url });
    const thumb = document.createElement('div');
    thumb.className = 'wp-thumb';
    thumb.style.backgroundImage = `url(${url})`;
    thumb.style.backgroundSize = 'cover';
    thumb.style.backgroundPosition = 'center';
    thumb.title = file.name;
    thumb.addEventListener('click', () => applyWallpaper(idx));
    if (wpGrid) wpGrid.appendChild(thumb);
    applyWallpaper(idx);
    e.target.value = '';
  });
}

// Toggle picker from dock
const wallpaperDockBtn = document.getElementById('wallpaperDockBtn');
if (wallpaperDockBtn) {
  wallpaperDockBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    wallpaperDockBtn.classList.add('bouncing');
    setTimeout(() => wallpaperDockBtn.classList.remove('bouncing'), 550);
    if (wpPicker) wpPicker.classList.toggle('show');
  });
}
const wpClose = document.getElementById('wpClose');
if (wpClose) {
  wpClose.addEventListener('click', () => wpPicker && wpPicker.classList.remove('show'));
}
document.addEventListener('click', (e) => {
  if (wpPicker && wallpaperDockBtn && !wpPicker.contains(e.target) && !wallpaperDockBtn.contains(e.target)) {
    wpPicker.classList.remove('show');
  }
});

// Load saved or default wallpaper
let savedWp = null;
try { savedWp = localStorage.getItem('torabek_wp'); } catch (e) {}
const initialWp = (savedWp !== null && wallpapers[parseInt(savedWp, 10)]) ? parseInt(savedWp, 10) : 0;
applyWallpaper(initialWp);

// ============ WINDOW MANAGER ============
const openWindows = {};
let highestZIndex = 1000;
const desktop = document.querySelector('.desktop');

let draggingWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

document.addEventListener('mousemove', (e) => {
  if (!draggingWindow) return;
  draggingWindow.style.left = (e.clientX - dragOffsetX) + 'px';
  draggingWindow.style.top = (e.clientY - dragOffsetY) + 'px';
});

document.addEventListener('mouseup', () => {
  draggingWindow = null;
});

window.bringToFront = function (winId) {
  if (!openWindows[winId]) return;
  highestZIndex++;
  openWindows[winId].element.style.zIndex = highestZIndex;
}

window.closeWindow = function (winId) {
  if (!openWindows[winId]) return;
  openWindows[winId].element.remove();
  delete openWindows[winId];
}

window.minimizeWindow = function (winId) {
  if (!openWindows[winId]) return;
  openWindows[winId].element.style.display = 'none';
  openWindows[winId].minimized = true;
}

window.maximizeWindow = function (winId) {
  if (!openWindows[winId]) return;
  const winEl = openWindows[winId].element;
  winEl.classList.toggle('maximized');
  if (!winEl.classList.contains('maximized')) {
    winEl.style.left = '50%';
    winEl.style.top = '50%';
    winEl.style.transform = 'translate(-50%, -50%)';
  } else {
    winEl.style.transform = 'none';
  }
}

window.openApp = function (name, url) {
  const winId = name.replace(/\s+/g, '-').toLowerCase();

  // If already open, just bring to front and un-minimize
  if (openWindows[winId]) {
    const winEl = openWindows[winId].element;
    winEl.style.display = 'flex';
    openWindows[winId].minimized = false;
    bringToFront(winId);
    return;
  }

  // Create new window
  const winEl = document.createElement('div');
  winEl.className = 'mac-window';
  if (url.includes('retrogames') || url.includes('gettingoverit') ) winEl.classList.add('solid-mode');

  winEl.innerHTML = `
        <div class="window-titlebar">
          <div class="window-controls">
            <div class="win-btn close" onclick="closeWindow('${winId}')"></div>
            <div class="win-btn minimize" onclick="minimizeWindow('${winId}')"></div>
            <div class="win-btn maximize" onclick="maximizeWindow('${winId}')"></div>
          </div>
          <div class="window-title">${name}</div>
        </div>
        <div class="window-content">
          <iframe src="${url}" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" allow="cross-origin-isolated"></iframe>
        </div>
      `;

  desktop.appendChild(winEl);
  openWindows[winId] = { element: winEl, minimized: false };

  // Positioning
  winEl.style.left = '50%';
  winEl.style.top = '50%';
  winEl.style.transform = 'translate(-50%, -50%)';
  bringToFront(winId);

  // Dragging logic
  const titlebar = winEl.querySelector('.window-titlebar');
  titlebar.addEventListener('mousedown', (e) => {
    bringToFront(winId);
    if (e.target.classList.contains('win-btn') || winEl.classList.contains('maximized')) return;
    draggingWindow = winEl;
    const rect = winEl.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    winEl.style.transform = 'none';
    winEl.style.left = rect.left + 'px';
    winEl.style.top = rect.top + 'px';
  });

  // Bring to front on click anywhere in window
  winEl.addEventListener('mousedown', () => bringToFront(winId));
}

function showPage(pageId) {
  const isHome = pageId === 'home';
  const homeView = document.getElementById('home-view');
  if (homeView) homeView.style.display = isHome ? 'flex' : 'none';
  document.body.classList.toggle('page-active', !isHome);
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  if (!isHome) {
    document.getElementById(pageId + '-page').classList.add('active');
  }
  document.querySelectorAll('.mp-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
  // Always reveal the nav on navigation, and scroll the freshly-active
  // page back to its top so the hide/show state starts clean.
  const navEl = document.getElementById('mobilePageNav');
  if (navEl) navEl.classList.remove('mp-nav-hidden');
  if (!isHome) {
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.scrollTop = 0;
  }
}

// Scroll-aware mobile nav: hide the capsule row while scrolling down
// (more reading room), bring it back the moment the user scrolls up —
// mirrors how Safari/Mail collapse their toolbars on iOS.
(function setupScrollAwareMobileNav() {
  const navEl = document.getElementById('mobilePageNav');
  if (!navEl) return;

  const THRESHOLD = 8;     // px of scroll movement before reacting, avoids jitter
  const TOP_SLACK = 24;    // always show nav near the very top of a page

  document.querySelectorAll('.page-content').forEach(pageEl => {
    let lastScrollTop = 0;
    let accumulated = 0;

    pageEl.addEventListener('scroll', () => {
      const current = pageEl.scrollTop;
      const delta = current - lastScrollTop;

      if (current <= TOP_SLACK) {
        navEl.classList.remove('mp-nav-hidden');
        accumulated = 0;
        lastScrollTop = current;
        return;
      }

      // Only accumulate while moving in one consistent direction so a
      // quick back-and-forth wobble doesn't flip the nav rapidly.
      if ((delta > 0 && accumulated < 0) || (delta < 0 && accumulated > 0)) {
        accumulated = 0;
      }
      accumulated += delta;

      if (accumulated > THRESHOLD) {
        navEl.classList.add('mp-nav-hidden');
        accumulated = 0;
      } else if (accumulated < -THRESHOLD) {
        navEl.classList.remove('mp-nav-hidden');
        accumulated = 0;
      }

      lastScrollTop = current;
    }, { passive: true });
  });
})();

