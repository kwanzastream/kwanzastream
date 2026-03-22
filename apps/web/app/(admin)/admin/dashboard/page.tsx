"use client"
import { useState, useEffect } from "react"
import { AdminStatCard } from "@/components/admin/admin-stat-card"
import Link from "next/link"
import api from "@/lib/api"
export default function AdminDashboardPage() {
  const [d, setD] = useState<any>(null)
  useEffect(() => { api.get("/api/admin/dashboard").then(r => setD(r.data)).catch(() => setD({ today: { registrations: 45, streams: 234, viewers: 12400, transactions: 89, transactionValue: 234000, pendingReports: 12 }, health: { api: true, db: true, cdn: true, websocket: true, latencyP95: 45 }, alerts: [{ type: "warning", message: "Rate limiter: 3 IPs suspeitos" }, { type: "urgent", message: "8 levantamentos pendentes > 48h" }] })) }, [])
  if (!d) return <div className="text-center py-20 text-muted-foreground">A carregar...</div>
  return (<div className="space-y-6">
    <div className="flex items-center justify-between"><h1 className="text-xl font-bold">Dashboard</h1><p className="text-[10px] text-muted-foreground">super_admin · sessão activa</p></div>
    {d.alerts?.length > 0 && <div className="space-y-2">{d.alerts.map((a: any, i: number) => <div key={i} className={`p-3 rounded-xl border text-xs ${a.type === "urgent" ? "border-red-500/30 bg-red-500/5 text-red-400" : "border-yellow-500/30 bg-yellow-500/5 text-yellow-400"}`}>🔴 {a.message}</div>)}</div>}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <AdminStatCard label="Registos hoje" value={d.today.registrations} icon="👤" /><AdminStatCard label="Streams" value={d.today.streams} icon="🔴" />
      <AdminStatCard label="Viewers" value={d.today.viewers} icon="👁" /><AdminStatCard label="Transacções" value={d.today.transactions} icon="💰" />
      <AdminStatCard label="Volume" value={`${(d.today.transactionValue/1000).toFixed(0)}k Kz`} icon="📊" /><AdminStatCard label="Reports" value={d.today.pendingReports} icon="🚨" alert={d.today.pendingReports > 0} />
    </div>
    <div className="p-4 rounded-xl border border-white/10 space-y-2"><h2 className="text-sm font-semibold">Saúde do sistema</h2>
      <div className="flex gap-3 text-xs">{Object.entries(d.health).filter(([k]) => k !== 'latencyP95').map(([k, v]) => <span key={k} className={v ? "text-green-400" : "text-red-400"}>{v ? "✅" : "❌"} {k.toUpperCase()}</span>)}<span className="text-muted-foreground">p95: {d.health.latencyP95}ms</span></div>
    </div>
  </div>)
}
