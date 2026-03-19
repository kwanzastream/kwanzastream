"use client"
import { useState } from "react"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { Calendar, Trophy, Clock } from "lucide-react"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }, { id: "semanal", label: "Semanal", emoji: "📅", href: "/leaderboard/semanal" }, { id: "mensal", label: "Mensal", emoji: "📆", href: "/leaderboard/mensal" }]

const MONTHS = [{ id: "current", label: "Março 2026" }, { id: "prev1", label: "Fevereiro 2026" }, { id: "prev2", label: "Janeiro 2026" }]

const MOCK: LeaderboardEntry[] = [
  { rank: 1, username: "voz-angola", displayName: "Voz de Angola", value: 9800, valueLabel: "pontos", change: 0 },
  { rank: 2, username: "kuduro-king", displayName: "Kuduro King", value: 9200, valueLabel: "pontos", change: 1 },
  { rank: 3, username: "esports-ao", displayName: "eSports AO", value: 8500, valueLabel: "pontos", change: -1 },
]

export default function LeaderboardMensalPage() {
  const [month, setMonth] = useState("current")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Leaderboard Mensal</h1>
      <LeaderboardTabs tabs={NAV} active="mensal" />
      <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Actualizado no 1º de cada mês às 00:00 WAT</p>
      <div className="flex gap-1">{MONTHS.map(m => <button key={m.id} onClick={() => setMonth(m.id)} className={`px-3 py-1 rounded-full text-[10px] font-bold ${month === m.id ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}>{m.label}</button>)}</div>
      {month !== "current" && <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center"><p className="text-xs font-bold flex items-center justify-center gap-1"><Trophy className="w-4 h-4 text-yellow-400" />Vencedor: @{MOCK[0].username}</p></div>}
      <LeaderboardTable entries={MOCK} />
    </div>
  )
}
