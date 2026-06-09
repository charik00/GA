/* Wires the design's "Add to cart" buttons (.pp-btn, non-ghost) to the cart.
 * Reads the product/kit straight from the open quick-view panel or product
 * hero, so it works regardless of naming, then calls window.GACart.add().
 * Included on /products, /kits and product detail pages. */
declare global {
  interface Window {
    GACart?: {
      add(item: { id: string; name: string; kind: string; price: number | null; qty: number; img: string }): void;
      open(): void;
      count(): number;
    };
  }
}

function slugify(s: string): string {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function titleCase(s: string): string {
  return s.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
function relImg(src: string | undefined): string {
  if (!src) return '';
  try { return new URL(src, location.href).pathname.replace(/^\//, ''); } catch { return src; }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest('.pp-btn');
  if (!btn || btn.classList.contains('ghost')) return;
  const label = (btn.textContent || '').toLowerCase();
  if (!label.includes('add to cart')) return;

  const box =
    btn.closest('.qv-panel') ||
    btn.closest('section') ||
    document;

  const nameEl = box.querySelector('.pp-name');
  const name = nameEl?.textContent?.trim();
  if (!name || !window.GACart) return;

  const priceText = box.querySelector('.pp-price')?.textContent || '';
  const digits = priceText.replace(/[^\d]/g, '');
  const price = digits ? parseInt(digits, 10) : null;

  const isKit = /\bkit\b/i.test(name);
  const imgEl =
    (box.querySelector('#qv-photo') as HTMLImageElement | null) ||
    (box.querySelector('img') as HTMLImageElement | null);

  window.GACart.add({
    id: slugify(name),
    name: titleCase(name),
    kind: isKit ? 'Kit' : 'Formula',
    price,
    qty: 1,
    img: relImg(imgEl?.src),
  });
});

// Deep-link: /products?item=<NAME> auto-opens that formula's quick-view.
(function openFromQuery() {
  const item = new URLSearchParams(location.search).get('item');
  if (!item) return;
  const target = decodeURIComponent(item).trim().toUpperCase();
  const open = () => {
    const card = Array.from(document.querySelectorAll<HTMLElement>('.cat-c[data-name]')).find(
      (c) => (c.getAttribute('data-name') || '').trim().toUpperCase() === target
    );
    if (card) { card.click(); return true; }
    return false;
  };
  // the inline quick-view script binds card listeners during parse; retry briefly
  if (!open()) {
    let tries = 0;
    const iv = setInterval(() => { if (open() || ++tries > 20) clearInterval(iv); }, 60);
  }
})();

export {};
