import en from './locales/en/translations.json'
import ar from './locales/ar/translations.json'

const translations = {
  en,
  ar,
} as const

export type Locale = keyof typeof translations
export type TranslationKey = keyof (typeof translations)['ar']

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.ar
}

export function t(locale: Locale, key: TranslationKey): string {
  return getTranslations(locale)[key] || key
}

export function getTranslator(locale: Locale) {
  return {
    t: (key: TranslationKey) => t(locale, key),
    locale,
  }
}
