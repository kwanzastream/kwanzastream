"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Monitor, Music, Settings, Loader2, Lock } from "lucide-react"
import Link from "next/link"

const METHODS = [
  {
    id: "mobile", icon: Smartphone, title: "Telemóvel",
    desc: "Transmite com a câmara do teu telemóvel", badge: "Recomendado",
    href: "/go-live/mobile", primary: true,
  },
  {
    id: "desktop", icon: Monitor, title: "Browser",
    desc: "Transmite do computador sem instalar nada",
    href: "/go-live/desktop", primary: false,
  },
  {
    id: "audio", icon: Music, title: "Áudio apenas",
    desc: "Perfeito para rádio, música e podcasts",
    href: "/go-live/audio-only", primary: false,
  },
]

export default function GoLiveHubPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/entrar?redirectTo=/go-live")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-black">Começa a transmitir</h1>
          <p className="text-sm text-muted-foreground mt-1">Escolhe como queres ir ao vivo</p>
        </div>

        <div className="space-y-3">
          {METHODS.map((m) => (
            <Link key={m.id} href={m.href}>
              <div className={`rounded-xl border p-5 flex items-center gap-4 transition-all cursor-pointer mb-3 ${
                m.primary
                  ? "border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary"
                  : "border-white/10 hover:border-white/30 hover:bg-white/5"
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  m.primary ? "bg-primary/20 text-primary" : "bg-white/10"
                }`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{m.title}</h3>
                    {m.badge && <Badge className="bg-primary/20 text-primary border-none text-[9px]">{m.badge}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/dashboard/stream-config" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
            <Settings className="w-3 h-3" /> Usar OBS / software externo
          </Link>
        </div>
      </div>
    </div>
  )
}
