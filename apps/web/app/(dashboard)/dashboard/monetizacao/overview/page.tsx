"use client"
import { useState } from "react"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { SimpleLineChart } from "@/components/analytics/analytics-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const REVENUE = [{label:"S1",value:32000},{label:"S2",value:36000},{label:"S3",value:41000},{label:"S4",value:45600}]
const TABS = [{id:"overview",l:"Overview",h:"/dashboard/monetizacao/overview"},{id:"salos",l:"Salos",h:"/dashboard/monetizacao/salos"},{id:"subs",l:"Subscrições",h:"/dashboard/monetizacao/subscricoes"},{id:"ads",l:"Ads",h:"/dashboard/monetizacao/ads/overview"},{id:"drops",l:"Drops",h:"/dashboard/monetizacao/drops/activos"},{id:"campanhas",l:"Campanhas",h:"/dashboard/monetizacao/campanhas/activas"},{id:"patrocinios",l:"Patrocínios",h:"/dashboard/monetizacao/patrocinios/candidaturas"},{id:"loja",l:"Loja",h:"/dashboard/monetizacao/loja/overview"},{id:"payouts",l:"Payouts",h:"/dashboard/monetizacao/payouts/historico"},{id:"impostos",l:"Impostos",h:"/dashboard/monetizacao/impostos/documentos"},{id:"hype",l:"Hype Train",h:"/dashboard/monetizacao/hype-train/configurar"},{id:"gifts",l:"Gifts",h:"/dashboard/monetizacao/gifts/historico"}]
export default function OverviewPage() {
  const [period, setPeriod] = useState("30d")
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-lg font-black">💰 Monetização</h1>
      <div className="flex gap-1 overflow-x-auto pb-1">{TABS.map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "overview" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{t.l}</button></Link>)}</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"><RevenueMetricCard icon="💰" label="Receita Total" value="45.600 Kz" change="+12%" positive /><RevenueMetricCard icon="💛" label="Salos" value="28.000 Kz" change="+8%" positive /><RevenueMetricCard icon="⭐" label="Subscritores" value="89" change="-2" /><RevenueMetricCard icon="🛒" label="Loja" value="5.000 Kz" change="+45%" positive /></div>
      <div className="p-4 rounded-xl border border-white/10"><div className="flex items-center justify-between mb-3"><p className="text-[10px] font-bold">Receita ao longo do tempo</p><div className="flex gap-1">{["30d","90d","1y"].map(p => <button key={p} onClick={() => setPeriod(p)} className={`px-2 py-0.5 rounded text-[8px] ${period === p ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{p}</button>)}</div></div><SimpleLineChart data={REVENUE} color="hsl(45 93% 47%)" /></div>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5"><p className="text-[10px] font-bold">Próximo payout</p><p className="text-sm font-black">Saldo: 38.500 Kz <span className="text-xs text-muted-foreground font-normal">/ 50.000 Kz (auto)</span></p><div className="h-1.5 rounded-full bg-white/10 mt-1"><div className="h-1.5 rounded-full bg-primary" style={{width:"77%"}} /></div><Link href="/dashboard/monetizacao/payouts/solicitar"><Button size="sm" className="mt-2 text-xs">Solicitar payout agora</Button></Link></div>
    </div>
  )
}
