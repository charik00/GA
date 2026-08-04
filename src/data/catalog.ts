/* ============================================================================
 * Single source of truth for products, kits and articles.
 * Pages and the landing render from here, edit once, it updates everywhere.
 *
 * Prices are intentionally empty: the client confirms pricing. The cart and
 * checkout treat an empty price as "price on request". (HANDOFF: prices are an
 * intentional placeholder.)
 * Image paths are root-relative (served from /public).
 * ========================================================================== */

export interface Product {
  sku: string;
  /** stable slug used for image filenames, cart ids and anchors */
  slug: string;
  name: string;
  subtitle: string;
  slogan: string;
  /** product photo (transparent PNG on the catalog) */
  img: string;
  /** accent color for the colored top edge / category bar */
  color: string;
  /** ILS price, null until the client confirms */
  price: number | null;
}

export interface Kit {
  slug: string;
  name: string;
  slogan: string;
  /** SKUs/names of the formulas inside */
  includes: string[];
  /** accent color for the colored top edge */
  color: string;
  /** background image behind the kit */
  bg: string;
  price: number | null;
}

export interface Article {
  slug: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  time: string;
  cover: string;
  href: string;
}

export const products: Product[] = [
  { sku: 'GA·01', slug: 'hepadetox',        name: 'HEPADETOX',        subtitle: 'Detox Fication',     slogan: 'The liver filters. Breaks down. Protects. When it works, the whole body works better.',          img: 'images/products/hepadetox.png',        color: '#00A850', price: null },
  { sku: 'GA·02', slug: 'nephroxil',        name: 'NEPHROXIL',        subtitle: 'Assence Life',       slogan: 'The kidneys regulate pressure, eliminate toxins, influence aging. Nephroxil, support from within.', img: 'images/products/nephroxil.png',        color: '#5E86B4', price: null },
  { sku: 'GA·03', slug: 'hemovitalis',      name: 'HEMOVITALIS',      subtitle: 'Revitalizing Flow',  slogan: 'Blood nourishes every cell. Energy, mood, sleep, it all starts here.',                            img: 'images/products/hemovitalis.png',      color: '#F47D76', price: null },
  { sku: 'GA·04', slug: 'gastirix',         name: 'GASTIRIX',         subtitle: 'Basic Foundation',   slogan: 'Almost all chronic conditions begin in the gut. Start with the foundation.',                      img: 'images/products/gastirix.png',         color: '#FFF200', price: null },
  { sku: 'GA·05', slug: 'cardilex',         name: 'CARDILEX',         subtitle: 'Peaceful Soul',      slogan: 'The heart never stops. Support it.',                                                              img: 'images/products/cardilex.png',         color: '#EF483F', price: null },
  { sku: 'GA·06', slug: 'drainalene',       name: 'DRAINALENE',       subtitle: 'Drying Damp',        slogan: 'Chronic mucus. Edema. Recurring symptoms. One cause, one formula.',                               img: 'images/products/drainalene.png',       color: '#5BB7D3', price: null },
  { sku: 'GA·07', slug: 'pro-bio-tech',     name: 'PRO BIO TECH',     subtitle: 'Digestive bacteria', slogan: 'Not just a probiotic. A formula that works.',                                                     img: 'images/products/pro-bio-tech.png',     color: '#FFFFFF', price: null },
  { sku: 'GA·08', slug: 'bioactive-elixir', name: 'BIOACTIVE ELIXIR', subtitle: 'Essential Elements', slogan: 'Minerals from nature, not from a laboratory. The difference is felt.',                            img: 'images/products/bioactive-elixir.png', color: '#00AEEF', price: null },
  { sku: 'GA·09', slug: 'xl-man-pro',       name: 'XL MAN PRO',       subtitle: 'Life Assence',       slogan: 'Energy. Libido. Endurance. It all starts with balance.',                                          img: 'images/products/xl-man-pro.png',       color: '#007FB4', price: null },
  { sku: 'GA·10', slug: 'stomavil',         name: 'STOMAVIL',         subtitle: 'Basic Harmony',      slogan: 'Heartburn. Nausea. Bloating. Fast and gentle relief.',                                            img: 'images/products/stomavil.png',         color: '#F58354', price: null },
  { sku: 'GA·11', slug: 'sucreol',          name: 'SUCREOL',          subtitle: 'Balance Return',     slogan: 'Unstable blood sugar shows up in everything. Sucreol works on the cause.',                        img: 'images/products/sucreol.png',          color: '#8DC63F', price: null },
  { sku: 'GA·12', slug: 'vaiotec',          name: 'VAÏOTEC',          subtitle: 'Cool Down',          slogan: "Inflammation is the body's response. Support its ability to manage it.",                          img: 'images/products/vaiotec.png',          color: '#CF915D', price: null },
];

export const kits: Kit[] = [
  { slug: 'vital-man',     name: 'ALPHA VITALITY KIT',           slogan: 'Male strength. It starts from within.',          includes: ['Nephroxil', 'XL Man Pro', 'Hemovitalis', 'Bioactive Elixir'], color: '#1381BC', bg: 'images/kits/bg_sage.png',           price: 990 },
  { slug: 'digestive-reset', name: 'GUT RESTORATION SYSTEM',      slogan: 'A healthy gut is the foundation of everything.', includes: ['Gastirix', 'Hepadetox', 'Pro Bio Tech', 'Bioactive Elixir'],   color: '#7DC242', bg: 'images/kits/bg_rosemary.png',       price: 890 },
  { slug: 'female-blood',  name: 'FEMALE VITAL ESSENCE KIT',     slogan: 'Female vitality. Renewed from within.',          includes: ['Hemovitalis', 'Gastirix', 'Hepadetox', 'Bioactive Elixir'],    color: '#F5A6A2', bg: 'images/kits/bg_hibiscus.png',       price: 890 },
  { slug: 'calm-heart',    name: 'INNER HARMONY KIT',            slogan: 'A quiet heart is a strong heart.',               includes: ['Cardilex', 'Hemovitalis', 'Drainalene', 'Bioactive Elixir'],   color: '#F13F3D', bg: 'images/kits/bg_lavender.png',       price: 890 },
  { slug: 'men-hair',      name: 'HAIR REGENERATION SYSTEM',     slogan: 'Real growth starts beneath the surface.',        includes: ['Hemovitalis', 'XL Man Pro', 'Nephroxil', 'Bioactive Elixir'],  color: '#5AB6CF', bg: 'images/kits/bg_rosemary_citrus.png', price: 890 },
  { slug: 'aesthetic',     name: 'AESTHETIC REGENERATION SYSTEM', slogan: 'Beauty is a biological process.',               includes: ['Hepadetox', 'Hemovitalis', 'Pro Bio Tech', 'Bioactive Elixir'], color: '#C9A96E', bg: 'images/kits/bg_chamomile.png',      price: 890 },
];

export const articles: Article[] = [
  {
    slug: 'not-what-we-thought-part-1',
    eyebrow: '— 01 / FOUNDATIONS',
    title: 'Medicine & Supplements: What We May Have Overlooked · Part I',
    excerpt: 'Why improving a laboratory value is not always the same as improving health.',
    time: '10 MIN READ',
    cover: 'uploads/GAarticles/GA_article_cover_part1.jpg',
    href: '/articles/not-what-we-thought-part-1',
  },
  {
    slug: 'not-what-we-thought-part-2',
    eyebrow: '— 02 / FOUNDATIONS',
    title: 'Medicine & Supplements: What We May Have Overlooked · Part II',
    excerpt: 'What traditional botanical medicine understood long before modern laboratories.',
    time: '10 MIN READ',
    cover: 'uploads/GAarticles/GA_article_cover_part2.jpg',
    href: '/articles/not-what-we-thought-part-2',
  },
];

/** Format an ILS amount, or a fallback when price is not yet set. */
export function formatPrice(price: number | null, fallback = ''): string {
  if (price == null) return fallback;
  return price.toLocaleString('en-US') + ' ₪';
}
