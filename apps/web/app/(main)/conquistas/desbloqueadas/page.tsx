"use client"
import { AchievementCard, type AchievementData } from "@/components/drops/achievement-card"
import { Unlock } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "minhas", label: "Minhas", href: "/conquistas/minhas" },
  { id: "progresso", label: "Em Progresso", href: "/conquistas/progresso" },
  { id: "desbloqueadas", label: "Desbloqueadas", href: "/conquistas/desbloqueadas" },
  { id: "vitrine", label: "Vitrine", href: "/conquistas/vitrine" },
]

const UNLOCKED: AchievementData[] = [
  { id: "mwana-wa-angola", name: "Mwana wa Angola", description: "Assiste 10h de streams angolanos", emoji: "🇦🇴", unlocked: true, unlockedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "clip-viral", name: "Clip Viral", description: "Um clip teu chega a 10.000 views", emoji: "🔥", unlocked: true, unlockedAt: new Date(Date.now() - 604800000).toISOString() },
]

export default function ConquistasDesbloquedadasPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Unlock className="w-5 h-5 text-green-400" />Desbloqueadas</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "desbloqueadas" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      {UNLOCKED.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{UNLOCKED.map(a => <AchievementCard key={a.id} achievement={a} />)}</div> : <div className="text-center py-16"><Unlock className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem conquistas desbloqueadas</p></div>}
    </div>
  )
}
