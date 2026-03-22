"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
export default function AppAnalyticsPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get(`/api/developer/apps/${id}/analytics`).then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false)) }, [id])
  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!data) return <div className="text-center py-20 text-muted-foreground">Analytics indisponíveis</div>
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />App</Link>
      <h1 className="text-xl font-bold">Analytics da App</h1>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{data.totalRequests.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">Requests</p></div>
        <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{data.webhooksDelivered}</p><p className="text-[9px] text-muted-foreground">Webhooks</p></div>
        <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{data.errorRate}%</p><p className="text-[9px] text-muted-foreground">Erros</p></div>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-sm font-semibold">Requests diários (7 dias)</h2>
        {data.daily?.map((d: any) => (
          <div key={d.date} className="flex items-center gap-3"><span className="text-[10px] text-muted-foreground w-16">{d.date.slice(5)}</span>
            <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden"><div className="h-full bg-primary/50 rounded" style={{ width: `${Math.min(100, d.requests / 25)}%` }} /></div>
            <span className="text-[10px] text-muted-foreground w-12 text-right">{(d.requests / 1000).toFixed(1)}k</span></div>
        ))}
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-sm font-semibold">Por endpoint</h2>
        {data.byEndpoint?.map((e: any) => (
          <div key={e.path} className="flex items-center justify-between text-xs"><code className="text-muted-foreground">{e.path}</code><span>{e.pct}%</span></div>
        ))}
      </div>
    </div>
  )
}
