import { derived, writable } from 'svelte/store'
import shell from './messages/shell'
import domain from './messages/domain'
import components from './messages/components'
import overviewAppointment from './messages/overview-appointment'
import detailForms from './messages/detail-forms'

export type Locale = 'sk' | 'en' | 'de'
export const languages: { code: Locale; name: string }[] = [
  { code: 'sk', name: 'Slovenčina' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
]
export const localeStorageKey = 'pokojne-language'

function isLocale(value: string | null): value is Locale {
  return languages.some((language) => language.code === value)
}

function savedLocale(): Locale {
  try {
    const saved = localStorage.getItem(localeStorageKey)
    return isLocale(saved) ? saved : 'sk'
  } catch {
    return 'sk'
  }
}

export const locale = writable<Locale>(savedLocale())
export function setLocale(value: string) {
  if (isLocale(value)) locale.set(value)
}

locale.subscribe((language) => {
  if (typeof document !== 'undefined') document.documentElement.lang = language
  try {
    localStorage.setItem(localeStorageKey, language)
  } catch {
    // Language switching also works when browser storage is unavailable.
  }
})

// The existing Slovak copy is the fallback and the key, including known API copy.
// Patient-entered text is rendered directly and never passed to the translator.
const messages = new Map(
  Object.entries({ ...shell, ...domain, ...components, ...overviewAppointment, ...detailForms }),
)
export const t = derived(locale, (language) => {
  return (source: string, values: Record<string, string | number> = {}): string => {
    const translated = language === 'sk' ? source : (messages.get(source)?.[language] ?? source)
    return translated.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
      Object.hasOwn(values, name) ? String(values[name]) : placeholder,
    )
  }
})
