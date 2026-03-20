"use client"
import { ArrowLeft, Copy, Banknote, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function TransferenciaBancariaPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Banknote className="w-5 h-5" />Transferência Bancária</h1></div>
      <p className="text-xs text-muted-foreground">Para valores superiores a 50.000 Kz. Mínimo: 10.000 Kz.</p>
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        {[{l:"Banco",v:"BAI"},{l:"IBAN",v:"AO06 0040 0000 1234 5678 9012 3"},{l:"Beneficiário",v:"Kwanza Stream, Lda."},{l:"Referência",v:"KWS-USR-A1B2C3"}].map(f => (
          <div key={f.l} className="flex items-center justify-between"><div><p className="text-[9px] text-muted-foreground">{f.l}</p><p className="text-sm font-mono font-bold">{f.v}</p></div><Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(f.v); toast.success("Copiado!") }}><Copy className="w-3 h-3" /></Button></div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-400 shrink-0" />Prazo: 1–3 dias úteis após transferência</div>
    </div>
  )
}
