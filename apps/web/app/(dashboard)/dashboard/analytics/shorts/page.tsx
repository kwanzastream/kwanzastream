"use client"
import { MetricCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SHORTS = [{title:"Top 5 momentos da semana",views:3400,completion:78,follows:18},{title:"Golo de bicicleta",views:2100,completion:85,follows:9},{title:"Dica rápida: OBS",views:1200,completion:92,follows:5}]
export default function ShortsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">📱 Analytics de Shorts</h1></div>
      <div className="grid grid-cols-2 gap-3"><MetricCard icon="👁" label="Views totais" value="6.700" change="+45%" positive /><MetricCard icon="✅" label="Conclusão média" value="85%" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Top shorts</p>{SHORTS.map(s => <div key={s.title} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><div><p className="text-xs font-bold">{s.title}</p><p className="text-[8px] text-muted-foreground">👁 {s.views.toLocaleString()} · {s.completion}% conclusão</p></div><span className="text-[9px] text-green-400">+{s.follows} seg.</span></div>)}</div>
    </div>
  )
}
