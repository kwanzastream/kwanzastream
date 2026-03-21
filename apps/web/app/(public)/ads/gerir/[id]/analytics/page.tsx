"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"

export default function AnalyticsPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/ads/campaigns/${id}/analytics`).then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!data) return <div className="text-center py-20 text-muted-foreground">Analytics indisponíveis</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/ads/gerir/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Campanha</Link>
      <h1 className="text-xl font-bold">Analytics — {data.campaign.name}</h1>

      {/* Summary */}
      <div className="grid grid-cols-5 gap-3">
        {[{ label: "Impressões", value: data.summary.impressions.toLocaleString() }, { label: "Cliques", value: data.summary.clicks },
          { label: "CTR", value: `${data.summary.ctr}%` }, { label: "Alcance", value: data.summary.uniqueReach.toLocaleString() },
          { label: "CPC", value: `${data.summary.costPerClick} Kz` }].map((m, i) => (
          <div key={i} className="p-3 rounded-xl border border-white/10 text-center">
            <p className="text-sm font-bold">{m.value}</p><p className="text-[9px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Daily chart (text bars) */}
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <h2 className="text-sm font-semibold">Impressões por dia</h2>
        {data.dailyData.map((d: any) => (
          <div key={d.date} className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground w-16 shrink-0">{d.date.slice(5)}</span>
            <div className="flex-1 h-4 bg-white/5 rounded overflow-hidden">
              <div className="h-full bg-primary/50 rounded" style={{ width: `${Math.min(100, d.impressions / 50)}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground w-12 text-right">{(d.impressions / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>

      {/* By province */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <h2 className="text-sm font-semibold">Por província</h2>
          {data.byProvince.map((p: any) => (
            <div key={p.name} className="flex items-center justify-between text-xs">
              <span>{p.name}</span><span className="text-muted-foreground">{p.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <h2 className="text-sm font-semibold">Por dispositivo</h2>
          {data.byDevice.map((d: any) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span>{d.name}</span><span className="text-muted-foreground">{d.percentage}%</span>
            </div>
          ))}
          <h2 className="text-sm font-semibold mt-3">Horários de pico</h2>
          {data.peakHours.map((h: any) => (
            <div key={h.hour} className="flex items-center justify-between text-xs">
              <span>{h.hour} WAT</span><span className="text-muted-foreground">{h.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
