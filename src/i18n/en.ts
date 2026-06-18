/* English dictionary. To add Russian later: copy this file to `ru.ts`, translate
 * the values, register it in `index.ts`, and add an `ru` locale + routes.
 * The markup never changes, only these strings. (HANDOFF Step 4.) */
export const en = {
  'nav.home': 'Home',
  'nav.philosophy': 'Philosophy',
  'nav.products': 'Products',
  'nav.kits': 'Kits',
  'nav.articles': 'Articles',
  'nav.contact': 'Contact',
  'nav.shop': 'Shop Now',
  'nav.about': 'About',

  'hero.eyebrow': 'Whole-plant formulas',
  'hero.title.a': 'Nature created the formula.',
  'hero.title.b': 'We preserved it.',
  'hero.sub': 'Not isolated molecules. Whole formulas. The way nature intended.',
  'hero.cta1': 'Explore Products',
  'hero.cta2': 'Our Philosophy',
  'hero.trust.1': '50+ Years Clinical Practice',
  'hero.trust.2': '5,000 Years Chinese Pharmacology',
  'hero.trust.3': 'Kosher',
  'hero.trust.4': 'GMP Certified',

  'trust.t1': 'Over 50 years of clinical practice in holistic medicine',
  'trust.t2': '5,000 years of Chinese clinical pharmacology at the core of every formula',
  'trust.t3': 'Kosher Certified',
  'trust.t4': 'GMP Manufacturing Standards',

  'forwhom.num': '— 01 / For those who ask why',
  'forwhom.title.a': 'For those tired of',
  'forwhom.title.b': 'temporary solutions',
  'forwhom.body1':
    'You took supplements for months and felt no difference. Ran tests, got the same answers. Our formulas are built for those who want to work on the cause, not silence the symptoms.',

  'phil.num': '— 02 / The Philosophy',
  'phil.title.a': 'Why most supplements',
  'phil.title.b': "don't work",
  'phil.c1.n': '01 / Origin',
  'phil.c1.t': 'Synthetic is not the same as natural.',
  'phil.c1.b':
    'Cyanocobalamin accumulates in the blood, creating the illusion of normal levels. The deficiency remains.',
  'phil.c2.n': '02 / System',
  'phil.c2.t': 'The body works with complexes.',
  'phil.c2.b': 'Isolated molecules do not exist in nature. Our formulas are built the same way.',
  'phil.c3.n': '03 / Cause',
  'phil.c3.t': 'Deficiency is a consequence.',
  'phil.c3.b':
    'The cause is almost always in the digestive system. We work with it, not with a number on a lab report.',
  'phil.full': 'Read the full philosophy',

  'cat.num': '— 03 / The Collection',
  'cat.title.a': 'Our',
  'cat.title.b': 'Formulas.',
  'cat.all': 'Explore All Products',
  'cat.learn': 'Learn More',

  'ba.before': '— Before',
  'ba.after': 'After —',
  'ba.before.line': 'Fatigue. Heaviness. Inflammation. Brain fog.',
  'ba.after.line': 'Energy. Lightness. Balance. Clarity.',

  'kits.num': '— 04 / Curated Protocols',
  'kits.title.a': 'A comprehensive approach,',
  'kits.title.b': 'a comprehensive result.',
  'kits.sub':
    'When one formula is not enough. Kits are assembled so that each product amplifies the next.',
  'kits.all': 'Explore Kits',

  'art.num': '— 06 / Articles',
  'art.title.a': 'Know what',
  'art.title.b': 'you are taking.',
  'art.sub':
    "Why synthetics don't work. How a Chinese formula is built. What is behind your symptoms.",
  'art.read': 'Read article',

  'cta.num': '— 07 / Begin',
  'cta.title.a': 'Ready to',
  'cta.title.b': 'start?',
  'cta.sub': 'Find your formula or reach out to us.',
  'cta.b1': 'Explore Products',
  'cta.b2': 'Contact Us',

  'footer.est': 'Est. 1973',
  'footer.disclaimer':
    'These statements have not been evaluated by any regulatory authority. Our formulas are intended to support, not diagnose, treat, cure or prevent any condition. Consult a qualified practitioner.',
  'footer.shop': 'Shop',
  'footer.shop.1': 'All Formulas',
  'footer.shop.2': 'Kits & Protocols',
  'footer.about': 'Company',
  'footer.about.1': 'Philosophy',
  'footer.about.3': 'Articles',
  'footer.faq': 'FAQ',
  'footer.contact': 'Contact',
  'footer.copyright': '© 2026 Genetic Analyze · Israel',
  'footer.copyright.tag': 'Crafted patiently',
  'footer.priv': 'Privacy Policy',
  'footer.terms': 'Terms',
  'footer.cookie': 'Cookie Settings',

  'cart.title': 'Your cart',
  'cart.empty': 'Your cart is empty',
  'cart.browse': 'Browse formulas',
  'cart.subtotal': 'Subtotal',
  'cart.ship': 'Shipping calculated by manager.',
  'cart.checkout': 'Checkout',
  'cart.each': 'each',
  'cart.request': 'Price on request',

  'cookie.text':
    'We use cookies to run this site, remember your preferences, and improve your experience. You can accept all or choose only necessary cookies.',
  'cookie.accept': 'Accept all',
  'cookie.necessary': 'Necessary only',
  'cookie.settings': 'Settings',
  'cookie.save': 'Save choices',
} as const;

export type I18nKey = keyof typeof en;
