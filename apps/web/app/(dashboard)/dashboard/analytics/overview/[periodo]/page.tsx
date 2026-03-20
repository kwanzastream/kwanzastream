"use client"
import { useParams } from "next/navigation"
import { MetricCard, SimpleLineChart } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const LABELS: Record<string,string> = {"7d":"Últimos 7 dias","30d":"Últimos 30 dias","90d":"Últimos 90 dias","1y":"Último ano"}
const DATA: Record<string,{label:string;value:number}[]> = {"7d":[{label:"Seg",value:89},{label:"Ter",value:120},{label:"Qua",value:95},{label:"Qui",value:145},{label:"Sex",value:234},{label:"Sáb",value:189},{label:"Dom",value:156}],"30d":[{label:"S1",value:450},{label:"S2",value:520},{label:"S3",value:480},{label:"S4",value:610}],"90d":[{label:"Jan",value:1200},{label:"Fev",value:1500},{label:"Mar",value:1800}],"1y":[{label:"T1",value:3500},{label:"T2",value:4200},{label:"T3",value:5100},{label:"T4",value:6000}]}
export default function PeriodoPage() {
  const { periodo } = useParams()
  const p = periodo as string
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-black">{LABELS[p] || p}</h1></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard icon="👁" label="Viewers" value="1.234" change="+12%" positive />
        <MetricCard icon="⏱" label="Horas" value="42h" change="+5%" positive />
        <MetricCard icon="💛" label="Salos" value="15.600 Kz" />
        <MetricCard icon="👥" label="Seguidores" value="+89" change="+23%" positive />
      </div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Viewers — {LABELS[p]}</p><SimpleLineChart data={DATA[p] || DATA["7d"]} /></div>
    </div>
  )
}
