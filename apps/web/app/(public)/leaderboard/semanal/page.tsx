"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { Calendar, Clock } from "lucide-react"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }, { id: "semanal", label: "Semanal", emoji: "📅", href: "/leaderboard/semanal" }, { id: "mensal", label: "Mensal", emoji: "📆", href: "/leaderboard/mensal" }]

const WEEKS = [{ id: "current", label: "Esta semana" }, { id: "prev1", label: "Semana passada" }, { id: "prev2", label: "Há 2 semanas" }, { id: "prev3", label: "Há 3 semanas" }]

const MOCK: LeaderboardEntry[] = [
  { rank: 1, username: "voz-angola", displayName: "Voz de Angola", value: 9250, valueLabel: "pontos", change: 0 },
  { rank: 2, username: "kuduro-king", displayName: "Kuduro King", value: 8700, valueLabel: "pontos", change: 1 },
  { rank: 3, username: "esports-ao", displayName: "eSports AO", value: 8100, valueLabel: "pontos", change: -1 },
]

export default function LeaderboardSemanalPage() {
  const [week, setWeek] = useState("current")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Leaderboard Semanal</h1>
      <LeaderboardTabs tabs={NAV} active="semanal" />
      <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Actualizado toda segunda-feira às 00:00 WAT</p>
      <div className="flex gap-1">{WEEKS.map(w => <button key={w.id} onClick={() => setWeek(w.id)} className={`px-3 py-1 rounded-full text-[10px] font-bold ${week === w.id ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}>{w.label}</button>)}</div>
      <LeaderboardTable entries={MOCK} />
    </div>
  )
}
