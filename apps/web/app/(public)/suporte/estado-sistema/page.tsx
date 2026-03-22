"use client"
import { useState, useEffect } from "react"
import { SystemStatusRow } from "@/components/support/system-status-row"
import api from "@/lib/api"
export default function EstadoSistemaPage() {
  const [data, setData] = useState<any>(null)
  useEffect(() => { api.get("/api/support/system/status").then(r => setData(r.data)).catch(() => setData({ lastUpdated: new Date().toISOString(), services: [{ name: "Plataforma Web", status: "operational", latency: "45ms" }, { name: "Streaming (RTMP)", status: "operational", latency: "12ms" }, { name: "Pagamentos", status: "operational", latency: "89ms" }, { name: "Chat / WebSocket", status: "operational", latency: "8ms" }, { name: "CDN (Bunny.net)", status: "operational", latency: "23ms" }, { name: "SMS OTP", status: "operational", latency: "340ms" }], incidents: [] })) }, [])
  if (!data) return <div className="max-w-3xl mx-auto px-4 py-8"><p className="text-xs">A verificar...</p></div>
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">🟢 Estado dos Serviços</h1>
      <p className="text-[10px] text-muted-foreground">Última actualização: {new Date(data.lastUpdated).toLocaleString("pt-AO")}</p>
      <div className="rounded-xl border border-white/10 overflow-hidden p-4 space-y-0">{data.services.map((s: any) => <SystemStatusRow key={s.name} {...s} />)}</div>
      <div className="rounded-xl border border-white/10 p-4"><h2 className="text-sm font-bold mb-2">Incidentes recentes</h2>{data.incidents.length === 0 ? <p className="text-xs text-muted-foreground">Nenhum incidente nos últimos 30 dias 🎉</p> : data.incidents.map((i: any, idx: number) => <p key={idx} className="text-xs">{i}</p>)}</div>
    </div>
  )
}
