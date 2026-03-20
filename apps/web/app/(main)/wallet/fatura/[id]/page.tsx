"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function FaturaPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/historico"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5" />Fatura #{id}</h1></div>
      <div className="p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="text-center"><p className="text-xs text-muted-foreground">Kwanza Stream, Lda.</p><p className="text-[9px] text-muted-foreground">NIF: 5417123456 · Luanda, Angola</p></div>
        <hr className="border-white/10" />
        {[{l:"Fatura",v:`#KWS-${id}`},{l:"Data",v:"19 Março 2026"},{l:"Descrição",v:"Depósito Multicaixa Express"},{l:"Valor",v:"5.000,00 Kz"},{l:"Estado",v:"Pago"},{l:"Método",v:"Multicaixa Express"},{l:"Referência",v:"MCX-789456"}].map(f => <div key={f.l} className="flex justify-between text-sm"><span className="text-muted-foreground">{f.l}</span><span className="font-bold">{f.v}</span></div>)}
      </div>
      <Button className="w-full gap-1"><Download className="w-4 h-4" />Descarregar PDF</Button>
    </div>
  )
}
