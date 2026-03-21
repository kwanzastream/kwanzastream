"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Eye, Gamepad2, Settings2, ExternalLink } from "lucide-react"
import Link from "next/link"

interface TournamentDashboardCardProps {
  id: string
  title: string
  game: string
  status: string
  currentPhase?: string | null
  participantCount: number
  maxParticipants?: number
  viewerCount?: number
  prize: string
  isOrganized?: boolean
  result?: { position: number; prize: string } | null
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  ACTIVE: { label: "Em curso", cls: "bg-red-500/10 text-red-400 border-red-500/30" },
  REGISTERING: { label: "Inscrições abertas", cls: "bg-green-500/10 text-green-400 border-green-500/30" },
  CLOSED: { label: "Inscrições encerradas", cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  COMPLETED: { label: "Concluído", cls: "bg-white/5 text-muted-foreground border-white/10" },
  PENDING: { label: "Pendente", cls: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
}

export function TournamentDashboardCard({
  id, title, game, status, currentPhase, participantCount, maxParticipants, viewerCount, prize, isOrganized, result,
}: TournamentDashboardCardProps) {
  const s = STATUS_MAP[status] || STATUS_MAP.COMPLETED

  return (
    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold">{title}</h3>
            <Badge className={`text-[9px] ${s.cls}`}>{s.label}</Badge>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Gamepad2 className="w-3 h-3" />{game}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{participantCount}{maxParticipants ? `/${maxParticipants}` : ""}</span>
            <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-400" />{prize}</span>
            {viewerCount ? <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{viewerCount}</span> : null}
          </div>
          {currentPhase && <p className="text-[10px] text-primary">{currentPhase}</p>}
          {result && <p className="text-[10px] text-primary">🏆 {result.position}º lugar · {result.prize}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        {isOrganized ? (
          <>
            <Link href={`/dashboard/torneios/organizados/${id}/gerir`}>
              <Button variant="outline" size="sm" className="text-xs gap-1"><Settings2 className="w-3 h-3" />Gerir</Button>
            </Link>
            <Link href={`/torneios/${id}`}>
              <Button variant="ghost" size="sm" className="text-xs gap-1"><ExternalLink className="w-3 h-3" />Ver público</Button>
            </Link>
          </>
        ) : (
          <Link href={`/torneios/${id}`}>
            <Button variant="outline" size="sm" className="text-xs gap-1"><ExternalLink className="w-3 h-3" />Ver detalhes</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
