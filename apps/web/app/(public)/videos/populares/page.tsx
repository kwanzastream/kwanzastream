"use client"
import { useState } from "react"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { SearchFilters } from "@/components/search/search-filters"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/videos/recentes" },
  { id: "populares", label: "Populares", href: "/videos/populares" },
  { id: "para-ti", label: "Para ti", href: "/videos/para-ti" },
  { id: "a-seguir", label: "A seguir", href: "/videos/a-seguir" },
  { id: "guardados", label: "Guardados", href: "/videos/guardados" },
]
const PERIOD_FILTERS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "all", label: "De sempre" }]

const MOCK: VodData[] = [
  { id: "v5", title: "Girabola Highlights — Jornada 15", duration: 3600, viewCount: 12000, createdAt: new Date(Date.now() - 432000000).toISOString(), category: "Desporto", creator: { username: "desporto_ao", displayName: "Desporto AO" } },
  { id: "v4", title: "Tutorial: Como fazer stream com telemóvel", duration: 1800, viewCount: 5600, createdAt: new Date(Date.now() - 345600000).toISOString(), category: "Tecnologia", creator: { username: "tech_ao", displayName: "Tech AO" } },
  { id: "v1", title: "Kuduro Session #45 — 5 horas de música", duration: 18000, viewCount: 4200, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
]

export default function VideosPopularesPage() {
  const [period, setPeriod] = useState("week")
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold">VODs Populares</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "populares" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <SearchFilters filters={PERIOD_FILTERS} active={period} onChange={setPeriod} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK.map(v => <VodCard key={v.id} vod={v} />)}
      </div>
    </div>
  )
}
