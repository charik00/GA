import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Static site + one serverless function (/api/order, prerender:false) that
// forwards orders to Web3Forms (email) and Telegram. All other pages are
// prerendered to static HTML.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://geneticanalyze.com',
  // i18n scaffold — EN now, RU/HE added later by dropping in dictionaries + routes.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
});
