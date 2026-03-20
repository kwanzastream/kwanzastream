"use client"
import { MetricCard, SimpleLineChart, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CrescimentoHubPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5" />Crescimento</h1></div>
      <div className="grid grid-cols-3 gap-3"><MetricCard icon="👥" label="Seguidores" value="+89" change="+23%" positive /><MetricCard icon="👁" label="Viewers" value="1.234" change="+12%" positive /><MetricCard icon="⏱" label="Horas" value="42h" change="+5%" positive /></div>
      <div className="space-y-2">
        <Link href="/dashboard/analytics/crescimento/seguidores" className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-lg">👥</span><div><p className="text-xs font-bold">Seguidores</p><p className="text-[8px] text-muted-foreground">Crescimento e tendência</p></div></Link>
        <Link href="/dashboard/analytics/crescimento/viewers" className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-lg">👁</span><div><p className="text-xs font-bold">Viewers</p><p className="text-[8px] text-muted-foreground">Novos vs recorrentes</p></div></Link>
        <Link href="/dashboard/analytics/crescimento/horas" className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-lg">⏱</span><div><p className="text-xs font-bold">Horas transmitidas</p><p className="text-[8px] text-muted-foreground">Correlação com crescimento</p></div></Link>
      </div>
    </div>
  )
}
