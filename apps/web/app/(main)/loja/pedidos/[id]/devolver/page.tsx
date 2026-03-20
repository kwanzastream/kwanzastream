"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw, Loader2, Clock, Info } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
const REASONS = ["Defeito/dano","Tamanho errado","Diferente do anúncio","Não era o pretendido","Outro"]
export default function DevolverPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reason, setReason] = useState("")
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/loja/pedidos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><RotateCcw className="w-5 h-5" />Devolver Produto</h1></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-muted-foreground space-y-1"><p className="font-bold flex items-center gap-1"><Info className="w-3 h-3 text-primary" />Janela de devolução: 14 dias após entrega</p><p>O processo de devolução é manual via suporte nesta fase.</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Razão de devolução</p><select value={reason} onChange={e => setReason(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{REASONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-[10px] text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3 text-yellow-400 shrink-0" />Reembolso: 7 dias úteis após recepção do produto</div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={submitting} onClick={() => { setSubmitting(true); setTimeout(() => { toast.success("Pedido de devolução submetido!"); router.push(`/loja/pedidos/${id}`) }, 1500) }}>{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><RotateCcw className="w-4 h-4" />Submeter devolução</>}</Button>
    </div>
  )
}
