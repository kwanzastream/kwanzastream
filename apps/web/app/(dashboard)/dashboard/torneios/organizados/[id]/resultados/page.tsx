"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, CheckCircle } from "lucide-react"
import { ResultInputForm } from "@/components/dashboard/tournaments/result-input-form"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

export default function ResultadosPage() {
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

  const handleSaveResult = async (matchId: string, winnerId: string, score1: number, score2: number) => {
    try {
      await api.patch(`/api/creator/tournaments/${id}/matches/${matchId}`, { winnerId, score1, score2 })
      toast.success("Resultado guardado!")
      // Update local match
      setTournament((t: any) => ({
        ...t,
        matches: t.matches.map((m: any) => m.id === matchId ? { ...m, winnerId, score1, score2 } : m),
      }))
    } catch {
      toast.error("Erro ao guardar resultado")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  if (!tournament) return null

  const matches = tournament.matches || []
  const pendingMatches = matches.filter((m: any) => !m.winnerId && m.player1 && m.player2)
  const completedMatches = matches.filter((m: any) => m.winnerId)

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/torneios/organizados/${id}/gerir`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar à gestão
      </Link>

      <h2 className="text-lg font-bold">Introduzir Resultados — {tournament.title}</h2>

      {pendingMatches.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-yellow-400">Jogos sem resultado ({pendingMatches.length})</h3>
          {pendingMatches.map((m: any) => (
            <ResultInputForm
              key={m.id}
              matchId={m.id}
              player1={m.player1}
              player2={m.player2}
              onSave={handleSaveResult}
            />
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-xl border border-dashed border-white/10 text-center">
          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-sm font-medium">Todos os resultados foram introduzidos!</p>
        </div>
      )}

      {completedMatches.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Resultados introduzidos</h3>
          {completedMatches.map((m: any) => (
            <div key={m.id} className="p-3 rounded-xl border border-white/10 flex items-center gap-3">
              <span className={`text-sm ${m.winnerId === m.player1?.id ? "text-primary font-bold" : "text-muted-foreground"}`}>
                @{m.player1?.username}
              </span>
              <span className="font-mono text-sm">{m.score1} : {m.score2}</span>
              <span className={`text-sm ${m.winnerId === m.player2?.id ? "text-primary font-bold" : "text-muted-foreground"}`}>
                @{m.player2?.username}
              </span>
              <CheckCircle className="w-3.5 h-3.5 text-green-400 ml-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
