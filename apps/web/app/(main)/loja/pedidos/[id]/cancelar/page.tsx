"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, Loader2, Clock } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
const REASONS = ["Compra por engano","Encontrei mais barato","Já não preciso","Demora na entrega","Outro"]
export default function CancelarPedidoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reason, setReason] = useState("")
  const [cancelling, setCancelling] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/loja/pedidos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Cancelar Pedido</h1></div>
      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2"><AlertTriangle className="w-6 h-6 text-red-400 mx-auto" /><p className="text-sm text-center font-bold">Tens a certeza?</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Razão de cancelamento</p><select value={reason} onChange={e => setReason(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{REASONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3 shrink-0" />Reembolso em 3–5 dias úteis para o método original</div>
      <div className="flex gap-3"><Link href={`/loja/pedidos/${id}`} className="flex-1"><Button variant="outline" className="w-full">Manter</Button></Link><Button variant="destructive" className="flex-1" disabled={cancelling} onClick={() => { setCancelling(true); setTimeout(() => { toast.success("Pedido cancelado. Reembolso em 3–5 dias."); router.push("/loja/pedidos") }, 1500) }}>{cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancelar"}</Button></div>
    </div>
  )
}
