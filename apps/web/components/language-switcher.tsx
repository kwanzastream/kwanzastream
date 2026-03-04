'use client'

import { useTranslation, LOCALE_NAMES, LOCALE_FLAGS, type Locale } from '@/lib/i18n'
import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'

const locales: Locale[] = ['pt-AO', 'en']

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
    const { locale, setLocale } = useTranslation()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
                title="Mudar idioma / Change language"
            >
                <Globe className="w-4 h-4 text-muted-foreground" />
                {!compact && (
                    <>
                        <span className="text-sm">{LOCALE_FLAGS[locale]}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                            {locale === 'pt-AO' ? 'PT' : 'EN'}
                        </span>
                    </>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 w-48 py-1 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {locales.map(l => (
                        <button
                            key={l}
                            onClick={() => { setLocale(l); setOpen(false) }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${locale === l ? 'text-primary font-bold' : 'text-muted-foreground'
                                }`}
                        >
                            <span className="text-base">{LOCALE_FLAGS[l]}</span>
                            <span>{LOCALE_NAMES[l]}</span>
                            {locale === l && <span className="ml-auto text-primary text-xs">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
