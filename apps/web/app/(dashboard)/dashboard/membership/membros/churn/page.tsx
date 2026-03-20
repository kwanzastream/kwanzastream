"use client"
import { ChurnRiskCard } from "@/components/membership/membership-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ChurnPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/membros/activos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Churn (60 dias)</h1></div>
      <div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-center"><p className="text-xs font-bold text-yellow-400">Taxa de churn: 5%</p><p className="text-[8px] text-muted-foreground">Plataforma: 8% — estás abaixo da média ✅</p></div>
      <ChurnRiskCard username="@exmembro1" tier={2} months={3} cancelDate="20 Mar" reason="Dificuldades financeiras" />
      <ChurnRiskCard username="@exmembro2" tier={1} months={1} cancelDate="15 Mar" />
    </div>
  )
}
