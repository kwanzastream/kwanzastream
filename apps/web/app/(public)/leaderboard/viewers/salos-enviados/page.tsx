"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs, LeaderboardPeriodSelector } from "@/components/leaderboard/leaderboard-tabs"
import { Heart } from "lucide-react"
const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]
const METRICS = [{ id: "salos-enviados", label: "Salos enviados", emoji: "💛", href: "/leaderboard/viewers/salos-enviados" }, { id: "horas-assistidas", label: "Horas assistidas", emoji: "⏱", href: "/leaderboard/viewers/horas-assistidas" }, { id: "clips-criados", label: "Clips criados", emoji: "✂️", href: "/leaderboard/viewers/clips-criados" }]
const PERIODS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "alltime", label: "De sempre" }]
const MOCK: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => ({ rank: i + 1, username: `viewer-${i + 1}`, displayName: `Viewer ${i + 1}`, value: Math.round(30000 - i * 1200), valueLabel: "Salos enviados", change: Math.floor(Math.random() * 5) - 2 }))
export default function LeaderboardViewersSalosPage() {
  const [period, setPeriod] = useState("week")
  return (<div className="max-w-4xl mx-auto py-4 px-4 space-y-4"><h1 className="text-xl font-bold flex items-center gap-2"><Heart className="w-5 h-5 text-yellow-400" />Top 100 — Salos Enviados</h1><LeaderboardTabs tabs={NAV} active="viewers" /><LeaderboardTabs tabs={METRICS} active="salos-enviados" /><LeaderboardPeriodSelector periods={PERIODS} active={period} onChange={setPeriod} /><LeaderboardTable entries={MOCK} /></div>)
}
