"use client"
import { SimpleLineChart, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const RETENTION = [{label:"0m",value:100},{label:"5m",value:85},{label:"15m",value:72},{label:"30m",value:60},{label:"45m",value:45},{label:"1h",value:38},{label:"1h30",value:28},{label:"2h",value:20}]
export default function RetencaoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/audiencia"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Retenção</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Curva de retenção média</p><SimpleLineChart data={RETENTION} color="hsl(142 71% 45%)" /><p className="text-[8px] text-muted-foreground mt-2">60% ficam &gt; 30 min · Drop-off principal: 45 min</p></div>
      <InsightCard icon="📊" text="Streams de Gaming têm retenção média de 38% aos 60 min. Tu tens 38% — estás na média!" />
      <InsightCard icon="💡" text="O drop-off aos 45 min sugere que uma pausa ou mudança de actividade nesse momento pode ajudar." />
    </div>
  )
}
