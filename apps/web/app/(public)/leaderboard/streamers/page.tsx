"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs, LeaderboardPeriodSelector, type LeaderboardTab } from "@/components/leaderboard/leaderboard-tabs"
import { Trophy } from "lucide-react"

const NAV: LeaderboardTab[] = [
  { id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" },
  { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" },
  { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" },
  { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" },
  { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" },
  { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" },
  { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" },
  { id: "semanal", label: "Semanal", emoji: "📅", href: "/leaderboard/semanal" },
]

const METRICS = [
  { id: "viewers", label: "Viewers médios", emoji: "👁", href: "/leaderboard/streamers/viewers" },
  { id: "horas", label: "Horas", emoji: "⏱", href: "/leaderboard/streamers/horas" },
  { id: "salos", label: "Salos", emoji: "💛", href: "/leaderboard/streamers/salos" },
  { id: "seguidores", label: "Seguidores", emoji: "👥", href: "/leaderboard/streamers/seguidores" },
]

const PERIODS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "alltime", label: "De sempre" }]

const MOCK: LeaderboardEntry[] = [
  { rank: 1, username: "voz-angola", displayName: "Voz de Angola", value: 1234, valueLabel: "viewers médios", change: 0 },
  { rank: 2, username: "kuduro-king", displayName: "Kuduro King", value: 987, valueLabel: "viewers médios", change: 2 },
  { rank: 3, username: "esports-ao", displayName: "eSports AO", value: 756, valueLabel: "viewers médios", change: -1 },
  { rank: 4, username: "semba-dj", displayName: "Semba DJ", value: 543, valueLabel: "viewers médios", change: "NEW" },
  { rank: 5, username: "tech-luanda", displayName: "Tech Luanda", value: 432, valueLabel: "viewers médios", change: 1 },
  { rank: 6, username: "gospel-ao", displayName: "Gospel AO", value: 321, valueLabel: "viewers médios", change: -2 },
  { rank: 7, username: "gamer-angola", displayName: "Gamer Angola", value: 298, valueLabel: "viewers médios", change: 0 },
  { rank: 8, username: "danca-ao", displayName: "Dança AO", value: 256, valueLabel: "viewers médios", change: 3 },
  { rank: 9, username: "cozinha-angolana", displayName: "Cozinha Angolana", value: 210, valueLabel: "viewers médios", change: -1 },
  { rank: 10, username: "beats-angola", displayName: "Beats Angola", value: 189, valueLabel: "viewers médios", change: "NEW" },
]

export default function LeaderboardStreamersPage() {
  const [period, setPeriod] = useState("week")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" />Leaderboard — Streamers</h1>
      <LeaderboardTabs tabs={NAV} active="streamers" />
      <LeaderboardTabs tabs={METRICS} active="viewers" />
      <LeaderboardPeriodSelector periods={PERIODS} active={period} onChange={setPeriod} />
      <LeaderboardTable entries={MOCK} />
    </div>
  )
}
