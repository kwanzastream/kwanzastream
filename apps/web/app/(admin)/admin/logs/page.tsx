"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [
  { key: "timestamp", label: "Timestamp" },
  { key: "action", label: "Acção" },
  { key: "actor", label: "Actor" },
  { key: "target", label: "Alvo" },
  { key: "ip", label: "IP" },
  { key: "status", label: "Estado" },
]

export default function AdminLogsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/admin/audit")
      .then(r => {
        const logs = r.data?.logs || r.data || []
        setData(logs.map((l: any) => ({
          timestamp: l.createdAt ? new Date(l.createdAt).toLocaleString("pt-AO") : "—",
          action: l.action || l.type || "—",
          actor: l.actor?.username || l.adminId || "system",
          target: l.target || l.targetId || "—",
          ip: l.ip || "—",
          status: l.status || "OK",
        })))
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-40"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>

  return (
    <AdminPage
      title="Logs de Auditoria"
      description="Registo de todas as acções administrativas na plataforma."
      icon="📋"
      columns={COLUMNS}
      data={data}
      actions={[{ label: "Exportar logs", variant: "outline" }]}
    />
  )
}
