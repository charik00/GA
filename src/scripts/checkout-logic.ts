/* Checkout: renders the order summary from the real cart (no demo data),
 * validates the form, then submits the order to /api/order (email + Telegram)
 * and shows the Order received screen. No online payment. */
interface CartItem { id: string; name: string; kind: string; price: number | null; qty: number; img: string }

const KEY = 'ga-cart';
function readCart(): CartItem[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch { return []; }
}
const fmt = (n: number) => n.toLocaleString('en-US');

const list = document.getElementById('co-sum-list');
const subEl = document.getElementById('co-subtotal');
const form = document.getElementById('co-form') as HTMLFormElement | null;
const err = document.getElementById('co-err');
const placeBtn = form?.querySelector('.co-place') as HTMLButtonElement | null;

const items = readCart();

function renderSummary() {
  if (!list || !subEl) return;
  if (!items.length) {
    list.innerHTML = '<li class="co-sum-row"><span class="l"><span class="meta">Your cart is empty. <a href="/products">Browse formulas</a></span></span></li>';
    subEl.innerHTML = '0&nbsp;<span class="cur">&#8362;</span>';
    if (placeBtn) placeBtn.disabled = true;
    return;
  }
  let sub = 0;
  let anyUnpriced = false;
  list.innerHTML = items.map((it) => {
    const hasPrice = typeof it.price === 'number';
    if (hasPrice) sub += (it.price as number) * it.qty;
    else anyUnpriced = true;
    const amt = hasPrice ? `${fmt((it.price as number) * it.qty)}&nbsp;&#8362;` : 'On request';
    return `<li class="co-sum-row"><span class="l"><span class="nm">${it.name}</span><span class="meta">${it.kind} · Qty ${it.qty}</span></span><span class="amt">${amt}</span></li>`;
  }).join('');
  subEl.innerHTML = anyUnpriced && sub === 0
    ? 'On request'
    : `${fmt(sub)}&nbsp;<span class="cur">&#8362;</span>`;
}

function subtotalValue(): number | null {
  const priced = items.filter((i) => typeof i.price === 'number');
  if (!priced.length) return null;
  return priced.reduce((s, i) => s + (i.price as number) * i.qty, 0);
}

renderSummary();

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const consent = (document.getElementById('co-consent') as HTMLInputElement | null)?.checked;
  if (!form.checkValidity() || !consent || !items.length) {
    err?.classList.add('show');
    const bad = form.querySelector(':invalid') as HTMLElement | null;
    bad?.focus();
    return;
  }
  err?.classList.remove('show');
  const val = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value.trim() || '';

  const payload = {
    customer: {
      name: val('co-name'), phone: val('co-phone'), email: val('co-email'),
      city: val('co-city'), address: val('co-addr'), notes: val('co-notes'),
    },
    items: items.map((i) => ({ name: i.name, kind: i.kind, qty: i.qty, price: i.price })),
    subtotal: subtotalValue(),
    updates: (document.getElementById('co-updates') as HTMLInputElement | null)?.checked || false,
  };

  if (placeBtn) { placeBtn.disabled = true; placeBtn.style.opacity = '0.6'; }
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error('submit failed');
    localStorage.removeItem(KEY); // clear cart on success
    window.location.href = '/order-received';
  } catch {
    err?.classList.add('show');
    if (placeBtn) { placeBtn.disabled = false; placeBtn.style.opacity = ''; }
  }
});

export {};
