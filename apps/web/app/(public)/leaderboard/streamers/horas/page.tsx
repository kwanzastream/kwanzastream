"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs, LeaderboardPeriodSelector } from "@/components/leaderboard/leaderboard-tabs"
import { Clock } from "lucide-react"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]
const METRICS = [{ id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/streamers/viewers" }, { id: "horas", label: "Horas", emoji: "⏱", href: "/leaderboard/streamers/horas" }, { id: "salos", label: "Salos", emoji: "💛", href: "/leaderboard/streamers/salos" }, { id: "seguidores", label: "Seguidores", emoji: "👥", href: "/leaderboard/streamers/seguidores" }]
const PERIODS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "alltime", label: "De sempre" }]
const MOCK: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({ rank: i + 1, username: `streamer-${i + 1}`, displayName: `Streamer ${i + 1}`, value: Math.round(200 - i * 8), valueLabel: "horas", change: Math.floor(Math.random() * 5) - 2 }))

export default function LeaderboardStreamersHorasPage() {
  const [period, setPeriod] = useState("week")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Top 100 — Horas Transmitidas</h1>
      <LeaderboardTabs tabs={NAV} active="streamers" /><LeaderboardTabs tabs={METRICS} active="horas" /><LeaderboardPeriodSelector periods={PERIODS} active={period} onChange={setPeriod} />
      <LeaderboardTable entries={MOCK} />
    </div>
  )
}
