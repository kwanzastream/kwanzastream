"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import { CampaignMetricsRow } from "@/components/ads/campaign-metrics-row"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function CampaignDetailPage() {
  const { id } = useParams()
  const [c, setC] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/ads/campaigns/${id}`).then(r => setC(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!c) return <div className="text-center py-20 text-muted-foreground">Campanha não encontrada</div>

  const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : "0"

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/ads/gerir" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Campanhas</Link>
      <div className="flex items-start justify-between">
        <div><h1 className="text-xl font-bold">{c.name}</h1><p className="text-[10px] text-muted-foreground">#{c.reference}</p></div>
        <Badge className={c.status === "active" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}>{c.status}</Badge>
      </div>

      <div className="p-4 rounded-xl border border-white/10 space-y-1">
        <CampaignMetricsRow label="Período" value={`${new Date(c.startDate).toLocaleDateString("pt-AO")} — ${new Date(c.endDate).toLocaleDateString("pt-AO")}`} />
        <CampaignMetricsRow label="Orçamento" value={`${c.budget.toLocaleString()} Kz`} />
        <CampaignMetricsRow label="Gasto" value={`${c.spent.toLocaleString()} Kz`} highlight />
        <CampaignMetricsRow label="Impressões" value={c.impressions.toLocaleString()} />
        <CampaignMetricsRow label="Cliques" value={c.clicks.toLocaleString()} />
        <CampaignMetricsRow label="CTR" value={`${ctr}%`} />
      </div>

      <div className="flex gap-2">
        <Link href={`/ads/gerir/${id}/analytics`}><Button size="sm">Analytics</Button></Link>
        {["draft","review","paused"].includes(c.status) && <Link href={`/ads/gerir/${id}/editar`}><Button variant="outline" size="sm">Editar</Button></Link>}
        {["active","paused"].includes(c.status) && <Link href={`/ads/gerir/${id}/pausar`}><Button variant="outline" size="sm">{c.status === "active" ? "Pausar" : "Retomar"}</Button></Link>}
      </div>
    </div>
  )
}
