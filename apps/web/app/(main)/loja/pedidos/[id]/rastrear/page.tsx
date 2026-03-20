"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Truck, ExternalLink, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function RastrearPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/loja/pedidos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Truck className="w-5 h-5" />Rastrear Envio</h1></div>
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Transportadora</span><span className="font-bold">DHL Angola</span></div>
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Código</span><span className="font-mono font-bold">DHL-AO-789456123</span></div>
      </div>
      <div className="space-y-3">{[{t:"19 Mar, 14:00",d:"Encomenda entregue na transportadora",a:true},{t:"19 Mar, 10:30",d:"Preparação concluída",a:true},{t:"18 Mar, 16:00",d:"Pedido confirmado",a:true}].map(s => <div key={s.t} className="flex gap-3"><div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${s.a ? "bg-primary" : "bg-white/20"}`} /><div><p className="text-xs font-bold">{s.t}</p><p className="text-[10px] text-muted-foreground">{s.d}</p></div></div>)}</div>
      <Button className="w-full gap-1 text-xs" variant="outline"><ExternalLink className="w-3 h-3" />Ver no site da transportadora</Button>
    </div>
  )
}
