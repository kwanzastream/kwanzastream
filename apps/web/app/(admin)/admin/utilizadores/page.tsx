"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [
  { key: "displayName", label: "Nome" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "role", label: "Papel" },
  { key: "status", label: "Estado" },
  { key: "createdAt", label: "Registo" },
]

export default function AdminUsersPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/admin/users")
      .then(r => {
        const users = r.data?.users || r.data || []
        setData(users.map((u: any) => ({
          displayName: u.displayName || u.name || "—",
          username: u.username || "—",
          email: u.email || "—",
          role: u.role || "viewer",
          status: u.isBanned ? "Banido" : u.isSuspended ? "Suspenso" : u.isVerified ? "Verificado" : "Activo",
          createdAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString("pt-AO") : "—",
        })))
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-40"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>

  return (
    <AdminPage
      title="Utilizadores"
      description="Todos os utilizadores registados na plataforma."
      icon="👥"
      columns={COLUMNS}
      data={data}
      actions={[{ label: "Exportar CSV", variant: "outline" }]}
    />
  )
}
