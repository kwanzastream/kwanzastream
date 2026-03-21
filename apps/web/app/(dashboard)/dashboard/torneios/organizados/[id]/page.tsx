"use client"

import { useState, useEffect } from "react"
import { Loader2, Trophy, Users, Eye, Settings2, ExternalLink, Share2, Award, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/api"

export default function TorneioDetalhePage() {
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

  if (!tournament) {
    return <div className="text-center py-20 text-muted-foreground">Torneio não encontrado</div>
  }

  const t = tournament

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold">{t.title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <Badge className={`text-[9px] ${t.status === "ACTIVE" ? "bg-red-500/10 text-red-400" : "bg-white/5 text-muted-foreground"}`}>
            {t.status === "ACTIVE" ? "Em curso" : t.status}
          </Badge>
          {t.currentPhase && <span className="text-xs text-muted-foreground">— {t.currentPhase}</span>}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg font-bold">{t.participantCount}/{t.maxParticipants || "∞"}</p>
          <p className="text-[10px] text-muted-foreground">Participantes</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Eye className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg font-bold">{t.combinedViewers || 0}</p>
          <p className="text-[10px] text-muted-foreground">Viewers</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <BarChart2 className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg font-bold">{t.streams || 0}</p>
          <p className="text-[10px] text-muted-foreground">Streams activos</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Trophy className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
          <p className="text-lg font-bold">{t.prize}</p>
          <p className="text-[10px] text-muted-foreground">Prémio</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Link href={`/dashboard/torneios/organizados/${id}/gerir`}>
          <Button className="gap-1.5"><Settings2 className="w-4 h-4" />Gerir torneio</Button>
        </Link>
        <Link href={`/torneios/${id}`}>
          <Button variant="outline" className="gap-1.5"><ExternalLink className="w-4 h-4" />Ver página pública</Button>
        </Link>
        <Button variant="outline" className="gap-1.5" onClick={() => {
          navigator.share?.({ url: `${window.location.origin}/torneios/${id}`, title: t.title })
        }}>
          <Share2 className="w-4 h-4" />Partilhar
        </Button>
      </div>

      {/* Quick actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Acções rápidas</h3>
        <div className="flex flex-wrap gap-2">
          <Link href={`/dashboard/torneios/organizados/${id}/resultados`}>
            <Button variant="outline" size="sm" className="text-xs gap-1"><Award className="w-3 h-3" />Introduzir resultados</Button>
          </Link>
          <Link href={`/dashboard/torneios/organizados/${id}/bracket`}>
            <Button variant="outline" size="sm" className="text-xs gap-1"><BarChart2 className="w-3 h-3" />Actualizar bracket</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
