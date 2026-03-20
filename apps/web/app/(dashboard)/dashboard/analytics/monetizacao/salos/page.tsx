"use client"
import { MetricCard, SimpleLineChart } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SALOS_DATA = [{label:"Seg",value:3200},{label:"Ter",value:4500},{label:"Qua",value:2800},{label:"Qui",value:5100},{label:"Sex",value:6200},{label:"Sáb",value:4800},{label:"Dom",value:3400}]
const TOP_DONORS = [{name:"@superfan",amount:"8.500 Kz",count:12},{name:"@generoso",amount:"5.200 Kz",count:8},{name:"@apoiador",amount:"3.100 Kz",count:5}]
export default function SalosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/monetizacao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">💛 Salos</h1></div>
      <div className="grid grid-cols-2 gap-3"><MetricCard icon="💛" label="Total (7d)" value="28.000 Kz" change="+15%" positive /><MetricCard icon="👤" label="Média por viewer" value="312 Kz" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Salos por dia (Kz)</p><SimpleLineChart data={SALOS_DATA} color="hsl(45 93% 47%)" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Top doadores</p>{TOP_DONORS.map(d => <div key={d.name} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><span className="text-xs font-bold">{d.name}</span><span className="text-[9px] text-muted-foreground">{d.amount} · {d.count} doações</span></div>)}</div>
    </div>
  )
}
