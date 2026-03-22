"use client"
interface SystemStatusRowProps { name: string; status: "operational" | "degraded" | "down"; latency?: string }
export function SystemStatusRow({ name, status, latency }: SystemStatusRowProps) {
  const colors = { operational: "text-green-400", degraded: "text-yellow-400", down: "text-red-400" }
  const icons = { operational: "🟢", degraded: "🟡", down: "🔴" }
  const labels = { operational: "Operacional", degraded: "Degradado", down: "Fora de serviço" }
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <div className="flex items-center gap-2"><span>{icons[status]}</span><span className="text-xs">{name}</span></div>
      <div className="flex items-center gap-2"><span className={`text-[10px] ${colors[status]}`}>{labels[status]}</span>{latency && <span className="text-[9px] text-muted-foreground">{latency}</span>}</div>
    </div>
  )
}
