"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [
  { key: "username", label: "Username" },
  { key: "nome", label: "Nome" },
  { key: "tipo", label: "Tipo" },
  { key: "estado", label: "Estado Pedido" },
  { key: "data", label: "Data" },
]

export default function AdminCandidaturasPendentesPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch both affiliate and partner applications
    Promise.allSettled([
      api.get("/api/admin/streamers/applications/affiliate"),
      api.get("/api/admin/streamers/applications/partner"),
    ]).then(([affiliateRes, partnerRes]) => {
      const affiliates = affiliateRes.status === "fulfilled"
        ? (affiliateRes.value.data?.applications || []).map((a: any) => ({ ...a, tipo: "Afiliado" }))
        : []
      const partners = partnerRes.status === "fulfilled"
        ? (partnerRes.value.data?.applications || []).map((a: any) => ({ ...a, tipo: "Partner" }))
        : []
      const all = [...affiliates, ...partners]
      setData(all.map((a: any) => ({
        username: a.user?.username || "—",
        nome: a.user?.displayName || "—",
        tipo: a.tipo,
        estado: a.status === "pending" ? "Pendente" : a.status === "approved" ? "Aprovado" : "Rejeitado",
        data: a.createdAt ? new Date(a.createdAt).toLocaleDateString("pt-AO") : "—",
      })))
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-40"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>

  return (
    <AdminPage
      title="Candidaturas de Streamers"
      description="Candidaturas pendentes ao programa de Afiliados e Partner."
      icon="🎙️"
      columns={COLUMNS}
      data={data}
      actions={[{ label: "Aprovar seleccionados", variant: "primary" }, { label: "Rejeitar", variant: "outline" }]}
    />
  )
}
