"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Clock } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function LevantarConfirmarPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [agreed, setAgreed] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/levantar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Levantamento</h1></div>
      <div className="p-5 rounded-2xl border border-white/10 space-y-3">
        {[{l:"Valor",v:"5.000 Kz"},{l:"Método",v:"Multicaixa Express"},{l:"Destino",v:"AO06 ****9012"},{l:"Taxa",v:"0 Kz"},{l:"Valor líquido",v:"5.000 Kz"}].map(f => <div key={f.l} className="flex justify-between text-sm"><span className="text-muted-foreground">{f.l}</span><span className="font-bold">{f.v}</span></div>)}
      </div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-[10px] text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-400 shrink-0" />Prazo estimado: 1–3 dias úteis</div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="rounded" /><span className="text-xs">Confirmo que os dados estão correctos</span></label>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!agreed || submitting} onClick={() => { setSubmitting(true); setTimeout(() => { toast.success("Levantamento submetido!"); router.push("/wallet/levantar/status") }, 1500) }}>{submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Confirmar Levantamento</>}</Button>
    </div>
  )
}
