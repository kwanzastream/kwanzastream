"use client"
import { useParams } from "next/navigation"
import { TournamentBracket, MOCK_BRACKET } from "@/components/tournaments/tournament-bracket"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TorneioBracketRondaPage() {
  const { id, ronda } = useParams()
  const roundNum = parseInt(String(ronda)) || 1
  const roundMatches = MOCK_BRACKET.filter(m => m.round === roundNum)
  const roundNames = ["R1", "R2", "Quartos", "Semis", "Final"]

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/bracket`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">{roundNames[roundNum - 1] || `Ronda ${ronda}`}</h1></div>
      <div className="space-y-3">
        {roundMatches.map(m => (
          <Link key={m.id} href={`/torneios/${id}/bracket/${ronda}/${m.id}`} className="block p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{m.p1 || "TBD"}</span>
              {m.score && <span className="text-xs font-mono text-primary">{m.score.split("-")[0]}</span>}
            </div>
            <div className="h-px bg-white/10 my-1" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{m.p2 || "TBD"}</span>
              {m.score && <span className="text-xs font-mono text-primary">{m.score.split("-")[1]}</span>}
            </div>
            {m.isLive && <Badge className="mt-2 bg-red-600 text-white text-[9px]">AO VIVO</Badge>}
          </Link>
        ))}
      </div>
    </div>
  )
}
