"use client"
import { TournamentCard, type TournamentData } from "@/components/tournaments/tournament-card"
import { Trophy } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Em Curso", href: "/torneios/activos" },
  { id: "proximos", label: "Próximos", href: "/torneios/proximos" },
  { id: "passados", label: "Passados", href: "/torneios/passados" },
]

const MOCK: TournamentData[] = [
  { id: "t6", title: "FIFA 25 — Campeonato Nacional", game: "FIFA 25", status: "COMPLETED", format: "individual", prize: "150.000 Kz", participantCount: 64, startDate: new Date(Date.now() - 2592000000).toISOString(), winner: { username: "fifa_king_ao", displayName: "FIFA King AO" }, organizer: { username: "esports_ao", displayName: "eSports AO" } },
]

export default function TorneiosPassadosPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" />Torneios Passados</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "passados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(t => <TournamentCard key={t.id} t={t} />)}</div>
    </div>
  )
}
