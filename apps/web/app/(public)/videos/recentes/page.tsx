"use client"
import { useState } from "react"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/videos/recentes" },
  { id: "populares", label: "Populares", href: "/videos/populares" },
  { id: "para-ti", label: "Para ti", href: "/videos/para-ti" },
  { id: "a-seguir", label: "A seguir", href: "/videos/a-seguir" },
  { id: "guardados", label: "Guardados", href: "/videos/guardados" },
]

const DURATION_FILTERS = [{ id: "all", label: "Todas" }, { id: "short", label: "< 30min" }, { id: "medium", label: "30-120min" }, { id: "long", label: "> 2h" }]
const DATE_FILTERS = [{ id: "all", label: "Qualquer" }, { id: "today", label: "Hoje" }, { id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }]

const MOCK: VodData[] = [
  { id: "v1", title: "Kuduro Session #45 — 5 horas de música", thumbnailUrl: "/placeholder.jpg", duration: 18000, viewCount: 4200, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "v2", title: "Valorant Ranked — Road to Diamond Angola", duration: 7200, viewCount: 1500, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Gaming", creator: { username: "angolangamer", displayName: "Angola Gamer" } },
  { id: "v3", title: "Culinária de Luanda — Moamba de Galinha", duration: 2400, viewCount: 890, createdAt: new Date(Date.now() - 259200000).toISOString(), category: "Culinária", creator: { username: "chef_mwangole", displayName: "Chef Mwangolê" } },
  { id: "v4", title: "Tutorial: Como fazer stream com telemóvel", duration: 1800, viewCount: 5600, createdAt: new Date(Date.now() - 345600000).toISOString(), category: "Tecnologia", creator: { username: "tech_ao", displayName: "Tech AO" } },
  { id: "v5", title: "Girabola Highlights — Jornada 15", duration: 3600, viewCount: 12000, createdAt: new Date(Date.now() - 432000000).toISOString(), category: "Desporto", creator: { username: "desporto_ao", displayName: "Desporto AO" } },
  { id: "v6", title: "Live Noturna — Gaming e conversa", duration: 10800, viewCount: 670, createdAt: new Date(Date.now() - 518400000).toISOString(), category: "Gaming", progress: 0.35, creator: { username: "luanda_gamer", displayName: "Luanda Gamer" } },
]

export default function VideosRecentesPage() {
  const [durFilter, setDurFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold">VODs Recentes</h1></div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "recentes" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <div className="flex flex-wrap gap-4">
        <SearchFilters filters={DURATION_FILTERS} active={durFilter} onChange={setDurFilter} />
        <SearchFilters filters={DATE_FILTERS} active={dateFilter} onChange={setDateFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK.map(v => <VodCard key={v.id} vod={v} />)}
      </div>
    </div>
  )
}
