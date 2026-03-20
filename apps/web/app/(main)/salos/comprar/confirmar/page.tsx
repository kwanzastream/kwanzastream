"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Check, Loader2, Smartphone, CreditCard, Wallet } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
const METHODS = [{ id: "multicaixa", label: "Multicaixa Express", icon: Smartphone }, { id: "ekwanza", label: "e-Kwanza", icon: CreditCard }, { id: "saldo", label: "Saldo Kwanza Stream", icon: Wallet }]
export default function SalosConfirmarPage() {
  const router = useRouter()
  const [payment, setPayment] = useState("multicaixa")
  const [processing, setProcessing] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/salos/comprar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Compra</h1></div>
      <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center space-y-2"><Heart className="w-8 h-8 text-yellow-400 mx-auto" /><p className="text-2xl font-black">200 Salos</p><p className="text-lg font-bold">180 Kz</p></div>
      <div className="space-y-1.5">{METHODS.map(m => <button key={m.id} onClick={() => setPayment(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${payment === m.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><m.icon className="w-4 h-4 text-primary" /><span className="text-xs font-bold">{m.label}</span></button>)}</div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={processing} onClick={() => { setProcessing(true); setTimeout(() => { toast.success("💛 Salos creditados!"); router.push("/salos/comprar/sucesso") }, 1500) }}>{processing ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Comprar Salos</>}</Button>
    </div>
  )
}
