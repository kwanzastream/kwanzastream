"use client"
import { TournamentCard, type TournamentData } from "@/components/tournaments/tournament-card"
import { Flame, Eye } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Em Curso", href: "/torneios/activos" },
  { id: "proximos", label: "Próximos", href: "/torneios/proximos" },
  { id: "passados", label: "Passados", href: "/torneios/passados" },
]

const MOCK: TournamentData[] = [
  { id: "t1", title: "Torneio FIFA 25 — Luanda Cup", game: "FIFA 25", status: "ACTIVE", format: "individual", currentPhase: "Quartos-de-final", prize: "50.000 Kz", participantCount: 32, viewerCount: 3400, startDate: new Date(Date.now() - 86400000).toISOString(), organizer: { username: "esports_ao", displayName: "eSports AO" } },
  { id: "t2", title: "Mobile Legends Bang Bang — Season 3", game: "MLBB", status: "ACTIVE", format: "team5", currentPhase: "Fase de Grupos", prize: "100.000 Kz", participantCount: 16, viewerCount: 1200, startDate: new Date(Date.now() - 172800000).toISOString(), organizer: { username: "mlbb_angola", displayName: "MLBB Angola" } },
]

export default function TorneiosActivosPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-red-500" />Torneios em Curso</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "activos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      {MOCK.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(t => <TournamentCard key={t.id} t={t} />)}</div> : <div className="text-center py-16"><Flame className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem torneios activos agora</p></div>}
    </div>
  )
}
