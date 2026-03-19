"use client"

import { useState } from "react"
import { Trophy, Users, Clock, Eye, Gamepad2, Bell, BellOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EventCountdown } from "@/components/events/event-countdown"
import { toast } from "sonner"
import Link from "next/link"

export interface TournamentData {
  id: string
  title: string
  game: string
  bannerUrl?: string
  status: "REGISTERING" | "CLOSED" | "ACTIVE" | "COMPLETED"
  format: "individual" | "team2" | "team5"
  currentPhase?: string
  prize: string
  participantCount: number
  maxParticipants?: number
  viewerCount?: number
  startDate: string
  winner?: { username: string; displayName: string }
  organizer: { username: string; displayName: string }
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  REGISTERING: { label: "Inscrições abertas", color: "bg-green-500/10 text-green-400 border-green-500/30" },
  CLOSED: { label: "Inscrições encerradas", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  ACTIVE: { label: "Em curso", color: "bg-red-500/10 text-red-400 border-red-500/30" },
  COMPLETED: { label: "Concluído", color: "bg-white/5 text-muted-foreground border-white/10" },
}

export function TournamentCard({ t }: { t: TournamentData }) {
  const [reminded, setReminded] = useState(false)
  const s = STATUS_LABELS[t.status] || STATUS_LABELS.COMPLETED

  return (
    <Link href={`/torneios/${t.id}`} className="group block">
      <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all bg-card">
        <div className="relative aspect-[2.5/1] bg-gradient-to-r from-primary/20 to-purple-500/10">
          {t.bannerUrl && <img src={t.bannerUrl} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
          <Badge className={`absolute top-2 left-2 text-[9px] ${s.color}`}>{s.label}</Badge>
          {t.status === "ACTIVE" && t.viewerCount && <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1"><Eye className="w-3 h-3" />{t.viewerCount.toLocaleString()}</div>}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">{t.title}</h3>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Gamepad2 className="w-3 h-3" />{t.game}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.participantCount}{t.maxParticipants ? `/${t.maxParticipants}` : ""}</span>
            <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-400" />{t.prize}</span>
          </div>
          {t.status === "ACTIVE" && t.currentPhase && <Badge variant="outline" className="text-[9px]">{t.currentPhase}</Badge>}
          {t.status === "COMPLETED" && t.winner && <p className="text-[10px] text-primary">🏆 Vencedor: @{t.winner.username}</p>}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-muted-foreground">{t.organizer.displayName}</span>
            {(t.status === "REGISTERING" || t.status === "CLOSED") && (
              <Button size="sm" variant="ghost" className="text-[10px] h-6 px-2" onClick={(e) => { e.preventDefault(); setReminded(!reminded); toast.success(reminded ? "Removido" : "Lembrete definido!") }}>
                {reminded ? <BellOff className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
