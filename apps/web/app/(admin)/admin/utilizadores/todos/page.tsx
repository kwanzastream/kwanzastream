"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import api from "@/lib/api"
export default function TodosUtilizadoresPage() {
  const [users, setUsers] = useState<any[]>([]); const [page, setPage] = useState(1); const [total, setTotal] = useState(0)
  useEffect(() => { api.get(`/api/admin/users?page=${page}`).then(r => { setUsers(r.data.users || []); setTotal(r.data.total || 0) }).catch(() => {}) }, [page])
  return (<div className="space-y-4"><h1 className="text-xl font-bold">Todos os Utilizadores</h1><p className="text-xs text-muted-foreground">{total} utilizadores</p>
    <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-xs"><thead><tr className="border-b border-white/5"><th className="px-3 py-2 text-left text-[10px]">Username</th><th className="px-3 py-2 text-left text-[10px]">Email</th><th className="px-3 py-2 text-left text-[10px]">Role</th><th className="px-3 py-2 text-left text-[10px]">Verificado</th><th className="px-3 py-2 text-left text-[10px]">Data</th></tr></thead>
    <tbody>{users.map(u => <tr key={u.id} className="border-b border-white/5"><td className="px-3 py-2"><Link href={`/admin/utilizadores/${u.id}`} className="text-primary">@{u.username}</Link></td><td className="px-3 py-2 text-muted-foreground">{u.email}</td><td className="px-3 py-2">{u.role}</td><td className="px-3 py-2">{u.isVerified ? "✅" : "❌"}</td><td className="px-3 py-2 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString("pt-AO")}</td></tr>)}</tbody></table></div>
    <div className="flex gap-2 justify-center">{page > 1 && <button onClick={() => setPage(p => p-1)} className="px-3 py-1 rounded-lg border border-white/10 text-xs">← Anterior</button>}<button onClick={() => setPage(p => p+1)} className="px-3 py-1 rounded-lg border border-white/10 text-xs">Próximo →</button></div>
  </div>)
}
