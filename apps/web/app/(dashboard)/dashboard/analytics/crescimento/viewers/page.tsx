"use client"
import { SimpleLineChart, SimpleBarChart, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const VIEWERS = [{label:"S1",value:780},{label:"S2",value:890},{label:"S3",value:1050},{label:"S4",value:1234}]
const MIX = [{label:"Novos",value:45},{label:"Recorrentes",value:55}]
export default function ViewersPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/crescimento"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">👁 Viewers</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Viewers únicos/semana</p><SimpleLineChart data={VIEWERS} /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Novos vs recorrentes (%)</p><SimpleBarChart data={MIX} color="hsl(200 60% 50%)" /></div>
      <InsightCard icon="🔄" text="55% dos viewers são recorrentes — boa retenção de audiência!" />
    </div>
  )
}
