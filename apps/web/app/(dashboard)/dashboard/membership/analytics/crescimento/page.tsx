"use client"
import { SimpleLineChart, SimpleBarChart } from "@/components/analytics/analytics-components"
import Link from "next/link"
const GROWTH = [{label:"S1",value:75},{label:"S2",value:78},{label:"S3",value:82},{label:"S4",value:89}]
export default function CrescimentoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📈 Crescimento</h1>
      <div className="flex gap-1">{[{id:"mrr",l:"MRR",h:"/dashboard/membership/analytics/mrr"},{id:"churn",l:"Churn",h:"/dashboard/membership/analytics/churn-rate"},{id:"ltv",l:"LTV",h:"/dashboard/membership/analytics/lifetime-value"},{id:"growth",l:"Crescimento",h:"/dashboard/membership/analytics/crescimento"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "growth" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Membros activos por semana</p><SimpleLineChart data={GROWTH} color="hsl(142 76% 36%)" /></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Novos",v:"+7",c:"text-green-400"},{l:"Churned",v:"-3",c:"text-red-400"},{l:"Net",v:"+4",c:"text-primary"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className={`text-sm font-bold ${m.c}`}>{m.v}</p></div>)}</div>
      <p className="text-xs text-muted-foreground">Taxa de crescimento mensal: <strong className="text-primary">+8.5%</strong></p>
    </div>
  )
}
