"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const PRODUCTS = [{id:"1",name:"Overlay OBS Angola",type:"Digital",price:"500 Kz",sales:8,status:"🟢"},{id:"2",name:"T-Shirt Kwanza",type:"Físico",price:"3.000 Kz",sales:3,status:"🟢",stock:20},{id:"3",name:"Shoutout ao vivo",type:"Experiência",price:"2.000 Kz",sales:1,status:"🟡"},{id:"4",name:"Pack de Sons",type:"Digital",price:"300 Kz",sales:0,status:"⚪"}]
export default function ProdutosPage() {
  const [filter, setFilter] = useState("all")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-bold">Produtos</h1><Link href="/dashboard/monetizacao/loja/produtos/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar</Button></Link></div>
      <div className="flex gap-1">{[{id:"all",l:"Todos"},{id:"active",l:"Activos"},{id:"out",l:"Esgotados"},{id:"inactive",l:"Inactivos"}].map(f => <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f.l}</button>)}</div>
      <div className="space-y-1">{PRODUCTS.map(p => <Link key={p.id} href={`/dashboard/monetizacao/loja/produtos/${p.id}`}><div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 hover:border-primary/20"><div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-sm">{p.type === "Digital" ? "💾" : p.type === "Físico" ? "👕" : "🎤"}</div><div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{p.name}</p><p className="text-[8px] text-muted-foreground">{p.type} · {p.price} · {p.sales} vendas</p></div><span className="text-sm">{p.status}</span></div></Link>)}</div>
    </div>
  )
}
