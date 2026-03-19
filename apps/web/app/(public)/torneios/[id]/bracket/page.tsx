"use client"
import { useParams } from "next/navigation"
import { TournamentBracket, MOCK_BRACKET } from "@/components/tournaments/tournament-bracket"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TorneioBracketPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Bracket</h1></div>
      <p className="text-[10px] text-muted-foreground">Scroll horizontal para navegar · Resultados actualizam a cada 30s</p>
      <TournamentBracket matches={MOCK_BRACKET} rounds={3} />
    </div>
  )
}
