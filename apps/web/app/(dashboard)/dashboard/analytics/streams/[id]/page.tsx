"use client"
import { useParams } from "next/navigation"
import { MetricCard, SimpleLineChart, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const VIEWERS = [{label:"0",value:45},{label:"30m",value:120},{label:"1h",value:189},{label:"1h30",value:234},{label:"2h",value:178},{label:"2h30",value:67}]
export default function StreamDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/streams"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">FIFA 26 — Torneio Angola</h1></div>
      <p className="text-[10px] text-muted-foreground">20 Mar 2026 · 2h 34min · ID: {id}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard icon="👁" label="Pico viewers" value="234" change="às 21:34" />
        <MetricCard icon="👤" label="Média viewers" value="89" />
        <MetricCard icon="💬" label="Mensagens chat" value="1.234" change="12.3 msg/min pico" />
        <MetricCard icon="👥" label="Novos seguidores" value="+12" />
      </div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Viewers ao longo do stream</p><SimpleLineChart data={VIEWERS} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Retenção</p><p className="text-[9px] text-muted-foreground mt-1">60% ficaram &gt; 30 min</p><p className="text-[9px] text-muted-foreground">Drop-off principal: 45 min</p></div>
        <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Monetização</p><p className="text-[9px] text-muted-foreground mt-1">💛 2.300 Kz (4 doadores)</p><p className="text-[9px] text-muted-foreground">⭐ 3 subscrições · 🎁 0 gifts</p></div>
      </div>
      <InsightCard icon="💡" text="Os viewers ficaram mais tempo quando activaste o poll às 21h15. Experimenta mais polls!" />
      <div className="flex gap-2"><Link href="/dashboard/content/vods"><Button variant="outline" size="sm" className="text-xs">Ver VOD</Button></Link><Link href="/dashboard/analytics/streams"><Button variant="outline" size="sm" className="text-xs">Ver clips (3)</Button></Link></div>
    </div>
  )
}
