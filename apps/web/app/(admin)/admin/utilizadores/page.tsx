"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import api from "@/lib/api"
export default function UtilizadoresPage() {
  const [users, setUsers] = useState<any[]>([]); const [total, setTotal] = useState(0)
  useEffect(() => { api.get("/api/admin/users").then(r => { setUsers(r.data.users || []); setTotal(r.data.total || 0) }).catch(() => {}) }, [])
  return (<div className="space-y-4"><div className="flex items-center justify-between"><h1 className="text-xl font-bold">Utilizadores</h1><span className="text-xs text-muted-foreground">{total} total</span></div>
    <div className="flex gap-2 flex-wrap">{["todos","novos","activos","suspensos","banidos","verificados","buscar"].map(f => <Link key={f} href={`/admin/utilizadores/${f}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] hover:border-primary/20 capitalize">{f}</Link>)}</div>
    <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-xs"><thead><tr className="border-b border-white/5"><th className="px-3 py-2 text-left text-[10px]">Username</th><th className="px-3 py-2 text-left text-[10px]">Email</th><th className="px-3 py-2 text-left text-[10px]">Role</th><th className="px-3 py-2 text-left text-[10px]">Registo</th></tr></thead>
    <tbody>{users.map(u => <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]"><td className="px-3 py-2"><Link href={`/admin/utilizadores/${u.id}`} className="text-primary hover:underline">@{u.username}</Link></td><td className="px-3 py-2 text-muted-foreground">{u.email}</td><td className="px-3 py-2">{u.role}</td><td className="px-3 py-2 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString("pt-AO")}</td></tr>)}</tbody></table></div>
  </div>)
}
