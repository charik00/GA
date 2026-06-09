# Genetic Analyze — website (EN)

Static marketing + ordering site for Dr. Oren Kaholi's whole-plant formulas.
Built from the Claude Design HTML exports, componentized for maintainability.

## Stack

- **Astro + TypeScript**, static output, deploy to Vercel.
- Shared chrome lives in **one place** as `.astro` components — edit once, every page updates.
- One serverless function (`/api/order`, added in Step 3) forwards orders to Web3Forms
  (email to `ok@drkaholi.com`) **and** Telegram. No online payment. Secrets in env vars.

## Layout of the code

```
src/
  layouts/Layout.astro      page shell: <head>, fonts, Header, Footer, CookieConsent, MobileNav, CartDrawer
  components/                Header, Footer, CookieConsent, MobileNav, CartDrawer
  data/catalog.ts            single source of truth: products (12), kits (6), articles
  i18n/                      en.ts dictionary + useTranslations(); ready for ru.ts (Step 4)
  styles/
    base.css                 base visual system (dark) — carved from the original styles-v4.css
    landing.css              landing "light mix" theme (per-page, imported by index.astro)
    shell.css                shared chrome: mega-menu, cookie, mobile tab bar, cart drawer + global tokens
  pages/index.astro          landing
public/                      images/, uploads/, logo, hero — root-relative assets
```

### CSS cascade note (important)
In this project's bundle `base.css` lands **last**, so overrides win only by higher
specificity, not import order. Shared chrome-light rules in `shell.css` are prefixed
with `html ` to out-specify `base.css`. The landing forces its dark graphite header
with `!important` (that dark header is intentional, per the V10 design).

## Brand
Palette and fonts come from the approved V10 design (Cormorant + Montserrat).
Marketing surfaces use honey `#C9A96E`; commerce surfaces (cookie, cart, checkout,
legal) use amber `#C8862F` — both kept as tokens (`--v7-honey`, `--v7-amber`).
Note: this matches the HANDOFF brand spec closely; the HANDOFF listed the amber as
the single accent, the design actually uses two accent shades by context.

## TODO — needed from client (do not invent)
- Legal copy for Privacy Policy and Terms (currently placeholder).
- `WEB3FORMS_ACCESS_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (see `.env.example`).
- Shipping rates/zones (handled manually by the manager for now).
- Confirm prices. Placeholders right now: every product shows 250 ₪ and every kit
  890 ₪ (hardcoded in the quick-view panels). Once confirmed, set real prices in
  `src/data/catalog.ts` and in the `.pp-price` of the product/kit panels; the cart
  reads the panel price.
- Confirm footer phone (`+972-52-888-3322`) and address; the bottle photos carry
  real Hebrew label text, replace only if client sends Latin PNGs.
- Article "Part 2" body: both article URLs currently render the one designed body.

## Finalization audit (done)
- Em-dash sweep: 11 prose em-dashes replaced with commas across content; decorative
  eyebrows ("— 01 /") and "Before —/After —" labels left as design elements.
- Asset audit: all 71 referenced images exist in `public/`, nothing missing.
- Placeholder audit: only intentional placeholders remain (legal text marked
  "[Placeholder text…]", prices, RU/HE "coming soon" lang buttons).

## Dev
```
npm install
npm run dev        # http://localhost:4321
npm run build
```
