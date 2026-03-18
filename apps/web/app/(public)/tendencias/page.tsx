"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowUp, ArrowDown, Minus, Eye, Users, Flame } from "lucide-react"
import { PeriodSelector } from "@/components/public/content-filters"
import { StreamCard, ClipCard, ContentGrid, SectionHeader, EmptyContent } from "@/components/public/content-card"

const PERIODS = [
  { value: "now", label: "Agora" },
  { value: "today", label: "Hoje" },
  { value: "week", label: "Esta semana" },
  { value: "month", label: "Este mês" },
]

const TREND_TYPES = [
  { value: "all", label: "Tudo", href: "/tendencias" },
  { value: "clips", label: "Clips", href: "/tendencias/clips" },
  { value: "shorts", label: "Shorts", href: "/tendencias/shorts" },
  { value: "streams", label: "Streams", href: "/tendencias/streams" },
  { value: "canais", label: "Canais", href: "/tendencias/canais" },
  { value: "categorias", label: "Categorias", href: "/tendencias/categorias" },
  { value: "angola", label: "🇦🇴 Angola", href: "/tendencias/angola" },
]

const MOCK_TRENDING_CLIPS = Array.from({ length: 6 }, (_, i) => ({
  id: `trending-clip-${i}`, title: `Clip viral #${i + 1} — Momento incrível`, thumbnailUrl: undefined,
  duration: `0:${String(Math.floor(Math.random() * 50) + 10).padStart(2, "0")}`,
  views: Math.floor(Math.random() * 50000) + 5000,
  streamer: { username: `creator${i}`, displayName: `Criador ${i + 1}` },
  change: Math.floor(Math.random() * 200) - 50,
}))

const MOCK_TRENDING_CHANNELS = Array.from({ length: 8 }, (_, i) => ({
  rank: i + 1, username: `creator${i}`, displayName: `Creator ${i + 1}`,
  followers: Math.floor(Math.random() * 5000) + 500,
  change: Math.floor(Math.random() * 100) - 20,
  category: ["Gaming", "Música", "Futebol", "IRL", "Just Talking", "Kuduro", "Tech", "Comédia"][i],
}))

export default function TendenciasPage() {
  const [period, setPeriod] = useState("today")

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Tendências</h1>
        </div>
        <p className="text-sm text-muted-foreground">O que está em alta no Kwanza Stream</p>
      </div>

      {/* Sub-navigation */}
      <div className="scroll-tabs gap-2 mb-4">
        {TREND_TYPES.map((t) => (
          <Link key={t.value} href={t.href} className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${t.value === "all" ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`}>
            {t.label}
          </Link>
        ))}
      </div>

      {/* Period */}
      <div className="mb-8">
        <PeriodSelector periods={PERIODS} activePeriod={period} onPeriodChange={setPeriod} />
      </div>

      <div className="space-y-12">
        {/* Trending Clips */}
        <section>
          <SectionHeader title="Clips Virais 🔥" href="/tendencias/clips" />
          <ContentGrid cols={3}>
            {MOCK_TRENDING_CLIPS.map((clip) => (
              <ClipCard key={clip.id} {...clip} />
            ))}
          </ContentGrid>
        </section>

        {/* Trending Channels */}
        <section>
          <SectionHeader title="Canais em Crescimento 📈" href="/tendencias/canais" />
          <div className="space-y-2">
            {MOCK_TRENDING_CHANNELS.map((channel) => (
              <Link key={channel.username} href={`/${channel.username}`} className="block group">
                <div className="flex items-center gap-4 p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-card">
                  <span className="text-lg font-bold text-muted-foreground w-8 text-center">#{channel.rank}</span>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {channel.displayName.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{channel.displayName}</p>
                    <p className="text-xs text-muted-foreground">@{channel.username} · {channel.category}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs shrink-0">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>{channel.followers > 999 ? `${(channel.followers / 1000).toFixed(1)}k` : channel.followers}</span>
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs shrink-0 ${channel.change > 0 ? "text-[var(--success)]" : channel.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {channel.change > 0 ? <ArrowUp className="w-3 h-3" /> : channel.change < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {Math.abs(channel.change)}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Angola Trending CTA */}
        <section>
          <Link href="/tendencias/angola" className="block">
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-[#CE1126]/10 via-transparent to-[#F9D616]/10 p-6 md:p-8 text-center hover:border-primary/40 transition-all">
              <h2 className="text-xl font-bold mb-2">Trending Angola 🇦🇴</h2>
              <p className="text-sm text-muted-foreground mb-4">O que está em alta só em conteúdo angolano — criadores verificados, PT-AO, tag Angola</p>
              <Button variant="outline" className="gap-2"><Flame className="w-4 h-4" />Ver tendências Angola</Button>
            </div>
          </Link>
        </section>
      </div>
    </div>
  )
}
