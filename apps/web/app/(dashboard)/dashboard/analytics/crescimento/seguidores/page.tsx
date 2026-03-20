"use client"
import { SimpleLineChart, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const FOLLOWERS = [{label:"S1",value:420},{label:"S2",value:460},{label:"S3",value:510},{label:"S4",value:567}]
const DAILY = [{label:"Seg",value:12},{label:"Ter",value:15},{label:"Qua",value:8},{label:"Qui",value:18},{label:"Sex",value:22},{label:"Sáb",value:14},{label:"Dom",value:10}]
export default function SeguidoresPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/crescimento"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">👥 Seguidores</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Crescimento acumulado</p><SimpleLineChart data={FOLLOWERS} color="hsl(142 71% 45%)" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Ganhos por dia (últimos 7d)</p><SimpleLineChart data={DAILY} /></div>
      <InsightCard icon="📈" text="Taxa de crescimento: +23%/semana. Os streams de sexta geram mais follows." />
    </div>
  )
}
