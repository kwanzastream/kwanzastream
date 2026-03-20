"use client"
import Link from "next/link"
export default function LTVPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⏳ Lifetime Value</h1>
      <div className="flex gap-1">{[{id:"mrr",l:"MRR",h:"/dashboard/membership/analytics/mrr"},{id:"churn",l:"Churn",h:"/dashboard/membership/analytics/churn-rate"},{id:"ltv",l:"LTV",h:"/dashboard/membership/analytics/lifetime-value"},{id:"growth",l:"Crescimento",h:"/dashboard/membership/analytics/crescimento"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "ltv" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      {[{tier:"Médio",months:"4.2",value:"2.100 Kz",icon:"📊"},{tier:"Tier 1",months:"4.2",value:"2.100 Kz",icon:"🥉"},{tier:"Tier 2",months:"5.8",value:"8.700 Kz",icon:"🥈"},{tier:"Tier 3",months:"7.1",value:"21.300 Kz",icon:"🥇"}].map(l => <div key={l.tier} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><span className="text-lg">{l.icon}</span><div className="flex-1"><p className="text-xs font-bold">{l.tier}</p><p className="text-[8px] text-muted-foreground">{l.months} meses média</p></div><span className="text-xs font-black text-primary">{l.value}</span></div>)}
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/10"><p className="text-[9px]">💡 <strong>Insight:</strong> Membros que fazem upgrade nos primeiros 2 meses têm LTV 3× maior.</p></div>
    </div>
  )
}
