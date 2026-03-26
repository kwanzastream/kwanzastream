"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"
import Link from "next/link"

const CONSENT_KEY = "kwanza-cookie-consent"

export function CookieConsent() {
    const pathname = usePathname()
    const [show, setShow] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY)
        if (!consent) {
            // Delay to avoid layout shift on initial load
            const timer = setTimeout(() => setShow(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    // Hide on standalone pages — must be AFTER all hooks
    if (pathname === '/em-breve') return null

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, "accepted")
        setShow(false)
    }

    const reject = () => {
        localStorage.setItem(CONSENT_KEY, "rejected")
        setShow(false)
    }

    if (!show) return null

    return (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl shrink-0">
                        <Cookie className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold">Cookies & Privacidade</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Usamos cookies essenciais para o funcionamento da plataforma e analytics anónimos
                            para melhorar a tua experiência.{" "}
                            <Link href="/legal/privacidade" className="text-primary hover:underline">
                                Política de Privacidade
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={accept} size="sm" className="flex-1 bg-primary text-xs font-bold h-9">
                        Aceitar
                    </Button>
                    <Button onClick={reject} size="sm" variant="outline" className="flex-1 border-white/10 bg-transparent text-xs font-bold h-9">
                        Apenas essenciais
                    </Button>
                </div>
            </div>
        </div>
    )
}
