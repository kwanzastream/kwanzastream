"use client"
import { SimpleLineChart } from "@/components/analytics/analytics-components"
import Link from "next/link"
const CHURN_DATA = [{label:"Dez",value:7},{label:"Jan",value:6},{label:"Fev",value:5.5},{label:"Mar",value:5}]
export default function ChurnRatePage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📉 Churn Rate</h1>
      <div className="flex gap-1">{[{id:"mrr",l:"MRR",h:"/dashboard/membership/analytics/mrr"},{id:"churn",l:"Churn",h:"/dashboard/membership/analytics/churn-rate"},{id:"ltv",l:"LTV",h:"/dashboard/membership/analytics/lifetime-value"},{id:"growth",l:"Crescimento",h:"/dashboard/membership/analytics/crescimento"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "churn" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="grid grid-cols-2 gap-3"><div className="p-3 rounded-xl border border-green-500/20 bg-green-500/5 text-center"><p className="text-[8px] text-muted-foreground">Este mês</p><p className="text-lg font-black text-green-400">5%</p></div><div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">Plataforma</p><p className="text-lg font-black text-muted-foreground">8%</p></div></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Churn por tier</p><SimpleLineChart data={CHURN_DATA} color="hsl(0 70% 50%)" /></div>
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/10"><p className="text-[9px]">💡 <strong>Insight:</strong> Tier 1 tem mais churn no 3º mês. Considere oferecer um desconto de retenção no mês 2.</p></div>
    </div>
  )
}
