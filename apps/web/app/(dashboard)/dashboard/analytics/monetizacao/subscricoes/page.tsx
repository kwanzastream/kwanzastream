"use client"
import { MetricCard, SimpleBarChart } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const TIERS = [{label:"Tier 1",value:45},{label:"Tier 2",value:12},{label:"Tier 3",value:3}]
const MONTHLY = [{label:"Jan",value:8},{label:"Fev",value:12},{label:"Mar",value:15}]
export default function SubscricoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/monetizacao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">⭐ Subscrições</h1></div>
      <div className="grid grid-cols-2 gap-3"><MetricCard icon="💰" label="MRR" value="12.600 Kz" change="+18%" positive /><MetricCard icon="👥" label="Subscritores activos" value="60" /><MetricCard icon="📉" label="Churn rate" value="5%" /><MetricCard icon="⏱" label="Lifetime médio" value="4.2 meses" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Por tier</p><SimpleBarChart data={TIERS} color="hsl(280 60% 60%)" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Novos subscritores/mês</p><SimpleBarChart data={MONTHLY} color="hsl(142 71% 45%)" /></div>
    </div>
  )
}
