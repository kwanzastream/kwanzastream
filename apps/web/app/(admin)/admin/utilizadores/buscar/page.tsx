"use client"
import { useState } from "react"
import Link from "next/link"
import api from "@/lib/api"
export default function BuscarUtilizadoresPage() {
  const [q, setQ] = useState(""); const [results, setResults] = useState<any[]>([])
  const search = () => { api.get(`/api/admin/users?search=${q}`).then(r => setResults(r.data.users || [])).catch(() => {}) }
  return (<div className="space-y-4"><h1 className="text-xl font-bold">Buscar Utilizadores</h1>
    <div className="flex gap-2"><input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="Username, email..." className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:outline-none focus:border-primary" /><button onClick={search} className="px-4 py-2 rounded-lg bg-primary text-white text-xs">Buscar</button></div>
    <div className="space-y-2">{results.map(u => <Link key={u.id} href={`/admin/utilizadores/${u.id}`} className="block p-3 rounded-xl border border-white/10 hover:border-primary/20"><p className="text-xs font-semibold">@{u.username}</p><p className="text-[10px] text-muted-foreground">{u.email} · {u.role}</p></Link>)}</div>
  </div>)
}
