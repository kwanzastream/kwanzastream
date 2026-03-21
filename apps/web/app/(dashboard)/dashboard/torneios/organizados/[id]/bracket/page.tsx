"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

export default function BracketPage() {
  const params = useParams()
  const id = params.id as string
  const [tournament, setTournament] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/creator/tournaments/${id}`)
      .then(res => setTournament(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  if (!tournament) return null

  const matches = tournament.matches || []
  const rounds = [...new Set(matches.map((m: any) => m.round))].sort()

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/torneios/organizados/${id}/gerir`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar à gestão
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Bracket — {tournament.title}</h2>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Zap className="w-3.5 h-3.5" />Gerar bracket
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">Single Elimination · {tournament.participantCount} participantes</p>

      {/* Bracket display */}
      {rounds.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center">
          <Zap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">Bracket ainda não gerado</p>
          <p className="text-[10px] text-muted-foreground mt-1">Clica em "Gerar bracket" para criar automaticamente.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {(rounds as number[]).map((round: number) => (
            <div key={round} className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Ronda {round}
              </h3>
              <div className="space-y-2">
                {matches.filter((m: any) => m.round === round).map((m: any) => (
                  <div key={m.id} className="p-3 rounded-xl border border-white/10 flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm">{m.player1 ? `@${m.player1.username}` : "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-mono">
                      {m.score1 !== null ? (
                        <span className={m.winnerId === m.player1?.id ? "text-primary font-bold" : "text-muted-foreground"}>
                          {m.score1}
                        </span>
                      ) : <span className="text-muted-foreground">-</span>}
                      <span className="text-muted-foreground">:</span>
                      {m.score2 !== null ? (
                        <span className={m.winnerId === m.player2?.id ? "text-primary font-bold" : "text-muted-foreground"}>
                          {m.score2}
                        </span>
                      ) : <span className="text-muted-foreground">-</span>}
                    </div>
                    <div className="flex-1 flex items-center gap-2 justify-end">
                      <span className="text-sm">{m.player2 ? `@${m.player2.username}` : "TBD"}</span>
                    </div>
                    {m.winnerId ? (
                      <Badge className="text-[9px] bg-green-500/10 text-green-400">✓</Badge>
                    ) : (
                      <Link href={`/dashboard/torneios/organizados/${id}/resultados`}>
                        <Button variant="outline" size="sm" className="text-[10px] h-6 px-2">Resultado</Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
