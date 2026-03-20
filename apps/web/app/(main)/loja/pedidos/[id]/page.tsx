"use client"
import { useParams } from "next/navigation"
import { OrderStatusStepper } from "@/components/shop/order-status-stepper"
import { ArrowLeft, Download, Calendar, MapPin, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PedidoDetalhePage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/loja/pedidos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Pedido #{id}</h1></div>
      <OrderStatusStepper current="shipped" />
      <div className="p-5 rounded-2xl border border-white/10 space-y-3">
        {[{l:"Produto",v:"Overlay Pack OBS Premium"},{l:"Canal",v:"@esports_ao"},{l:"Tipo",v:"Digital"},{l:"Data",v:"19 Março 2026"},{l:"Total",v:"2.500 Kz"},{l:"Estado",v:"Enviado"}].map(f => <div key={f.l} className="flex justify-between text-sm"><span className="text-muted-foreground">{f.l}</span><span className="font-bold">{f.v}</span></div>)}
      </div>
      <div className="space-y-2">
        <Button className="w-full gap-1 text-xs" variant="outline"><Download className="w-3 h-3" />Download (válido 7 dias)</Button>
        <Link href={`/loja/pedidos/${id}/rastrear`}><Button className="w-full gap-1 text-xs" variant="outline"><Truck className="w-3 h-3" />Rastrear envio</Button></Link>
        <Link href={`/loja/pedidos/${id}/cancelar`}><Button className="w-full gap-1 text-xs" variant="ghost">Cancelar pedido</Button></Link>
        <Link href={`/loja/pedidos/${id}/devolver`}><Button className="w-full gap-1 text-xs" variant="ghost">Devolver</Button></Link>
      </div>
    </div>
  )
}
