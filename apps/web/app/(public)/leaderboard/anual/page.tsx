"use client"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { Calendar, Clock } from "lucide-react"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }, { id: "semanal", label: "Semanal", emoji: "📅", href: "/leaderboard/semanal" }, { id: "mensal", label: "Mensal", emoji: "📆", href: "/leaderboard/mensal" }, { id: "anual", label: "Anual", emoji: "🏅", href: "/leaderboard/anual" }]

export default function LeaderboardAnualPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Leaderboard Anual</h1>
      <LeaderboardTabs tabs={NAV} active="anual" />
      <div className="py-16 text-center space-y-4">
        <p className="text-5xl">🏅</p>
        <h2 className="text-lg font-bold">Primeiro ranking anual em Dezembro 2026</h2>
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Clock className="w-3 h-3" />O ranking anual será calculado após 12 meses completos de plataforma.</p>
        <p className="text-[10px] text-muted-foreground">Enquanto isso, acompanha os rankings semanais e mensais!</p>
      </div>
    </div>
  )
}
