"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { SimpleLineChart } from "@/components/analytics/analytics-components"
import Link from "next/link"
const MRR_DATA = [{label:"Dez",value:55000},{label:"Jan",value:60000},{label:"Fev",value:68000},{label:"Mar",value:72500}]
const TABS = [{id:"mrr",l:"MRR",h:"/dashboard/membership/analytics/mrr"},{id:"churn",l:"Churn",h:"/dashboard/membership/analytics/churn-rate"},{id:"ltv",l:"LTV",h:"/dashboard/membership/analytics/lifetime-value"},{id:"growth",l:"Crescimento",h:"/dashboard/membership/analytics/crescimento"}]
export default function MRRPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📊 Analytics — MRR</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "mrr" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="💰" label="MRR actual" value="72.500 Kz" sub="58.000 Kz líquido" /><RevenueMetricCard icon="📈" label="Crescimento" value="+6.6%" positive change="+4.500 Kz" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">MRR ao longo do tempo</p><SimpleLineChart data={MRR_DATA} color="hsl(45 93% 47%)" /></div>
      <div className="p-3 rounded-xl border border-white/10 text-xs space-y-1"><p className="font-bold">Breakdown:</p><div className="flex justify-between"><span className="text-green-400">New MRR (novos)</span><span className="font-bold">+5.000 Kz</span></div><div className="flex justify-between"><span className="text-blue-400">Expansion MRR (upgrades)</span><span className="font-bold">+2.500 Kz</span></div><div className="flex justify-between"><span className="text-red-400">Churned MRR (cancelamentos)</span><span className="font-bold">-3.000 Kz</span></div><hr className="border-white/10" /><div className="flex justify-between font-black"><span>Net New MRR</span><span className="text-primary">+4.500 Kz</span></div></div>
    </div>
  )
}
