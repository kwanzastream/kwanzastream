"use client"
import { useState } from "react"
import { TournamentCard, type TournamentData } from "@/components/tournaments/tournament-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Calendar } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Em Curso", href: "/torneios/activos" },
  { id: "proximos", label: "Próximos", href: "/torneios/proximos" },
  { id: "passados", label: "Passados", href: "/torneios/passados" },
]
const GAME_FILTERS = [{ id: "all", label: "Todos" }, { id: "fifa", label: "FIFA" }, { id: "cod", label: "CoD" }, { id: "mlbb", label: "MLBB" }, { id: "cs2", label: "CS2" }]

const MOCK: TournamentData[] = [
  { id: "t3", title: "Call of Duty Mobile — Angola Open", game: "CoD Mobile", status: "REGISTERING", format: "team5", prize: "75.000 Kz", participantCount: 12, maxParticipants: 32, startDate: new Date(Date.now() + 604800000).toISOString(), organizer: { username: "cod_angola", displayName: "CoD Angola" } },
  { id: "t4", title: "FIFA 25 1v1 Weekend Cup", game: "FIFA 25", status: "REGISTERING", format: "individual", prize: "25.000 Kz", participantCount: 48, maxParticipants: 64, startDate: new Date(Date.now() + 259200000).toISOString(), organizer: { username: "esports_ao", displayName: "eSports AO" } },
  { id: "t5", title: "CS2 Luanda Masters", game: "CS2", status: "CLOSED", format: "team5", prize: "200.000 Kz", participantCount: 16, maxParticipants: 16, startDate: new Date(Date.now() + 86400000).toISOString(), organizer: { username: "cs2_angola", displayName: "CS2 Angola" } },
]

export default function TorneiosProximosPage() {
  const [game, setGame] = useState("all")
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Próximos Torneios</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "proximos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <SearchFilters filters={GAME_FILTERS} active={game} onChange={setGame} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(t => <TournamentCard key={t.id} t={t} />)}</div>
    </div>
  )
}
