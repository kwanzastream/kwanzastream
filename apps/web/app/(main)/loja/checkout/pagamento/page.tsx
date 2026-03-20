"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, CreditCard, Wallet, ArrowRight } from "lucide-react"
import Link from "next/link"
const METHODS = [{ id: "multicaixa", label: "Multicaixa Express", icon: Smartphone }, { id: "ekwanza", label: "e-Kwanza", icon: CreditCard }, { id: "saldo", label: "Saldo Kwanza Stream", icon: Wallet }]
export default function CheckoutPagamentoPage() {
  const router = useRouter()
  const [payment, setPayment] = useState("multicaixa")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Pagamento</h1></div>
      <div className="space-y-1.5">{METHODS.map(m => <button key={m.id} onClick={() => setPayment(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${payment === m.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><m.icon className="w-4 h-4 text-primary" /><span className="text-xs font-bold">{m.label}</span></button>)}</div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => router.push("/loja/checkout/confirmacao")}><ArrowRight className="w-4 h-4" />Continuar</Button>
    </div>
  )
}
