"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ProcessarPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/monetizacao/loja/pedidos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Processar Pedido #{id}</h1></div>
      <p className="text-xs text-muted-foreground">Confirma a recepção e início de preparação.</p>
      <div className="space-y-1"><p className="text-[10px] font-bold">Prazo estimado de envio</p><Input type="date" className="bg-white/5" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Pedido em preparação!")}><Check className="w-3 h-3" />Confirmar recepção</Button>
    </div>
  )
}
