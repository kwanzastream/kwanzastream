"use client"
import { SimpleBarChart, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const HOURS = [{label:"S1",value:8},{label:"S2",value:12},{label:"S3",value:10},{label:"S4",value:14}]
export default function HorasPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/crescimento"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">⏱ Horas Transmitidas</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Horas por semana</p><SimpleBarChart data={HOURS} color="hsl(45 93% 47%)" /></div>
      <InsightCard icon="📊" text="Criadores que transmitem 10h+/semana crescem 3x mais rápido. Tu transmites 10.5h/semana — estás no ritmo certo!" />
    </div>
  )
}
