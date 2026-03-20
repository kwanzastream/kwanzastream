"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function CancelarSubscricaoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [cancelling, setCancelling] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/subscricao/gerir/activas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Cancelar Subscrição</h1></div>
      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-3"><AlertTriangle className="w-8 h-8 text-red-400 mx-auto" /><p className="text-sm text-center font-bold">Tens a certeza?</p><ul className="text-[10px] text-muted-foreground space-y-1"><li>• Os benefícios mantêm-se até ao fim do período pago</li><li>• Não serás cobrado novamente</li><li>• Podes resubscrever a qualquer momento</li></ul></div>
      <div className="flex gap-3"><Link href="/subscricao/gerir/activas" className="flex-1"><Button variant="outline" className="w-full">Manter</Button></Link><Button variant="destructive" className="flex-1 gap-1" disabled={cancelling} onClick={() => { setCancelling(true); setTimeout(() => { toast.success("Subscrição cancelada"); router.push("/subscricao/gerir/activas") }, 1500) }}>{cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancelar subscrição"}</Button></div>
    </div>
  )
}
