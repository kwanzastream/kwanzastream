"use client"

interface StatusIndicatorProps { status: "operational" | "degraded" | "outage"; label: string; uptime?: string }

const STATUS_MAP = { operational: { icon: "🟢", color: "text-green-400" }, degraded: { icon: "🟡", color: "text-yellow-400" }, outage: { icon: "🔴", color: "text-red-400" } }

export function StatusIndicator({ status, label, uptime }: StatusIndicatorProps) {
  const s = STATUS_MAP[status]
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-2"><span>{s.icon}</span><span className="text-xs">{label}</span></div>
      {uptime && <span className="text-[10px] text-muted-foreground">{uptime}</span>}
    </div>
  )
}
