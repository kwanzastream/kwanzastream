"use client"

import { useState, useEffect } from "react"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TournamentDashboardCard } from "@/components/dashboard/tournaments/tournament-dashboard-card"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function OrganizadosPage() {
  const [tournaments, setTournaments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/tournaments")
      .then(res => setTournaments(res.data.organized || []))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  const active = tournaments.filter(t => t.status === "ACTIVE")
  const pending = tournaments.filter(t => t.status === "PENDING" || t.status === "REGISTERING")
  const completed = tournaments.filter(t => t.status === "COMPLETED")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Torneios Organizados</h2>
        <Link href="/torneios/criar?from=dashboard">
          <Button variant="outline" size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Criar novo</Button>
        </Link>
      </div>

      {active.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Activos</h3>
          <div className="space-y-2">
            {active.map(t => <TournamentDashboardCard key={t.id} {...t} isOrganized />)}
          </div>
        </div>
      )}

      {pending.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pendentes</h3>
          <div className="space-y-2">
            {pending.map(t => <TournamentDashboardCard key={t.id} {...t} isOrganized />)}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Passados</h3>
          <div className="space-y-2">
            {completed.map(t => <TournamentDashboardCard key={t.id} {...t} isOrganized />)}
          </div>
        </div>
      )}

      {tournaments.length === 0 && (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center">
          <p className="text-sm text-muted-foreground">Ainda não organizaste nenhum torneio.</p>
        </div>
      )}
    </div>
  )
}
