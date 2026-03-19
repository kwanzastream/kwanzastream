"use client"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/clips/recentes" },
  { id: "populares", label: "Populares", href: "/clips/populares" },
  { id: "para-ti", label: "Para ti", href: "/clips/para-ti" },
  { id: "trending", label: "Trending", href: "/clips/trending" },
  { id: "guardados", label: "Guardados", href: "/clips/guardados" },
]

const MOCK: ClipData[] = [
  { id: "c2", title: "Dança de kuduro ao vivo — recomendado", duration: 45, viewCount: 89000, shares: 3400, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
]

export default function ClipsParaTiPage() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => { if (!user) router.replace("/clips/populares") }, [user, router])

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />Para ti</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "para-ti" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      <p className="text-xs text-muted-foreground">Baseado nos teus interesses e canais seguidos</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(c => <ClipCard key={c.id} clip={c} />)}</div>
    </div>
  )
}
