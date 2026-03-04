'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Import locale files
import ptAO from '@/locales/pt-AO.json'
import en from '@/locales/en.json'

export type Locale = 'pt-AO' | 'en'

const translations: Record<Locale, Record<string, any>> = {
    'pt-AO': ptAO,
    'en': en,
}

export const LOCALE_NAMES: Record<Locale, string> = {
    'pt-AO': 'Português (Angola)',
    'en': 'English',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
    'pt-AO': '🇦🇴',
    'en': '🇬🇧',
}

interface I18nContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType>({
    locale: 'pt-AO',
    setLocale: () => { },
    t: (key) => key,
})

/** Resolve dot-notation key from nested JSON: t("auth.login") → "Entrar" */
function resolveKey(obj: Record<string, any>, key: string): string | undefined {
    const parts = key.split('.')
    let current: any = obj
    for (const part of parts) {
        if (current === undefined || current === null) return undefined
        current = current[part]
    }
    return typeof current === 'string' ? current : undefined
}

/** Replace {{param}} placeholders: t("stream.viewerCount", { count: 42 }) → "42 a assistir" */
function interpolate(template: string, params?: Record<string, string | number>): string {
    if (!params) return template
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? `{{${key}}}`))
}

const STORAGE_KEY = 'kwanza_locale'

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('pt-AO')

    // Load saved locale on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
        if (saved && translations[saved]) {
            setLocaleState(saved)
        }
    }, [])

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale)
        localStorage.setItem(STORAGE_KEY, newLocale)
        // Update HTML lang attribute for SEO
        document.documentElement.lang = newLocale === 'pt-AO' ? 'pt' : newLocale
    }, [])

    const t = useCallback((key: string, params?: Record<string, string | number>): string => {
        // Try current locale first, fall back to pt-AO, then to key itself
        const value = resolveKey(translations[locale], key)
            ?? resolveKey(translations['pt-AO'], key)
            ?? key
        return interpolate(value, params)
    }, [locale])

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    )
}

/** Hook to access translations and locale switching */
export function useTranslation() {
    return useContext(I18nContext)
}

export default I18nContext
