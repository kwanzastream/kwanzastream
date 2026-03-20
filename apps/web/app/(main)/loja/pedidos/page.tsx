"use client"
import { useState } from "react"
import { OrderItem, type OrderData } from "@/components/shop/order-item"
import { ArrowLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TABS = ["Todos","Em processamento","Enviado","Entregue","Digital","Cancelado"]
const ORDERS: OrderData[] = [
  { id: "ord1", productName: "Overlay Pack OBS Premium", channel: "esports_ao", price: 2500, type: "digital", date: "hoje", status: "delivered" },
  { id: "ord2", productName: "Hoodie Kuduro King", channel: "kuduro_master", price: 8500, type: "physical", date: "há 3 dias", status: "shipped" },
  { id: "ord3", productName: "Shoutout ao Vivo", channel: "semba_dj", price: 1500, type: "experience", date: "há 1 semana", status: "paid" },
]

export default function PedidosPage() {
  const [tab, setTab] = useState("Todos")
  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Package className="w-5 h-5" />Meus Pedidos</h1></div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t}</button>)}</div>
      <div className="space-y-1.5">{ORDERS.map(o => <OrderItem key={o.id} order={o} />)}</div>
    </div>
  )
}
