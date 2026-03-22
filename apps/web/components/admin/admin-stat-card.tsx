"use client"
interface AdminStatCardProps { label: string; value: string | number; icon?: string; change?: string; alert?: boolean }
export function AdminStatCard({ label, value, icon, change, alert }: AdminStatCardProps) {
  return (
    <div className={`p-4 rounded-xl border ${alert ? "border-red-500/30 bg-red-500/5" : "border-white/10"} space-y-1`}>
      {icon && <span className="text-xl">{icon}</span>}
      <p className="text-lg font-bold">{typeof value === "number" ? value.toLocaleString() : value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      {change && <p className={`text-[9px] ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{change}</p>}
    </div>
  )
}
