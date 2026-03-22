"use client"
import { useState } from "react"
export default function LogsPesquisarPage() {
  const [q, setQ] = useState(""); const [results, setResults] = useState<any[]>([])
  const search = () => { setResults([{ admin: "kwanzastream", action: "user.ban", target: "@spammer1", ip: "41.x.x.x", time: "22 Mar 09:23" }]) }
  return (<div className="space-y-4"><h1 className="text-xl font-bold">Pesquisar Logs</h1>
    <div className="flex gap-2"><input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="Admin, acção, IP..." className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm" /><button onClick={search} className="px-4 py-2 rounded-lg bg-primary text-white text-xs">Buscar</button></div>
    <div className="space-y-1">{results.map((r,i) => <div key={i} className="p-2 rounded-lg border border-white/5 text-[10px]"><span>@{r.admin} → {r.action} | {r.target} | {r.ip} · {r.time}</span></div>)}</div></div>)
}
