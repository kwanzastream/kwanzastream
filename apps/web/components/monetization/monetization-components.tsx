"use client"
import { Button } from "@/components/ui/button"

export function RevenueMetricCard({ icon, label, value, change, positive, sub }: { icon: string; label: string; value: string; change?: string; positive?: boolean; sub?: string }) {
  return (
    <div className="p-3 rounded-xl border border-white/10"><p className="text-lg">{icon}</p><p className="text-[8px] text-muted-foreground">{label}</p><p className="text-sm font-black">{value}</p>{change && <p className={`text-[8px] font-bold ${positive ? "text-green-400" : "text-red-400"}`}>{change}</p>}{sub && <p className="text-[7px] text-muted-foreground">{sub}</p>}</div>
  )
}

export function PayoutStatusCard({ id, date, gross, fee, net, method, status }: { id: string; date: string; gross: string; fee: string; net: string; method: string; status: "pending" | "processing" | "done" | "failed" }) {
  const sm = { pending: { l: "Pendente", c: "text-yellow-400 bg-yellow-500/10" }, processing: { l: "Em processamento", c: "text-blue-400 bg-blue-500/10" }, done: { l: "Concluído", c: "text-green-400 bg-green-500/10" }, failed: { l: "Falhado", c: "text-red-400 bg-red-500/10" } }
  const s = sm[status]
  return (
    <div className="p-3 rounded-xl border border-white/10">
      <div className="flex items-center justify-between"><p className="text-xs font-bold">{date}</p><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${s.c}`}>{s.l}</span></div>
      <div className="flex justify-between mt-1 text-[9px]"><span className="text-muted-foreground">Bruto: {gross}</span><span className="text-muted-foreground">Comissão: {fee}</span><span className="font-bold">Líquido: {net}</span></div>
      <p className="text-[8px] text-muted-foreground mt-0.5">{method}</p>
    </div>
  )
}

export function OrderRow({ product, buyer, value, date, status, actions }: { product: string; buyer: string; value: string; date: string; status: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10">
      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-sm shrink-0">📦</div>
      <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{product}</p><p className="text-[8px] text-muted-foreground">{buyer} · {value} · {date}</p><p className="text-[8px]">{status}</p></div>
      {actions && <div className="flex gap-1 shrink-0">{actions}</div>}
    </div>
  )
}

export function DropProgressCard({ brand, prize, progress, total, revenue }: { brand: string; prize: string; progress: number; total: number; revenue: string }) {
  return (
    <div className="p-3 rounded-xl border border-white/10">
      <div className="flex items-center justify-between"><p className="text-xs font-bold">{brand}</p><span className="text-[9px] text-primary font-bold">{revenue}</span></div>
      <p className="text-[9px] text-muted-foreground">{prize}</p>
      <div className="mt-2"><div className="h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${(progress / total) * 100}%` }} /></div><p className="text-[8px] text-muted-foreground mt-0.5">{progress}/{total} viewers completaram</p></div>
    </div>
  )
}
