"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
export default function RaidRecebidosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⚔️ Raids Recebidos</h1>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="⚔️" label="Raids esta semana" value="3" /><RevenueMetricCard icon="👁" label="Viewers trazidos" value="156" /></div>
      {[{ch:"@canal-origem1",viewers:45,date:"19 Mar",cat:"Gaming"},{ch:"@canal-origem2",viewers:67,date:"17 Mar",cat:"Just Talking"},{ch:"@canal-origem3",viewers:44,date:"15 Mar",cat:"Gaming"}].map(r => <div key={r.ch} className="flex items-center justify-between p-2.5 rounded-xl border border-white/10"><div><p className="text-xs font-bold">{r.ch}</p><p className="text-[8px] text-muted-foreground">{r.cat} · {r.date}</p></div><span className="text-[9px] font-bold">{r.viewers} viewers</span></div>)}
    </div>
  )
}
