"use client"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/videos/recentes" },
  { id: "populares", label: "Populares", href: "/videos/populares" },
  { id: "para-ti", label: "Para ti", href: "/videos/para-ti" },
  { id: "a-seguir", label: "A seguir", href: "/videos/a-seguir" },
  { id: "guardados", label: "Guardados", href: "/videos/guardados" },
]

const MOCK: VodData[] = [
  { id: "v1", title: "Kuduro Session #45 — recomendado para ti", duration: 18000, viewCount: 4200, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "v6", title: "Live Noturna — Gaming e conversa", duration: 10800, viewCount: 670, createdAt: new Date(Date.now() - 518400000).toISOString(), category: "Gaming", progress: 0.35, creator: { username: "luanda_gamer", displayName: "Luanda Gamer" } },
]

export default function VideosParaTiPage() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => { if (!user) router.replace("/videos/populares") }, [user, router])

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />Para ti</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "para-ti" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <p className="text-xs text-muted-foreground">Baseado nos teus interesses e canais seguidos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK.map(v => <VodCard key={v.id} vod={v} />)}
      </div>
    </div>
  )
}
