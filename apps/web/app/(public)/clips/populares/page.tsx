"use client"
import { useState } from "react"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { SearchFilters } from "@/components/search/search-filters"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/clips/recentes" },
  { id: "populares", label: "Populares", href: "/clips/populares" },
  { id: "para-ti", label: "Para ti", href: "/clips/para-ti" },
  { id: "trending", label: "Trending", href: "/clips/trending" },
  { id: "guardados", label: "Guardados", href: "/clips/guardados" },
]
const PERIOD_FILTERS = [{ id: "today", label: "Hoje" }, { id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "all", label: "De sempre" }]

const MOCK: ClipData[] = [
  { id: "c4", title: "Golo de antologia!", duration: 15, viewCount: 120000, shares: 8900, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Desporto", creator: { username: "desporto_ao", displayName: "Desporto AO" } },
  { id: "c2", title: "Dança de kuduro ao vivo", duration: 45, viewCount: 89000, shares: 3400, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "c1", title: "Clutch 1v4 incrível! 🔥", duration: 28, viewCount: 45000, shares: 1200, createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Gaming", creator: { username: "angolangamer", displayName: "Angola Gamer" } },
]

export default function ClipsPopularesPage() {
  const [period, setPeriod] = useState("week")
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold">Clips Populares</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "populares" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <SearchFilters filters={PERIOD_FILTERS} active={period} onChange={setPeriod} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(c => <ClipCard key={c.id} clip={c} />)}</div>
    </div>
  )
}
