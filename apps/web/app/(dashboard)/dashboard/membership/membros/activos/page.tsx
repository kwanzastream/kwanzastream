"use client"
import { useState } from "react"
import { MemberRow } from "@/components/membership/membership-components"
import Link from "next/link"
const MEMBERS = [{u:"@superfan",t:3,m:8,r:"5 Abr"},{u:"@loyal",t:2,m:14,r:"2 Abr"},{u:"@supporter",t:1,m:3,r:"1 Abr"},{u:"@newmember",t:1,m:1,r:"20 Abr"},{u:"@gamer_ao",t:2,m:6,r:"10 Abr"}]
export default function MembrosActivosPage() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("oldest")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">👥 Membros Activos</h1>
      <div className="flex gap-1">{[{id:"all",l:"Todos"},{id:"1",l:"Tier 1"},{id:"2",l:"Tier 2"},{id:"3",l:"Tier 3"}].map(f => <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f.l}</button>)}</div>
      <div className="flex gap-1">{[{id:"oldest",l:"Mais leais"},{id:"recent",l:"Recentes"},{id:"tier",l:"Por tier"}].map(s => <button key={s.id} onClick={() => setSort(s.id)} className={`px-2 py-0.5 rounded text-[8px] ${sort === s.id ? "bg-white/10 text-white" : "text-muted-foreground"}`}>{s.l}</button>)}</div>
      <div className="flex gap-1"><Link href="/dashboard/membership/membros/churn"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Churn</button></Link><Link href="/dashboard/membership/membros/recuperar"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Recuperar</button></Link></div>
      <div className="space-y-1">{MEMBERS.map(m => <Link key={m.u} href={`/dashboard/membership/membros/${m.u.slice(1)}`}><MemberRow username={m.u} tier={m.t} months={m.m} renew={m.r} /></Link>)}</div>
    </div>
  )
}
