"use client"
import { AdminStatCard } from "@/components/admin/admin-stat-card"
export default function DashboardAlertsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Alertas Activos</h1>
  <div className="space-y-2">{[{ type: "urgent", msg: "8 levantamentos pendentes > 48h", time: "há 2h" }, { type: "warning", msg: "Rate limiter: 3 IPs suspeitos (41.x.x.x)", time: "há 45min" }, { type: "info", msg: "CDN cache hit ratio abaixo de 90%", time: "há 3h" }].map((a, i) => (
    <div key={i} className={`p-3 rounded-xl border text-xs ${a.type === "urgent" ? "border-red-500/30 bg-red-500/5" : a.type === "warning" ? "border-yellow-500/30 bg-yellow-500/5" : "border-blue-500/30 bg-blue-500/5"}`}><p>{a.msg}</p><p className="text-[9px] text-muted-foreground mt-1">{a.time}</p></div>
  ))}</div></div>) }
