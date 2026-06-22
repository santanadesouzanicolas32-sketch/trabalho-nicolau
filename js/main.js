/* ══════════════════════════════════════════════════
   BRECHÓ ECO-HERANÇA — MAIN JS
   js/main.js
══════════════════════════════════════════════════ */

/* ── STATE ──────────────────────────────────────── */
let favs      = JSON.parse(localStorage.getItem('eh_favs') || '[]');
let curFilter = 'todos';
let curSearch = '';
let curProd   = null;
let isDragging = false, startX = 0, scrollLeft = 0;

/* ── SCROLL ÚNICO + PASSIVO ──────────────────────── */
const _pgbar = document.getElementById('pgbar');
const _nav   = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const sp  = document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (_pgbar && max > 0) _pgbar.style.width = (sp / max * 100) + '%';
  if (_nav) _nav.classList.toggle('stuck', sp > 60);
}, { passive: true });

/* ── MOBILE MENU ─────────────────────────────────── */
function toggleMenu() {
  document.getElementById('menu-btn').classList.toggle('open');
  const mm = document.getElementById('mobile-menu');
  mm.classList.toggle('open');
  document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
}
window.toggleMenu = toggleMenu;

/* ── LOADER ──────────────────────────────────────── */
const _isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('out');
    if (window.lucide) lucide.createIcons();
    if (!_isMobile && window.setupMagneticCursor) window.setupMagneticCursor();
  }, _isMobile ? 600 : 1000);
});

/* ── REVEAL ON SCROLL ────────────────────────────── */
function observeReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv,.rl,.rr').forEach(el => {
    if (!el.classList.contains('in')) obs.observe(el);
  });
}

/* ── ANIMATED COUNTERS ───────────────────────────── */
function animCounter(el) {
  const raw    = el.dataset.target || el.textContent.replace(/[^0-9.]/g, '');
  const target = parseFloat(raw);
  if (isNaN(target)) return;
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();
  function step(now) {
    const p    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val  = target * ease;
    el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function observeCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-counter]').forEach(el => obs.observe(el));
}

/* ── RENDER NOVIDADES ────────────────────────────── */
function renderNov() {
  const w = document.getElementById('nov-scroll');
  if (!w) return;
  const novs = produtos.filter(p => p.nov);
  w.innerHTML = novs.map(p => {
    const bdg = p.badge ? `<span class="nov-badge">${p.bdTxt}</span>` : '';
    return `<div class="nov-card" onclick="openModal(${p.id})" style="cursor:none">
      ${bdg}
      <div class="nov-card-img">
        <img src="${p.img}" alt="${p.nome}" loading="lazy"
          onerror="this.style.background='var(--bg3)';this.removeAttribute('src')">
      </div>
      <div class="nov-card-info">
        <p class="nov-cat">${p.catTag}</p>
        <h3 class="nov-nm">${p.nome}</h3>
        <p class="nov-consultar">🏪 Consultar na Loja</p>
      </div>
    </div>`;
  }).join('');

  // Drag scroll
  w.addEventListener('mousedown', e => { isDragging = true; startX = e.pageX - w.offsetLeft; scrollLeft = w.scrollLeft; w.style.cursor = 'grabbing'; });
  w.addEventListener('mouseleave', () => { isDragging = false; w.style.cursor = 'grab'; });
  w.addEventListener('mouseup',   () => { isDragging = false; w.style.cursor = 'grab'; });
  w.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    w.scrollLeft = scrollLeft - (e.pageX - w.offsetLeft - startX) * 1.2;
  });
}

/* ── RENDER CATALOG ──────────────────────────────── */
function renderProds() {
  const grid = document.getElementById('prod-grid');
  if (!grid) return;
  const list = produtos.filter(p => {
    const mf = curFilter === 'todos' || p.cat === curFilter;
    const ms = !curSearch || [p.nome, p.catTag, p.desc].some(s => s.toLowerCase().includes(curSearch));
    return mf && ms;
  });
  if (!list.length) {
    grid.innerHTML = '<div class="no-res">Nenhuma peça encontrada...</div>';
    return;
  }
  grid.innerHTML = list.map(p => {
    const fav    = favs.includes(p.id);
    const inCart = typeof isInCart === 'function' ? isInCart(p.id) : false;
    const fi     = fav ? 'fill:var(--rose);color:var(--rose);' : '';
    const bdg    = p.badge ? `<span class="p-badge bd-${p.badge}">${p.bdTxt}</span>` : '';
    const cartLbl = inCart
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><polyline points="20 6 9 17 4 12"/></svg> Na Lista`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Quero esta`;
    return `<div class="p-card rv" data-id="${p.id}">
      <div class="p-img">${bdg}
        <button class="p-fav${fav?' on':''}" data-fid="${p.id}" onclick="event.stopPropagation();toggleFav(${p.id})" title="Favoritar">
          <i data-lucide="heart" style="width:13px;height:13px;${fi}"></i>
        </button>
        <img src="${p.img}" alt="${p.nome}" loading="lazy"
          onerror="this.style.background='var(--bg3)';this.removeAttribute('src')">
        <div class="p-img-overlay"></div>
        <button class="p-hover-cta" onclick="event.stopPropagation();openModal(${p.id})">Ver detalhes</button>
      </div>
      <div class="p-body">
        <p class="p-cat">${p.catTag}</p>
        <h3 class="p-nm">${p.nome}</h3>
        <div class="p-card-actions">
          <button class="p-add-cart${inCart?' added':''}" data-pid="${p.id}"
            onclick="event.stopPropagation();addToCart(${p.id})">${cartLbl}</button>
          <span class="p-eco">🌿</span>
        </div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.p-card').forEach(c => {
    c.addEventListener('click', function(e) {
      if (!e.target.closest('.p-fav') && !e.target.closest('.p-add-cart') && !e.target.closest('.p-hover-cta')) {
        openModal(parseInt(this.dataset.id));
      }
    });
  });

  if (window.lucide) lucide.createIcons();
  observeReveal();
  updFavCt();
  if (window.setupMagneticCursor) window.setupMagneticCursor();
}

/* ── RENDER GALLERY ──────────────────────────────── */
function renderGallery() {
  const g = document.getElementById('gallery-grid');
  if (!g) return;
  g.innerHTML = galleryImgs.map((src, i) =>
    `<div class="gallery-item rv" style="transition-delay:${i*.05}s">
      <img src="${src}" alt="Galeria ${i+1}" loading="lazy"
        onerror="this.parentElement.style.display='none'">
    </div>`
  ).join('');
}

/* ── RENDER INSTAGRAM ────────────────────────────── */
function renderIg() {
  const g = document.getElementById('ig-grid');
  if (!g) return;
  g.innerHTML = igImgs.slice(0, 10).map(src =>
    `<div class="ig-item">
      <img src="${src}" alt="Instagram Eco-Herança" loading="lazy"
        onerror="this.parentElement.style.display='none'">
      <div class="ig-item-overlay"></div>
    </div>`
  ).join('');
}

/* ── RENDER FAQ ──────────────────────────────────── */
function renderFaq() {
  const c = document.getElementById('faq-inner');
  if (!c) return;
  c.innerHTML = faqData.map((f, i) => `
    <div class="faq-item rv" style="transition-delay:${i*.06}s">
      <div class="faq-q" onclick="toggleFaq(this.parentElement)">
        <span class="faq-q-text">${f.q}</span>
        <div class="faq-icon"><i data-lucide="plus"></i></div>
      </div>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>`
  ).join('');
  if (window.lucide) lucide.createIcons();
}
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = '0';
  });
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a-inner').scrollHeight + 'px';
  }
}
window.toggleFaq = toggleFaq;

/* ── FILTERS ─────────────────────────────────────── */
const filtersEl = document.getElementById('filters');
if (filtersEl) {
  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.cat-filter');
    if (!btn) return;
    document.querySelectorAll('.cat-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    curFilter = btn.dataset.f;
    renderProds();
  });
}
const searchEl = document.getElementById('search-input');
if (searchEl) {
  let _searchTimer;
  searchEl.addEventListener('input', e => {
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(() => {
      curSearch = e.target.value.toLowerCase().trim();
      renderProds();
    }, 220);
  });
}
function setFilter(f) {
  curFilter = f;
  document.querySelectorAll('.cat-filter').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  renderProds();
  setTimeout(() => document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' }), 100);
}
window.setFilter = setFilter;

/* ── FAVORITES ───────────────────────────────────── */
function toggleFav(id) {
  const idx = favs.indexOf(id);
  if (idx > -1) favs.splice(idx, 1); else favs.push(id);
  localStorage.setItem('eh_favs', JSON.stringify(favs));
  renderProds();
  updFavCt();
}
function updFavCt() {
  const ct = document.getElementById('fav-ct');
  if (!ct) return;
  ct.textContent = favs.length;
  ct.classList.toggle('show', favs.length > 0);
}
function openFavs() {
  setFilter('todos');
  curSearch = '';
  if (searchEl) searchEl.value = '';
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}
window.toggleFav = toggleFav;
window.openFavs  = openFavs;

/* ── MODAL ───────────────────────────────────────── */
function openModal(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  curProd = p;
  const mImg = document.getElementById('m-img');
  if (mImg) { mImg.src = p.img; mImg.alt = p.nome; }
  const mCat  = document.getElementById('m-cat');  if (mCat)  mCat.textContent  = p.catTag;
  const mNm   = document.getElementById('m-nm');   if (mNm)   mNm.textContent   = p.nome;
  const mDesc = document.getElementById('m-desc'); if (mDesc) mDesc.textContent  = p.desc;
  const mWa   = document.getElementById('m-wa');
  if (mWa) {
    const msg = encodeURIComponent(`Olá! Vi a peça "${p.nome}" no site do Brechó Eco-Herança e gostaria de saber mais. Ainda está disponível?`);
    mWa.href = `https://wa.me/5511965030076?text=${msg}`;
  }
  // Cart button in modal
  const mCart = document.getElementById('m-cart-btn');
  if (mCart) {
    const inCart = typeof isInCart === 'function' ? isInCart(p.id) : false;
    mCart.textContent = inCart ? '✓ Na lista de interesse' : '+ Adicionar à lista';
    mCart.classList.toggle('added', inCart);
    mCart.onclick = () => {
      addToCart(p.id);
      const inc = typeof isInCart === 'function' ? isInCart(p.id) : false;
      mCart.textContent = inc ? '✓ Na lista de interesse' : '+ Adicionar à lista';
      mCart.classList.toggle('added', inc);
    };
  }
  updModalFav();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  curProd = null;
}
function updModalFav() {
  const btn = document.getElementById('m-fav');
  const txt = document.getElementById('m-fav-txt');
  if (!btn || !curProd) return;
  const on = favs.includes(curProd.id);
  btn.classList.toggle('on', on);
  if (txt) txt.textContent = on ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
}
function toggleFavModal() {
  if (!curProd) return;
  toggleFav(curProd.id);
  updModalFav();
}
window.openModal      = openModal;
window.closeModal     = closeModal;
window.toggleFavModal = toggleFavModal;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── HERO GRID LINES ─────────────────────────────── */
function addGridLines() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const gl = document.createElement('div');
  gl.className = 'hero-grid-lines';
  gl.innerHTML = Array.from({length:6}, (_,i) => `<span style="left:${i*20}%"></span>`).join('');
  hero.appendChild(gl);
}

/* ── INIT ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderNov();
  renderProds();
  renderGallery();
  renderIg();
  renderFaq();
  observeReveal();
  observeCounters();
  addGridLines();
  updFavCt();
  if (window.lucide) lucide.createIcons();
});
window.addEventListener('load', () => {
  if (window.lucide) lucide.createIcons();
  observeReveal();
});
