"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowUp, Flame, Eye } from "lucide-react"
import Link from "next/link"
import { PeriodSelector } from "@/components/public/content-filters"
import { ClipCard, ContentGrid, SectionHeader } from "@/components/public/content-card"

const TREND_TYPES = [
  { value: "all", label: "Tudo", href: "/tendencias" },
  { value: "clips", label: "Clips", href: "/tendencias/clips" },
  { value: "shorts", label: "Shorts", href: "/tendencias/shorts" },
  { value: "streams", label: "Streams", href: "/tendencias/streams" },
  { value: "canais", label: "Canais", href: "/tendencias/canais" },
  { value: "categorias", label: "Categorias", href: "/tendencias/categorias" },
  { value: "angola", label: "🇦🇴 Angola", href: "/tendencias/angola" },
]

const ANGOLA_TRENDING = Array.from({ length: 12 }, (_, i) => ({
  rank: i + 1, title: `Conteúdo Angola #${i + 1}`, type: ["Clip", "Short", "Stream", "Canal"][i % 4],
  creator: `CriadorAO${i + 1}`, category: ["Kuduro", "Girabola", "Semba", "Just Talking AO", "IRL Luanda", "Gaming AO"][i % 6],
  views: Math.floor(Math.random() * 50000) + 1000, change: Math.floor(Math.random() * 300) + 10,
}))

export default function TrendingAngolaPage() {
  const [period, setPeriod] = useState("today")

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/tendencias" className="hover:text-foreground">Tendências</Link>
          <span>/</span><span className="text-foreground">Angola</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold">Trending Angola 🇦🇴</h1>
          <Badge className="bg-[#F9D616] text-black text-[10px] font-bold">EXCLUSIVO</Badge>
        </div>
        <p className="text-sm text-muted-foreground">O que está em alta só em conteúdo angolano — criadores verificados, PT-AO, tag Angola</p>
      </div>

      <div className="scroll-tabs gap-2 mb-4">
        {TREND_TYPES.map((t) => (
          <Link key={t.value} href={t.href} className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${t.value === "angola" ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`}>
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mb-6">
        <PeriodSelector
          periods={[{ value: "now", label: "Agora" }, { value: "today", label: "Hoje" }, { value: "week", label: "Esta semana" }, { value: "month", label: "Este mês" }]}
          activePeriod={period}
          onPeriodChange={setPeriod}
        />
      </div>

      {/* Angola flag gradient line */}
      <div className="h-1 rounded-full bg-gradient-to-r from-[#CE1126] via-[#000] to-[#F9D616] mb-6" />

      <div className="space-y-2">
        {ANGOLA_TRENDING.map((item) => (
          <div key={item.rank} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-card group">
            <span className="text-xl font-black text-muted-foreground/50 w-10 text-center">#{item.rank}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <Badge variant="outline" className="text-[9px]">{item.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">@{item.creator} · {item.category}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
              <Eye className="w-3 h-3" />{item.views > 999 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
            </div>
            <div className="flex items-center gap-0.5 text-xs text-[var(--success)] shrink-0 font-medium">
              <ArrowUp className="w-3 h-3" />+{item.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
