"use client"
export default function DashboardSaudePage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Saúde do Sistema</h1>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[{ name: "API", status: true, latency: "45ms" }, { name: "Database", status: true, latency: "12ms" }, { name: "CDN", status: true, latency: "8ms" }, { name: "WebSocket", status: true, latency: "3ms" }, { name: "RTMP Ingest", status: true, latency: "23ms" }, { name: "Redis Cache", status: true, latency: "2ms" }, { name: "Email (SMTP)", status: true, latency: "340ms" }, { name: "SMS (AT)", status: true, latency: "890ms" }].map(s => (
    <div key={s.name} className="p-3 rounded-xl border border-white/10 space-y-1"><p className="text-xs font-semibold">{s.status ? "✅" : "❌"} {s.name}</p><p className="text-[9px] text-muted-foreground">Latência: {s.latency}</p></div>
  ))}</div></div>) }
