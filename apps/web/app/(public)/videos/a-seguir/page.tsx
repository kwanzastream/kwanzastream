"use client"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { Users } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/videos/recentes" },
  { id: "populares", label: "Populares", href: "/videos/populares" },
  { id: "para-ti", label: "Para ti", href: "/videos/para-ti" },
  { id: "a-seguir", label: "A seguir", href: "/videos/a-seguir" },
  { id: "guardados", label: "Guardados", href: "/videos/guardados" },
]

const MOCK: VodData[] = [
  { id: "v2", title: "Valorant Ranked — Road to Diamond", duration: 7200, viewCount: 1500, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Gaming", creator: { username: "angolangamer", displayName: "Angola Gamer" } },
]

export default function VideosASeguirPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Users className="w-5 h-5" />Canais que segues</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "a-seguir" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK.map(v => <VodCard key={v.id} vod={v} />)}
      </div>
    </div>
  )
}
