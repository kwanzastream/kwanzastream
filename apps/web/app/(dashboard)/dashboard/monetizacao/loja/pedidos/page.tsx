"use client"
import { useState } from "react"
import { OrderRow } from "@/components/monetization/monetization-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const ORDERS = [{id:"1",product:"Overlay OBS Angola",buyer:"@fan1",value:"500 Kz",date:"20 Mar",status:"🟢 Entregue"},{id:"2",product:"T-Shirt Kwanza (M)",buyer:"@fan2",value:"3.000 Kz",date:"19 Mar",status:"🔵 Enviado"},{id:"3",product:"Overlay OBS Angola",buyer:"@fan3",value:"500 Kz",date:"18 Mar",status:"🟡 Novo"}]
export default function PedidosPage() {
  const [filter, setFilter] = useState("all")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📦 Pedidos</h1>
      <div className="flex gap-1 overflow-x-auto">{[{id:"all",l:"Todos"},{id:"new",l:"Novos"},{id:"processing",l:"Processando"},{id:"shipped",l:"Enviados"},{id:"delivered",l:"Entregues"},{id:"cancelled",l:"Cancelados"}].map(f => <button key={f.id} onClick={() => setFilter(f.id)} className={`px-2 py-1 rounded-full text-[8px] font-bold whitespace-nowrap ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f.l}</button>)}</div>
      <div className="space-y-1">{ORDERS.map(o => <Link key={o.id} href={`/dashboard/monetizacao/loja/pedidos/${o.id}`}><OrderRow {...o} /></Link>)}</div>
    </div>
  )
}
