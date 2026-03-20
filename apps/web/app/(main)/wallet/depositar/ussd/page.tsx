"use client"
import { ArrowLeft, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function DepositarUSSDPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Smartphone className="w-5 h-5" />Depósito USSD</h1></div>
      <div className="space-y-3">{[{s:"1",t:"Marca *123# no teu telemóvel"},{s:"2",t:"Selecciona 'Pagamentos'"},{s:"3",t:"Selecciona 'Serviços'"},{s:"4",t:"Introduz a entidade: 11333"},{s:"5",t:"Introduz a referência gerada"},{s:"6",t:"Confirma o valor"},{s:"7",t:"Insere o PIN"}].map(i => <div key={i.s} className="flex gap-3"><div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{i.s}</div><p className="text-xs text-muted-foreground pt-1">{i.t}</p></div>)}</div>
      <Link href="/wallet/depositar/multicaixa"><Button className="w-full">Gerar referência para pagamento USSD</Button></Link>
    </div>
  )
}
