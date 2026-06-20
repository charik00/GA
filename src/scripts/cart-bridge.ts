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

  // Kits: some names are "... System" without the word "kit", so also treat any
  // add from /kits as a kit. Kits have no single product photo, the kit visual on
  // /kits is the wooden gift box, so use it as the cart thumbnail for all kits.
  const isKit = /\bkit\b/i.test(name) || location.pathname.startsWith('/kits');
  const imgEl =
    (box.querySelector('#qv-photo') as HTMLImageElement | null) ||
    (box.querySelector('img') as HTMLImageElement | null);
  const img = isKit ? 'images/kits-wooden-box.jpg' : relImg(imgEl?.src);

  window.GACart.add({
    id: slugify(name),
    name: titleCase(name),
    kind: isKit ? 'Kit' : 'Formula',
    price,
    qty: 1,
    img,
  });
});

// Deep-link: /products?item=<NAME> auto-opens that formula's quick-view.
(function openFromQuery() {
  const item = new URLSearchParams(location.search).get('item');
  if (!item) return;
  const raw = decodeURIComponent(item).trim();
  const target = raw.toUpperCase();
  const targetLower = raw.toLowerCase();
  const open = () => {
    // formula quick-view (Products): match by name
    const formula = Array.from(document.querySelectorAll<HTMLElement>('.cat-c[data-name]')).find(
      (c) => (c.getAttribute('data-name') || '').trim().toUpperCase() === target
    );
    if (formula) { formula.click(); return true; }
    // kit quick-view (Kits): match by slug (data-kit)
    const kit = Array.from(document.querySelectorAll<HTMLElement>('.kit-card[data-kit]')).find(
      (c) => (c.getAttribute('data-kit') || '').trim().toLowerCase() === targetLower
    );
    if (kit) { kit.click(); return true; }
    return false;
  };
  // the inline quick-view script binds card listeners during parse; retry briefly
  if (!open()) {
    let tries = 0;
    const iv = setInterval(() => { if (open() || ++tries > 20) clearInterval(iv); }, 60);
  }
})();

export {};
