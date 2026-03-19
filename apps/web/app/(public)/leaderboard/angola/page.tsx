"use client"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]

const MOCK: LeaderboardEntry[] = [
  { rank: 1, username: "voz-angola", displayName: "Voz de Angola", value: 9250, valueLabel: "pontos", change: 0, badge: "🇦🇴" },
  { rank: 2, username: "kuduro-king", displayName: "Kuduro King", value: 8700, valueLabel: "pontos", change: 1, badge: "🇦🇴" },
  { rank: 3, username: "esports-ao", displayName: "eSports AO", value: 8100, valueLabel: "pontos", change: -1, badge: "🇦🇴" },
  { rank: 4, username: "semba-dj", displayName: "Semba DJ", value: 7500, valueLabel: "pontos", change: "NEW", badge: "🇦🇴" },
]

const RISING: LeaderboardEntry[] = [
  { rank: 1, username: "novo-criador-ao", displayName: "Novo Criador AO", value: 250, valueLabel: "% crescimento", change: "NEW", badge: "🇦🇴" },
  { rank: 2, username: "cozinha-angolana", displayName: "Cozinha Angolana", value: 180, valueLabel: "% crescimento", change: 3, badge: "🇦🇴" },
]

export default function LeaderboardAngolaPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2">🇦🇴 Leaderboard Angola</h1>
      <LeaderboardTabs tabs={NAV} active="angola" />
      <p className="text-[10px] text-muted-foreground">Apenas criadores angolanos verificados. <Link href="/provincias" className="text-primary hover:underline">Ver por província →</Link></p>
      <LeaderboardTable entries={MOCK} />
      <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-green-400" />Criadores em Ascensão</h2><LeaderboardTable entries={RISING} /></div>
    </div>
  )
}
