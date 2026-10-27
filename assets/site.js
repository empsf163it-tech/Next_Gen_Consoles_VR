const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '×' : '☰';
  });
}

const STORAGE_KEY = 'vrgamez-saved-games';
const LEGACY_STORAGE_KEY = 'playhub-saved-games';

function getSaved() {
  try {
    const data = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || '[]';
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function setSaved(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {}
}

function updateSavedUI() {
  const saved = getSaved();
  const count = document.querySelector('#saved-count');
  if (count) count.textContent = saved.length;
  document.querySelectorAll('[data-save]').forEach(btn => {
    const on = saved.includes(btn.dataset.save);
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? '♥ Saved' : '♡ Save';
  });
}

document.querySelectorAll('[data-save]').forEach(btn => {
  btn.addEventListener('click', () => {
    let saved = getSaved();
    if (saved.includes(btn.dataset.save)) {
      saved = saved.filter(x => x !== btn.dataset.save);
    } else {
      saved.push(btn.dataset.save);
    }
    setSaved(saved);
    updateSavedUI();
  });
});

updateSavedUI();

const search = document.querySelector('#game-search');
const genre = document.querySelector('#genre-filter');
const platform = document.querySelector('#platform-filter');
const clear = document.querySelector('#clear-filters');

function filterGames() {
  const q = (search?.value || '').toLowerCase().trim();
  const g = genre?.value || 'all';
  const p = platform?.value || 'all';
  let n = 0;

  document.querySelectorAll('#content-grid .content-card').forEach(card => {
    const titleMatch = (card.dataset.title || '').toLowerCase().includes(q);
    const textMatch = card.textContent.toLowerCase().includes(q);
    const matchQ = !q || titleMatch || textMatch;
    const matchG = g === 'all' || card.dataset.genre === g;
    const matchP = p === 'all' || card.dataset.platform === p;
    const show = matchQ && matchG && matchP;

    card.hidden = !show;
    if (show) n++;
  });

  const count = document.querySelector('#result-count');
  if (count) count.textContent = `${n} ${n === 1 ? 'game' : 'games'}`;
  const empty = document.querySelector('#empty-state');
  if (empty) empty.hidden = n > 0;
}

[search, genre, platform].forEach(el => {
  if (el) el.addEventListener(el === search ? 'input' : 'change', filterGames);
});

if (clear) {
  clear.addEventListener('click', () => {
    if (search) search.value = '';
    if (genre) genre.value = 'all';
    if (platform) platform.value = 'all';
    filterGames();
  });
}

const newsletter = document.querySelector('#newsletter-form');
if (newsletter) {
  newsletter.addEventListener('submit', e => {
    e.preventDefault();
    const note = document.querySelector('#newsletter-note');
    if (note) note.textContent = 'Thanks! You are subscribed to VRGameZ updates.';
    newsletter.reset();
  });
}

document.querySelectorAll('.footer-newsletter-bar').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = form.parentElement.querySelector('.footer-newsletter-status');
    if (status) status.textContent = 'Subscribed! Check your inbox.';
    form.reset();
  });
});

// ================= Back to Top Functionality =================
function initBackToTop() {
  let btn = document.querySelector('#back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to top');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

initBackToTop();

