"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { TournamentDashboardCard } from "@/components/dashboard/tournaments/tournament-dashboard-card"
import api from "@/lib/api"
import { toast } from "sonner"

export default function MeusTorneiosPage() {
  const [tournaments, setTournaments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/tournaments")
      .then(res => setTournaments(res.data.participating || []))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  const active = tournaments.filter(t => t.status === "ACTIVE")
  const upcoming = tournaments.filter(t => t.status === "REGISTERING" || t.status === "CLOSED")
  const completed = tournaments.filter(t => t.status === "COMPLETED")

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Activos</h2>
          <div className="space-y-2">
            {active.map(t => <TournamentDashboardCard key={t.id} {...t} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Próximos</h2>
          <div className="space-y-2">
            {upcoming.map(t => <TournamentDashboardCard key={t.id} {...t} />)}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Passados</h2>
          <div className="space-y-2">
            {completed.map(t => <TournamentDashboardCard key={t.id} {...t} result={t.winner ? { position: 2, prize: t.prize } : null} />)}
          </div>
        </div>
      )}

      {tournaments.length === 0 && (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center">
          <p className="text-sm text-muted-foreground">Ainda não participas em nenhum torneio.</p>
          <p className="text-[10px] text-muted-foreground mt-1">Procura torneios em /torneios</p>
        </div>
      )}
    </div>
  )
}
