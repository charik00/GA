import { en, type I18nKey } from './en';

export type Locale = 'en'; // add 'ru' | 'he' here when those dictionaries land

const dictionaries: Record<Locale, Record<string, string>> = {
  en,
};

/** Languages shown in the switcher. `enabled:false` renders the button but
 *  keeps it inert until the locale is built (HANDOFF: switcher ready, RU later). */
export const languages: { code: string; label: string; enabled: boolean }[] = [
  { code: 'en', label: 'EN', enabled: true },
  { code: 'ru', label: 'RU', enabled: false },
  // Hebrew (HE) temporarily removed from the switcher; re-add when the locale lands.
];

export const defaultLocale: Locale = 'en';

/** Returns a translator bound to a locale. Falls back to EN, then to the key. */
export function useTranslations(locale: Locale = defaultLocale) {
  const dict = dictionaries[locale] ?? en;
  return function t(key: I18nKey): string {
    return dict[key] ?? en[key] ?? key;
  };
}
