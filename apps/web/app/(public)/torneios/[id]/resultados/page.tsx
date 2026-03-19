"use client"
import { useParams } from "next/navigation"
import { TournamentResultsTable } from "@/components/tournaments/tournament-results-table"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchFilters } from "@/components/search/search-filters"
import { useState } from "react"
import Link from "next/link"

const PHASE_FILTERS = [{ id: "final", label: "Final" }, { id: "semis", label: "Semis" }, { id: "quartos", label: "Quartos" }, { id: "grupos", label: "Grupos" }]
const MOCK = [
  { position: 1, username: "fifa_king_ao", displayName: "FIFA King AO", prize: "50.000 Kz" },
  { position: 2, username: "goal_master", displayName: "Goal Master", prize: "20.000 Kz" },
  { position: 3, username: "striker_ao", displayName: "Striker AO", prize: "10.000 Kz" },
  { position: 4, username: "dribble_god", displayName: "Dribble God", prize: "5.000 Kz" },
]

export default function TorneioResultadosPage() {
  const { id } = useParams()
  const [phase, setPhase] = useState("final")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Resultados</h1></div>
      <SearchFilters filters={PHASE_FILTERS} active={phase} onChange={setPhase} />
      <TournamentResultsTable results={MOCK} />
    </div>
  )
}
