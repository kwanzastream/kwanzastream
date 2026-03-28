"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "creator", label: "Creator" },
  { key: "valor", label: "Valor" },
  { key: "metodo", label: "Método" },
  { key: "data", label: "Data" },
  { key: "estado", label: "Estado" },
]

export default function AdminLevantamentosPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/admin/payments/withdrawals/pending")
      .then(r => {
        const ws = r.data?.withdrawals || r.data || []
        setData(ws.map((w: any) => ({
          id: `#W-${w.id?.slice(-4) || "???"}`,
          creator: w.user?.displayName || w.userId || "—",
          valor: w.amount ? `${(w.amount / 100).toLocaleString("pt-AO")} Kz` : "—",
          metodo: w.method || "—",
          data: w.createdAt ? new Date(w.createdAt).toLocaleDateString("pt-AO") : "—",
          estado: w.status === "pending" ? "Pendente" : w.status === "approved" ? "Aprovado" : "Processado",
        })))
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-40"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>

  return (
    <AdminPage
      title="Levantamentos Pendentes"
      description="Pedidos de levantamento aguardando aprovação."
      icon="💸"
      columns={COLUMNS}
      data={data}
      actions={[{ label: "Processar seleccionados", variant: "primary" }]}
    />
  )
}
