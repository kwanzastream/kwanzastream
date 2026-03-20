"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PayoutDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/payouts"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Payout #{id}</h1></div>
      <div className="space-y-2">
        {["Solicitado","Em processamento","Concluído"].map((step, i) => <div key={step} className="flex items-center gap-3"><div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 2 ? "bg-green-500 text-white" : "bg-white/10 text-muted-foreground"}`}>{i <= 2 ? "✓" : i + 1}</div><span className={`text-xs ${i <= 2 ? "font-bold" : "text-muted-foreground"}`}>{step}</span></div>)}
      </div>
      <div className="space-y-1">{[{l:"Valor bruto",v:"55.000 Kz"},{l:"Comissão",v:"-11.000 Kz"},{l:"Valor líquido",v:"44.000 Kz"},{l:"Método",v:"Multicaixa Express"},{l:"Data solicitação",v:"12 Mar 2026"},{l:"Data conclusão",v:"15 Mar 2026"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
    </div>
  )
}
