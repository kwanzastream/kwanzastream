"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs, LeaderboardPeriodSelector } from "@/components/leaderboard/leaderboard-tabs"
import { Clock } from "lucide-react"
const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]
const METRICS = [{ id: "salos-enviados", label: "Salos", emoji: "💛", href: "/leaderboard/viewers/salos-enviados" }, { id: "horas-assistidas", label: "Horas", emoji: "⏱", href: "/leaderboard/viewers/horas-assistidas" }, { id: "clips-criados", label: "Clips", emoji: "✂️", href: "/leaderboard/viewers/clips-criados" }]
const PERIODS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "alltime", label: "De sempre" }]
const MOCK: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({ rank: i + 1, username: `viewer-${i + 1}`, displayName: `Viewer ${i + 1}`, value: Math.round(300 - i * 12), valueLabel: "horas assistidas", change: Math.floor(Math.random() * 5) - 2 }))
export default function Page() {
  const [period, setPeriod] = useState("week")
  return (<div className="max-w-4xl mx-auto py-4 px-4 space-y-4"><h1 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Top 100 — Horas Assistidas</h1><LeaderboardTabs tabs={NAV} active="viewers" /><LeaderboardTabs tabs={METRICS} active="horas-assistidas" /><LeaderboardPeriodSelector periods={PERIODS} active={period} onChange={setPeriod} /><LeaderboardTable entries={MOCK} /></div>)
}
