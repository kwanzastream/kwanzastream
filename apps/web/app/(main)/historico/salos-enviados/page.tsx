"use client"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
const data = [{ channel: "canal1", amount: 500, message: "Boa stream!", date: "20 Mar" }, { channel: "canal2", amount: 200, message: "", date: "19 Mar" }, { channel: "canal1", amount: 1000, message: "🔥🔥🔥", date: "18 Mar" }]
export default function SalosEnviadosPage() {
  const total = data.reduce((s, d) => s + d.amount, 0)
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Salos enviados</h2><span className="text-xs text-primary font-bold">{total.toLocaleString()} Kz</span></div>
      {data.length === 0 ? <HistoryEmptyState type="salos" /> : <div className="space-y-2">{data.map((d, i) => <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">👤</div><div><p className="text-xs font-semibold">@{d.channel}</p>{d.message && <p className="text-[10px] text-muted-foreground">"{d.message}"</p>}</div></div><div className="text-right"><p className="text-xs font-bold text-primary">{d.amount} Salos</p><p className="text-[9px] text-muted-foreground">{d.date}</p></div></div>)}</div>}
    </div>
  )
}
