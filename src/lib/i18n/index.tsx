'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import fr from './translations/fr.json'
import en from './translations/en.json'
import de from './translations/de.json'
import es from './translations/es.json'
import it from './translations/it.json'
import pt from './translations/pt.json'
import nl from './translations/nl.json'
import pl from './translations/pl.json'

export type Locale = 'fr' | 'en' | 'de' | 'es' | 'it' | 'pt' | 'nl' | 'pl'

type TranslationValue = string | Record<string, unknown>
type Translations = typeof fr

const translations: Record<Locale, Translations> = {
  fr,
  en,
  de,
  es,
  it,
  pt,
  nl,
  pl,
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved preference
    const saved = localStorage.getItem('locale') as Locale | null
    const validLocales: Locale[] = ['fr', 'en', 'de', 'es', 'it', 'pt', 'nl', 'pl']
    if (saved && validLocales.includes(saved)) {
      setLocaleState(saved)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Locale
      if (validLocales.includes(browserLang)) {
        setLocaleState(browserLang)
      }
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
  }, [])

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: TranslationValue = translations[locale]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, TranslationValue>)[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`)
      return key
    }

    // Replace parameters {param}
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return params[paramKey]?.toString() || `{${paramKey}}`
      })
    }

    return value
  }, [locale])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'fr', setLocale, t }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useLocale() {
  const { locale, setLocale } = useI18n()
  return { locale, setLocale }
}

export function useTranslation() {
  const { t } = useI18n()
  return { t }
}
