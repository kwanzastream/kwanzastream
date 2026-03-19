"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs, LeaderboardPeriodSelector } from "@/components/leaderboard/leaderboard-tabs"
import { Scissors } from "lucide-react"
const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]
const METRICS = [{ id: "salos-enviados", label: "Salos", emoji: "💛", href: "/leaderboard/viewers/salos-enviados" }, { id: "horas-assistidas", label: "Horas", emoji: "⏱", href: "/leaderboard/viewers/horas-assistidas" }, { id: "clips-criados", label: "Clips", emoji: "✂️", href: "/leaderboard/viewers/clips-criados" }]
const PERIODS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "alltime", label: "De sempre" }]
const MOCK: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({ rank: i + 1, username: `clipper-${i + 1}`, displayName: `Clipper ${i + 1}`, value: Math.round(100 - i * 4), valueLabel: "clips criados", change: Math.floor(Math.random() * 5) - 2 }))
export default function Page() {
  const [period, setPeriod] = useState("week")
  return (<div className="max-w-4xl mx-auto py-4 px-4 space-y-4"><h1 className="text-xl font-bold flex items-center gap-2"><Scissors className="w-5 h-5" />Top 100 — Clips Criados</h1><LeaderboardTabs tabs={NAV} active="viewers" /><LeaderboardTabs tabs={METRICS} active="clips-criados" /><LeaderboardPeriodSelector periods={PERIODS} active={period} onChange={setPeriod} /><LeaderboardTable entries={MOCK} /></div>)
}
