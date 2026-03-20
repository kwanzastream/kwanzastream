"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function CheckoutConfirmacaoPage() {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/loja/checkout/pagamento"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Pedido</h1></div>
      <div className="p-5 rounded-2xl border border-white/10 space-y-3">
        {[{l:"Produto",v:"Overlay Pack OBS Premium"},{l:"Canal",v:"@esports_ao"},{l:"Tipo",v:"Digital — Entrega imediata"},{l:"Pagamento",v:"Multicaixa Express"},{l:"Total",v:"2.500 Kz"}].map(f => <div key={f.l} className="flex justify-between text-sm"><span className="text-muted-foreground">{f.l}</span><span className="font-bold">{f.v}</span></div>)}
      </div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={processing} onClick={() => { setProcessing(true); setTimeout(() => { toast.success("Pedido confirmado!"); router.push("/loja/pedidos") }, 2000) }}>{processing ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Confirmar e Pagar</>}</Button>
    </div>
  )
}
