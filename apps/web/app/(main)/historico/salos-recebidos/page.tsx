"use client"
import { HistoryNav } from "@/components/history/history-nav"
import Link from "next/link"
const data = [{ from: "fan1", amount: 1000, message: "Continua assim!", date: "há 2h" }, { from: "fan2", amount: 500, message: "🇦🇴", date: "há 3h" }]
export default function SalosRecebidosPage() {
  const total = data.reduce((s, d) => s + d.amount, 0)
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Salos recebidos</h2><span className="text-xs text-green-400 font-bold">{total.toLocaleString()} Kz</span></div>
      <div className="space-y-2">{data.map((d, i) => <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-xs">👤</div><div><p className="text-xs font-semibold">@{d.from}</p>{d.message && <p className="text-[10px] text-muted-foreground">"{d.message}"</p>}</div></div><div className="text-right"><p className="text-xs font-bold text-green-400">+{d.amount} Salos</p><p className="text-[9px] text-muted-foreground">{d.date}</p></div></div>)}</div>
      <Link href="/dashboard/analytics/monetizacao/salos" className="block text-center text-[10px] text-primary hover:underline">Ver analytics completos →</Link>
    </div>
  )
}
