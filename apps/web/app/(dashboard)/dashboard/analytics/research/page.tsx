"use client"
import { HeatmapGrid, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const HEATMAP = [[1,1,1,1,1,2,2],[2,2,2,2,2,3,4],[3,3,3,3,4,5,5],[4,5,5,5,6,7,8],[7,7,7,7,9,10,10],[8,8,8,8,10,10,9],[5,5,5,5,7,8,7],[2,2,2,2,3,3,3]]
export default function ResearchPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Research Heatmap</h1></div>
      <p className="text-xs text-muted-foreground">Melhores horários para transmitir na plataforma (WAT).</p>
      <HeatmapGrid data={HEATMAP} />
      <div className="flex items-center gap-2"><span className="text-[8px] text-muted-foreground">Menos viewers</span><div className="flex gap-0.5">{[0.1,0.3,0.5,0.7,1].map(o => <div key={o} className="w-4 h-4 rounded-sm" style={{background:`hsl(var(--primary) / ${o})`}} />)}</div><span className="text-[8px] text-muted-foreground">Mais viewers</span></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Insights</h2>
        <InsightCard icon="🎮" text="A tua categoria (Gaming) tem mais viewers às sextas 20h–22h WAT." />
        <InsightCard icon="📊" text="Quarta às 21h tem 40% menos concorrência que sexta." />
        <InsightCard icon="⏱" text="Viewers angolanos preferem streams de 1–2h." />
      </div>
      <div className="flex gap-2">{["Gaming","Música","Comédia","Desporto"].map(c => <Link key={c} href={`/dashboard/analytics/research/${c.toLowerCase()}`}><Button variant="outline" size="sm" className="text-[9px]">{c}</Button></Link>)}</div>
    </div>
  )
}
