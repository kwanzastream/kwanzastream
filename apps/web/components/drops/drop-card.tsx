"use client"

import { Gift, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface DropData {
  id: string
  brandName: string
  brandLogo?: string
  prize: string
  requirementMinutes: number
  requirementCategory: string
  progressMinutes?: number
  totalAvailable: number
  claimed: number
  endsAt: string
  status: "available" | "in_progress" | "ready" | "redeemed" | "expired"
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  available: { label: "Disponível", color: "bg-green-500/10 text-green-400" },
  in_progress: { label: "Em progresso", color: "bg-blue-500/10 text-blue-400" },
  ready: { label: "Pronto a resgatar", color: "bg-yellow-500/10 text-yellow-400" },
  redeemed: { label: "Resgatado", color: "bg-primary/10 text-primary" },
  expired: { label: "Expirado", color: "bg-red-500/10 text-red-400" },
}

export function DropCard({ drop }: { drop: DropData }) {
  const st = STATUS_LABELS[drop.status]
  const pct = drop.progressMinutes != null ? Math.min(100, Math.round((drop.progressMinutes / drop.requirementMinutes) * 100)) : 0
  const remaining = drop.endsAt ? Math.max(0, Math.ceil((new Date(drop.endsAt).getTime() - Date.now()) / 86400000)) : 0

  return (
    <Link href={`/drops/${drop.id}`} className="block">
      <div className="p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all bg-card space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            {drop.brandLogo ? <img src={drop.brandLogo} className="w-8 h-8 object-contain" /> : <Gift className="w-6 h-6 text-primary/40" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{drop.prize}</p>
            <p className="text-[10px] text-muted-foreground">{drop.brandName}</p>
          </div>
          <Badge className={`text-[9px] ${st.color}`}>{st.label}</Badge>
        </div>
        <p className="text-[10px] text-muted-foreground">Assiste {drop.requirementMinutes} min em {drop.requirementCategory}</p>
        {drop.progressMinutes != null && drop.status !== "redeemed" && drop.status !== "expired" && (
          <div className="space-y-1">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
            <div className="flex justify-between text-[9px] text-muted-foreground"><span>{pct}% ({drop.progressMinutes}/{drop.requirementMinutes} min)</span><span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{remaining}d restantes</span></div>
          </div>
        )}
        <div className="flex items-center justify-between text-[9px] text-muted-foreground"><span>{drop.totalAvailable - drop.claimed} de {drop.totalAvailable} disponíveis</span>{drop.status === "ready" && <Button size="sm" className="h-6 px-2 text-[10px]">Resgatar</Button>}</div>
      </div>
    </Link>
  )
}
