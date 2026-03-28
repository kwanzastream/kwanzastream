"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "role", label: "Cargo" },
  { key: "lastLogin", label: "Último Login" },
  { key: "status", label: "Estado" },
]

export default function AdminAdminsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/admin/admins")
      .then(r => {
        const admins = r.data?.admins || r.data || []
        setData(admins.map((a: any) => ({
          name: a.displayName || a.name || "—",
          email: a.email || "—",
          role: a.role || "admin",
          lastLogin: a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleString("pt-AO") : "Nunca",
          status: a.isActive ? "Activo" : "Inactivo",
        })))
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-40"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>

  return (
    <AdminPage
      title="Gestão de Admins"
      description="Administradores com acesso ao painel de controlo."
      icon="👑"
      columns={COLUMNS}
      data={data}
      actions={[{ label: "+ Convidar Admin", variant: "primary" }]}
    />
  )
}