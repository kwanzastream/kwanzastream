"use client"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/clips/recentes" },
  { id: "populares", label: "Populares", href: "/clips/populares" },
  { id: "para-ti", label: "Para ti", href: "/clips/para-ti" },
  { id: "trending", label: "Trending", href: "/clips/trending" },
  { id: "guardados", label: "Guardados", href: "/clips/guardados" },
]

const MOCK: ClipData[] = [
  { id: "c4", title: "Golo de antologia! 🔥", duration: 15, viewCount: 120000, shares: 8900, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Desporto", creator: { username: "desporto_ao", displayName: "Desporto AO" } },
  { id: "c2", title: "Dança de kuduro viral", duration: 45, viewCount: 89000, shares: 3400, createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "c1", title: "Clutch impossível! 🎮", duration: 28, viewCount: 45000, shares: 1200, createdAt: new Date(Date.now() - 1800000).toISOString(), category: "Gaming", creator: { username: "angolangamer", displayName: "Angola Gamer" } },
]

export default function ClipsTrendingPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />Trending</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "trending" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <p className="text-[10px] text-muted-foreground">Score = views últimas 2h × partilhas × 1.5 · Angola-First +30%</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(c => <ClipCard key={c.id} clip={c} />)}</div>
    </div>
  )
}
