"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PedidoDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja/pedidos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Pedido #{id}</h1></div>
      <div className="space-y-1">{[{l:"Produto",v:"T-Shirt Kwanza (M)"},{l:"Comprador",v:"@fan2"},{l:"Valor",v:"3.000 Kz"},{l:"Data",v:"19 Mar 2026"},{l:"Estado",v:"🔵 Enviado"},{l:"Morada",v:"Luanda, Morro Bento, Rua X Nr 10"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <div className="space-y-1"><Link href={`/dashboard/monetizacao/loja/pedidos/${id}/processar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Package className="w-3 h-3" />Marcar em preparação</Button></Link><Link href={`/dashboard/monetizacao/loja/pedidos/${id}/enviar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Truck className="w-3 h-3" />Marcar como enviado</Button></Link></div>
    </div>
  )
}
