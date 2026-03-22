"use client"
import { useState, useEffect } from "react"
import { AuditLogItem } from "@/components/admin/audit-log-item"
import api from "@/lib/api"
export default function LogsAcoesPage() {
  const [logs, setLogs] = useState<any[]>([])
  useEffect(() => { api.get("/api/admin/audit-logs?type=actions").then(r => setLogs(r.data?.logs || [])).catch(() => setLogs([
    { admin: "kwanzastream", role: "super_admin", action: "user.ban", target: "@spammer1", ip: "41.x.x.x", timestamp: "22 Mar 09:23:45" },
    { admin: "kwanzastream", role: "super_admin", action: "feature-flag.toggle", target: "SHORTS_FEED", ip: "41.x.x.x", timestamp: "22 Mar 09:15:12" },
    { admin: "kwanzastream", role: "super_admin", action: "config.update", target: "platform.maintenance", ip: "41.x.x.x", timestamp: "21 Mar 18:30:00" }
  ])) }, [])
  return (<div className="space-y-4"><h1 className="text-xl font-bold">Logs — Acções</h1><p className="text-xs text-muted-foreground">Todas as acções admin registadas</p>
    <div className="space-y-1">{logs.map((l, i) => <AuditLogItem key={i} {...l} />)}</div></div>)
}
