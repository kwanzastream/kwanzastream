"use client"
import { AchievementCard, type AchievementData } from "@/components/drops/achievement-card"
import { Target } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "minhas", label: "Minhas", href: "/conquistas/minhas" },
  { id: "progresso", label: "Em Progresso", href: "/conquistas/progresso" },
  { id: "desbloqueadas", label: "Desbloqueadas", href: "/conquistas/desbloqueadas" },
  { id: "vitrine", label: "Vitrine", href: "/conquistas/vitrine" },
]

const IN_PROGRESS: AchievementData[] = [
  { id: "rei-dos-salos", name: "Rei dos Salos", description: "Envia 10.000 Salos no total", emoji: "💰", unlocked: false, progress: 6230, target: 10000 },
  { id: "kuduro-king", name: "Kuduro King", description: "Faz 10 streams de Kuduro", emoji: "🎵", unlocked: false, progress: 3, target: 10 },
  { id: "voz-de-angola", name: "Voz de Angola", description: "Atinge 1.000 seguidores", emoji: "📢", unlocked: false, progress: 450, target: 1000 },
  { id: "raid-master", name: "Raid Master", description: "Envia 10 raids", emoji: "⚔️", unlocked: false, progress: 4, target: 10 },
]

export default function ConquistasProgressoPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Target className="w-5 h-5" />Em Progresso</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "progresso" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{IN_PROGRESS.map(a => <AchievementCard key={a.id} achievement={a} />)}</div>
    </div>
  )
}
