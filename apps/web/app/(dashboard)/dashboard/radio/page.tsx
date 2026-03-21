"use client"

import { useState, useEffect } from "react"
import { Loader2, Radio, Settings2, Image, Calendar, BarChart2, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioStatusCard } from "@/components/dashboard/radio/radio-status-card"
import Link from "next/link"
import api from "@/lib/api"

export default function RadioHubPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/radio")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  const isNew = data?.isNew
  const config = data?.config
  const stats = data?.stats || { transmissions: 0, totalMinutes: 0, uniqueListeners: 0, salosReceived: 0 }

  if (isNew) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/5 to-purple-500/5 text-center space-y-4">
          <Radio className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-xl font-bold">Modo Rádio — Novo para ti?</h2>
          <p className="text-sm text-muted-foreground">Transmite só com áudio — 10× menos dados. Perfeito para DJs, músicos e podcasters.</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm">Saber mais</Button>
            <Link href="/dashboard/radio/configurar">
              <Button size="sm" className="gap-1.5"><Settings2 className="w-3.5 h-3.5" />Configurar e começar</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Modo Rádio</h1>
        <p className="text-sm text-muted-foreground mt-1">Gestão do teu canal de áudio.</p>
      </div>

      <RadioStatusCard isLive={false} stats={stats} />

      <Link href="/go-live/audio-only">
        <Button className="w-full gap-2 py-5 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
          <Radio className="w-4 h-4" />
          Iniciar Rádio
        </Button>
      </Link>

      {config && (
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <h3 className="text-sm font-semibold">Configuração actual</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <p>Nome: <span className="text-foreground">{config.programName || "—"}</span></p>
            <p>Género: <span className="text-foreground">{config.primaryGenre || "—"}</span></p>
            <p>Qualidade: <span className="text-foreground">{config.quality || 128}kbps</span></p>
            <p>Artwork: <span className="text-foreground">{config.artworkUrl ? "✅ Configurado" : "❌ Sem artwork"}</span></p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          { href: "/dashboard/radio/configurar", icon: Settings2, label: "Configurar" },
          { href: "/dashboard/radio/artwork", icon: Image, label: "Artwork" },
          { href: "/dashboard/radio/schedule", icon: Calendar, label: "Schedule" },
          { href: "/dashboard/radio/analytics", icon: BarChart2, label: "Analytics" },
          { href: "/dashboard/radio/stream-key", icon: Key, label: "Stream Key" },
        ].map(link => (
          <Link key={link.href} href={link.href}>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-colors cursor-pointer">
              <link.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{link.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
