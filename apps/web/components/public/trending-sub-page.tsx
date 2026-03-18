"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowUp, ArrowDown, Flame } from "lucide-react"
import Link from "next/link"
import { PeriodSelector } from "@/components/public/content-filters"

const TREND_TYPES = [
  { value: "all", label: "Tudo", href: "/tendencias" },
  { value: "clips", label: "Clips", href: "/tendencias/clips" },
  { value: "shorts", label: "Shorts", href: "/tendencias/shorts" },
  { value: "streams", label: "Streams", href: "/tendencias/streams" },
  { value: "canais", label: "Canais", href: "/tendencias/canais" },
  { value: "categorias", label: "Categorias", href: "/tendencias/categorias" },
  { value: "angola", label: "🇦🇴 Angola", href: "/tendencias/angola" },
]

interface TrendingSubPageProps {
  type: string
  title: string
  description: string
  items: Array<{ rank: number; title: string; subtitle: string; change: number; metric: string; href: string }>
}

export function TrendingSubPage({ type, title, description, items }: TrendingSubPageProps) {
  const [period, setPeriod] = useState("today")

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/tendencias" className="hover:text-foreground">Tendências</Link>
          <span>/</span><span className="text-foreground">{title}</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="scroll-tabs gap-2 mb-4">
        {TREND_TYPES.map((t) => (
          <Link key={t.value} href={t.href} className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${t.value === type ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`}>
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

      <div className="space-y-2">
        {items.map((item) => (
          <Link key={item.rank} href={item.href} className="block group">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-card">
              <span className="text-xl font-black text-muted-foreground/50 w-10 text-center">#{item.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{item.metric}</span>
              <div className={`flex items-center gap-0.5 text-xs shrink-0 font-medium ${item.change > 0 ? "text-[var(--success)]" : item.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                {item.change > 0 ? <ArrowUp className="w-3 h-3" /> : item.change < 0 ? <ArrowDown className="w-3 h-3" /> : null}
                {item.change > 0 ? "+" : ""}{item.change}%
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
