"use client"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { Globe } from "lucide-react"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]

const MOCK: LeaderboardEntry[] = [
  { rank: 1, username: "voz-angola", displayName: "Voz de Angola", value: 9250, valueLabel: "pontos globais", change: 0 },
  { rank: 2, username: "kuduro-king", displayName: "Kuduro King", value: 8700, valueLabel: "pontos globais", change: 1 },
  { rank: 3, username: "esports-ao", displayName: "eSports AO", value: 8100, valueLabel: "pontos globais", change: -1 },
  { rank: 4, username: "semba-dj", displayName: "Semba DJ", value: 7500, valueLabel: "pontos globais", change: "NEW" },
  { rank: 5, username: "tech-luanda", displayName: "Tech Luanda", value: 6800, valueLabel: "pontos globais", change: 2 },
]

export default function LeaderboardGlobalPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Globe className="w-5 h-5" />Leaderboard Global</h1>
      <LeaderboardTabs tabs={NAV} active="global" />
      <p className="text-[10px] text-muted-foreground">Score = viewers × 0.3 + salos × 0.3 + horas × 0.2 + seguidores × 0.2 (escala 0–10.000)</p>
      <LeaderboardTable entries={MOCK} />
    </div>
  )
}
