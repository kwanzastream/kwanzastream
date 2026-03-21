"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Pause, Play, Edit } from "lucide-react"

interface CampaignCardProps {
  id: string
  name: string
  status: string
  objective: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  reference: string
  startDate: string
  endDate: string
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
  draft: { label: "Rascunho", color: "text-gray-400 bg-gray-500/10", icon: "📝" },
  review: { label: "Em revisão", color: "text-yellow-400 bg-yellow-500/10", icon: "⏳" },
  active: { label: "Live", color: "text-green-400 bg-green-500/10", icon: "🟢" },
  paused: { label: "Pausada", color: "text-orange-400 bg-orange-500/10", icon: "⏸️" },
  completed: { label: "Concluída", color: "text-blue-400 bg-blue-500/10", icon: "✅" },
}

export function CampaignCard({ id, name, status, objective, budget, spent, impressions, clicks, reference, startDate, endDate }: CampaignCardProps) {
  const s = STATUS_MAP[status] || STATUS_MAP.draft
  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0"

  return (
    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <p className="text-[10px] text-muted-foreground">#{reference} · {objective}</p>
        </div>
        <Badge className={`${s.color} text-[9px]`}>{s.icon} {s.label}</Badge>
      </div>

      {(status === "active" || status === "completed") && (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div><p className="text-xs font-bold">{(impressions / 1000).toFixed(1)}k</p><p className="text-[9px] text-muted-foreground">Impressões</p></div>
          <div><p className="text-xs font-bold">{clicks}</p><p className="text-[9px] text-muted-foreground">Cliques</p></div>
          <div><p className="text-xs font-bold">{ctr}%</p><p className="text-[9px] text-muted-foreground">CTR</p></div>
          <div><p className="text-xs font-bold">{(spent / 1000).toFixed(0)}k Kz</p><p className="text-[9px] text-muted-foreground">Gasto</p></div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Link href={`/ads/gerir/${id}`}><Button variant="outline" size="sm" className="text-[10px] gap-1"><BarChart3 className="w-3 h-3" />Ver</Button></Link>
        {status === "active" && <Link href={`/ads/gerir/${id}/pausar`}><Button variant="outline" size="sm" className="text-[10px] gap-1"><Pause className="w-3 h-3" />Pausar</Button></Link>}
        {status === "paused" && <Link href={`/ads/gerir/${id}/pausar`}><Button variant="outline" size="sm" className="text-[10px] gap-1"><Play className="w-3 h-3" />Retomar</Button></Link>}
        {["draft", "review", "paused"].includes(status) && <Link href={`/ads/gerir/${id}/editar`}><Button variant="outline" size="sm" className="text-[10px] gap-1"><Edit className="w-3 h-3" />Editar</Button></Link>}
      </div>
    </div>
  )
}
