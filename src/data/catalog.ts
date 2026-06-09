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
  { sku: 'GA·01', slug: 'hepadetox',        name: 'HEPADETOX',        subtitle: 'Detox Fication',     slogan: 'The liver filters. Breaks down. Protects. When it works, the whole body works better.',          img: 'images/products/hepadetox.png',        color: '#7DC242', price: null },
  { sku: 'GA·02', slug: 'nephroxil',        name: 'NEPHROXIL',        subtitle: 'Assence Life',       slogan: 'The kidneys regulate pressure, eliminate toxins, influence aging. Nephroxil, support from within.', img: 'images/products/nephroxil.png',        color: '#5AB6CF', price: null },
  { sku: 'GA·03', slug: 'hemovitalis',      name: 'HEMOVITALIS',      subtitle: 'Revitalizing Flow',  slogan: 'Blood nourishes every cell. Energy, mood, sleep, it all starts here.',                            img: 'images/products/hemovitalis.png',      color: '#F5A6A2', price: null },
  { sku: 'GA·04', slug: 'gastirix',         name: 'GASTIRIX',         subtitle: 'Basic Foundation',   slogan: 'Almost all chronic conditions begin in the gut. Start with the foundation.',                      img: 'images/products/gastirix.png',         color: '#FFF105', price: null },
  { sku: 'GA·05', slug: 'cardilex',         name: 'CARDILEX',         subtitle: 'Peaceful Soul',      slogan: 'The heart never stops. Support it.',                                                              img: 'images/products/cardilex.png',         color: '#F13F3D', price: null },
  { sku: 'GA·06', slug: 'drainalene',       name: 'DRAINALENE',       subtitle: 'Drying Damp',        slogan: 'Chronic mucus. Edema. Recurring symptoms. One cause, one formula.',                               img: 'images/products/drainalene.png',       color: '#5AB6CF', price: null },
  { sku: 'GA·07', slug: 'pro-bio-tech',     name: 'PRO BIO TECH',     subtitle: 'Digestive bacteria', slogan: 'Not just a probiotic. A formula that works.',                                                     img: 'images/products/pro-bio-tech.png',     color: '#DBDCDE', price: null },
  { sku: 'GA·08', slug: 'bioactive-elixir', name: 'BIOACTIVE ELIXIR', subtitle: 'Essential Elements', slogan: 'Minerals from nature, not from a laboratory. The difference is felt.',                            img: 'images/products/bioactive-elixir.png', color: '#00B2F3', price: null },
  { sku: 'GA·09', slug: 'xl-man-pro',       name: 'XL MAN PRO',       subtitle: 'Life Assence',       slogan: 'Energy. Libido. Endurance. It all starts with balance.',                                          img: 'images/products/xl-man-pro.png',       color: '#1381BC', price: null },
  { sku: 'GA·10', slug: 'stomavil',         name: 'STOMAVIL',         subtitle: 'Basic Harmony',      slogan: 'Heartburn. Nausea. Bloating. Fast and gentle relief.',                                            img: 'images/products/stomavil.png',         color: '#F5A65A', price: null },
  { sku: 'GA·11', slug: 'sucreol',          name: 'SUCREOL',          subtitle: 'Balance Return',     slogan: 'Unstable blood sugar shows up in everything. Sucreol works on the cause.',                        img: 'images/products/sucreol.png',          color: '#C9D94A', price: null },
  { sku: 'GA·12', slug: 'vaiotec',          name: 'VAÏOTEC',          subtitle: 'Cool Down',          slogan: "Inflammation is the body's response. Support its ability to manage it.",                          img: 'images/products/vaiotec.png',          color: '#F5A65A', price: null },
];

export const kits: Kit[] = [
  { slug: 'vital-man',     name: 'VITAL MAN PRO KIT',        slogan: 'Male strength. It starts from within.',          includes: ['XL MAN PRO', 'NEPHROXIL', 'HEMOVITALIS', 'BIOACTIVE ELIXIR'], color: '#1381BC', bg: 'images/kits/bg_sage.png',           price: null },
  { slug: 'digestive-reset', name: 'DIGESTIVE RESET KIT',    slogan: 'A healthy gut is the foundation of everything.', includes: ['GASTIRIX', 'STOMAVIL', 'PRO BIO TECH', 'HEPADETOX'],          color: '#7DC242', bg: 'images/kits/bg_rosemary.png',       price: null },
  { slug: 'female-blood',  name: 'FEMALE BLOOD BALANCE KIT', slogan: 'Female vitality. Blood, hormones, cycle.',       includes: ['HEMOVITALIS', 'NEPHROXIL', 'SUCREOL', 'BIOACTIVE ELIXIR'],     color: '#F5A6A2', bg: 'images/kits/bg_hibiscus.png',       price: null },
  { slug: 'calm-heart',    name: 'CALM & HEART KIT',         slogan: 'A quiet heart is a strong heart.',               includes: ['CARDILEX', 'HEMOVITALIS', 'VAÏOTEC', 'BIOACTIVE ELIXIR'],      color: '#F13F3D', bg: 'images/kits/bg_lavender.png',       price: null },
  { slug: 'men-hair',      name: 'MEN HAIR VITALITY KIT',    slogan: 'Real growth starts beneath the surface.',        includes: ['NEPHROXIL', 'HEMOVITALIS', 'XL MAN PRO', 'BIOACTIVE ELIXIR'], color: '#5AB6CF', bg: 'images/kits/bg_rosemary_citrus.png', price: null },
  { slug: 'aesthetic',     name: 'AESTHETIC RECOVERY KIT',   slogan: 'Beauty is a biological process.',                includes: ['HEPADETOX', 'DRAINALENE', 'VAÏOTEC', 'BIOACTIVE ELIXIR'],      color: '#C9A96E', bg: 'images/kits/bg_chamomile.png',      price: null },
];

export const articles: Article[] = [
  {
    slug: 'not-what-we-thought-part-1',
    eyebrow: '— 01 / FOUNDATIONS',
    title: 'Not What We Thought · Part 1',
    excerpt: 'Why modern pharmacology falls short with chronic conditions, and what is wrong with the logic',
    time: '10 MIN READ',
    cover: 'uploads/GAarticles/GA_article_cover_part1.jpg',
    href: '/articles/not-what-we-thought-part-1',
  },
  {
    slug: 'not-what-we-thought-part-2',
    eyebrow: '— 02 / FOUNDATIONS',
    title: 'Not What We Thought · Part 2',
    excerpt: 'Chinese pharmacology, 5,000 years of clinical experience and why it matters more than you think',
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
