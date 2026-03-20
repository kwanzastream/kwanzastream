"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function EnviarPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/monetizacao/loja/pedidos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Enviar Pedido #{id}</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Transportadora</p><select className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>DHL Angola</option><option>FedEx</option><option>Entrega própria</option></select></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Código de rastreio</p><Input className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Data de envio</p><Input type="date" defaultValue="2026-03-20" className="bg-white/5" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Pedido marcado como enviado!")}><Truck className="w-3 h-3" />Marcar como enviado</Button>
    </div>
  )
}
