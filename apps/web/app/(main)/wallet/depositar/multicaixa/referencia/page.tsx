"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Check, Clock, QrCode, Landmark, Smartphone, CreditCard } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function MulticaixaReferenciaPage() {
  const router = useRouter()
  const [copied, setCopied] = useState<string>("")
  const ref = { entidade: "11333", referencia: "123 456 789", valor: "1.000,00 Kz", prazo: "23:59 de hoje" }

  const copy = (val: string, label: string) => { navigator.clipboard.writeText(val.replace(/ /g, "")); setCopied(label); toast.success(`${label} copiado!`); setTimeout(() => setCopied(""), 2000) }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar/multicaixa"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Referência de Pagamento</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
        {[{ label: "Entidade", value: ref.entidade }, { label: "Referência", value: ref.referencia }, { label: "Valor", value: ref.valor }].map(f => (
          <div key={f.label} className="flex items-center justify-between"><div><p className="text-[9px] text-muted-foreground">{f.label}</p><p className="text-lg font-mono font-bold">{f.value}</p></div><Button size="icon" variant="ghost" onClick={() => copy(f.value, f.label)}>{copied === f.label ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}</Button></div>
        ))}
        <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Válido até: {ref.prazo}</p>
      </div>
      <div className="p-4 rounded-xl border border-white/10 text-center"><QrCode className="w-20 h-20 text-muted-foreground/30 mx-auto" /><p className="text-[9px] text-muted-foreground mt-1">QR code (quando disponível)</p></div>
      <div className="space-y-2"><p className="text-xs font-bold">Como pagar:</p>{[{ icon: Landmark, label: "ATM: Pagamentos → Serviços → Referência" }, { icon: Smartphone, label: "App do banco: Pagamentos → Ref. Multicaixa" }, { icon: CreditCard, label: "TPA: Serviço → Referência → Confirma" }].map(ch => <div key={ch.label} className="flex items-center gap-2 text-[10px] text-muted-foreground"><ch.icon className="w-3 h-3 shrink-0" />{ch.label}</div>)}</div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => router.push("/wallet/depositar/multicaixa/confirmar")}>Já paguei — verificar</Button>
    </div>
  )
}
