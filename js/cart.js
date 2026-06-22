/* ══════════════════════════════════════════════════
   BRECHÓ ECO-HERANÇA — CART + CURSOR MAGNÉTICO
   js/cart.js
══════════════════════════════════════════════════ */

/* ── CART STATE ─────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('eh_cart') || '[]');

function saveCart() {
  localStorage.setItem('eh_cart', JSON.stringify(cart));
}

function getCartCount() { return cart.length; }

function isInCart(id) { return cart.some(i => i.id === id); }

/* ── ADD / REMOVE ────────────────────────────────── */
function addToCart(id) {
  if (isInCart(id)) { removeFromCart(id); return; }
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  cart.push({ id: p.id, nome: p.nome, img: p.img, catTag: p.catTag, badge: p.badge, bdTxt: p.bdTxt });
  saveCart();
  updateCartBadge();
  updateAllCartButtons();
  showToast(`"${p.nome}" adicionado à lista`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBadge();
  updateAllCartButtons();
  renderCartItems();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartBadge();
  updateAllCartButtons();
  renderCartItems();
}

/* ── BADGE ───────────────────────────────────────── */
function updateCartBadge() {
  const b = document.getElementById('cart-count-badge');
  if (!b) return;
  const n = getCartCount();
  b.textContent = n;
  b.classList.toggle('show', n > 0);
}

/* ── TOAST ───────────────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('cart-toast');
  if (!t) return;
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── DRAWER ──────────────────────────────────────── */
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
window.openCart  = openCart;
window.closeCart = closeCart;

/* ── RENDER CART ITEMS ───────────────────────────── */
function renderCartItems() {
  const body = document.getElementById('cart-body');
  const waBtn = document.getElementById('cart-wa-btn');
  const clearBtn = document.getElementById('cart-clear-btn');
  const countEl = document.getElementById('cart-item-count');
  if (!body) return;

  const n = getCartCount();
  if (countEl) countEl.textContent = n;
  const footerCount = document.getElementById('cart-footer-count');
  if (footerCount) footerCount.textContent = n;
  if (waBtn)   waBtn.style.display = n ? 'flex' : 'none';
  if (clearBtn) clearBtn.style.display = n ? 'flex' : 'none';

  if (!n) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>Sua lista está vazia.<br>Adicione peças que te interessam!</p>
        <button class="btn-ghost" onclick="closeCart();document.getElementById('catalogo').scrollIntoView({behavior:'smooth'})">
          Ver Catálogo
        </button>
      </div>`;
    return;
  }

  body.innerHTML = cart.map(item => {
    const bdgHtml = item.badge
      ? `<span class="cart-item-badge bd-${item.badge}">${item.bdTxt}</span>`
      : '';
    return `
    <div class="cart-item" data-cid="${item.id}">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.nome}" loading="lazy">
      </div>
      <div class="cart-item-info">
        <p class="cart-item-cat">${item.catTag}</p>
        ${bdgHtml}
        <h4 class="cart-item-name">${item.nome}</h4>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remover">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>`;
  }).join('');

  // WhatsApp message
  if (waBtn) {
    const items = cart.map(i => `• ${i.nome}`).join('\n');
    const msg = encodeURIComponent(
      `Olá! Tenho interesse nas seguintes peças do Brechó Eco-Herança:\n\n${items}\n\nPodem me dar mais informações?`
    );
    waBtn.href = `https://wa.me/5511965030076?text=${msg}`;
  }
}

/* ── UPDATE ALL CART BUTTONS ─────────────────────── */
function updateAllCartButtons() {
  document.querySelectorAll('.p-add-cart[data-pid]').forEach(btn => {
    const id = parseInt(btn.dataset.pid);
    const inCart = isInCart(id);
    btn.classList.toggle('added', inCart);
    btn.innerHTML = inCart
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><polyline points="20 6 9 17 4 12"/></svg> Na Lista`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Quero esta`;
    btn.title = inCart ? 'Remover da lista' : 'Adicionar à lista de interesse';
  });
}
window.addToCart     = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart     = clearCart;

/* ══════════════════════════════════════════════════
   CURSOR MAGNÉTICO OTIMIZADO
══════════════════════════════════════════════════ */
(function initCursor() {
  // Não inicializar em dispositivos touch — sem cursor
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let rx = mx, ry = my;
  let velX = 0, velY = 0;
  let magTarget = null;
  let magX = 0, magY = 0;
  let isMagActive = false;

  // Smooth spring interpolation
  const LERP = 0.13, SPRING = 0.08, DAMP = 0.75;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));

  // Detect text inputs
  document.addEventListener('focusin', e => {
    if (['INPUT','TEXTAREA'].includes(e.target.tagName)) document.body.classList.add('cursor-text');
  });
  document.addEventListener('focusout', e => {
    if (['INPUT','TEXTAREA'].includes(e.target.tagName)) document.body.classList.remove('cursor-text');
  });

  // Magnetic effect setup
  function setupMagnetic() {
    document.querySelectorAll('.btn-rose, .btn-ghost, .btn-wa, .cart-wa-btn, #wa-fab, .nav-icon-btn, .p-add-cart').forEach(el => {
      el.addEventListener('mouseenter', function() {
        magTarget = this;
        isMagActive = true;
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function() {
        magTarget = null;
        isMagActive = false;
        document.body.classList.remove('cursor-hover');
        // Snap ring back
        velX = 0; velY = 0;
      });
    });

    // Regular hover elements
    document.querySelectorAll('a:not(.btn-rose):not(.btn-ghost), .p-card, .gallery-item, .ig-item, .nov-card, .faq-q, .cat-filter').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // Animation loop — spring physics
  function animRing() {
    let targetX = mx, targetY = my;

    if (isMagActive && magTarget) {
      const rect = magTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = mx - cx, dy = my - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const pull = Math.max(0, 1 - dist / 80);
      magX = cx + dx * (1 - pull * 0.5);
      magY = cy + dy * (1 - pull * 0.5);
      targetX = magX; targetY = magY;
    }

    // Spring physics for ring
    const fx = (targetX - rx) * SPRING;
    const fy = (targetY - ry) * SPRING;
    velX = (velX + fx) * DAMP;
    velY = (velY + fy) * DAMP;
    rx += velX; ry += velY;

    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Re-run magnetic setup after dynamic content renders
  window.setupMagneticCursor = setupMagnetic;
  setTimeout(setupMagnetic, 1600);
})();

/* ── INIT ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartItems();
  // Re-setup magnetic after render
  setTimeout(() => { if (window.setupMagneticCursor) window.setupMagneticCursor(); }, 2000);
});
