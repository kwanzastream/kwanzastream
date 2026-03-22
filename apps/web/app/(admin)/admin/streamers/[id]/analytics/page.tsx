"use client"
import { useParams } from "next/navigation"
export default function StreamerAnalyticsPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Analytics do Streamer</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Avg Viewers", v: "85" }, { l: "Horas/mês", v: "45h" }, { l: "Receita", v: "23.000 Kz" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
