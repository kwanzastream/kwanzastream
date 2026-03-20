"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Smartphone, CreditCard, Wallet } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
const METHODS = [{ id: "multicaixa", label: "Multicaixa Express", icon: Smartphone }, { id: "ekwanza", label: "e-Kwanza", icon: CreditCard }, { id: "saldo", label: "Saldo Kwanza Stream", icon: Wallet }]
export default function SubscricaoConfirmarPage() {
  const { username } = useParams()
  const router = useRouter()
  const [payment, setPayment] = useState("multicaixa")
  const [processing, setProcessing] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/subscricao/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Subscrição</h1></div>
      <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 text-center space-y-2"><p className="text-sm">Subscrever @{username}</p><p className="text-xl font-bold">Tier 1 — 500 Kz/mês</p><p className="text-[9px] text-muted-foreground">Renovação automática. Cancela a qualquer momento.</p></div>
      <div className="space-y-1.5">{METHODS.map(m => <button key={m.id} onClick={() => setPayment(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${payment === m.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><m.icon className="w-4 h-4 text-primary" /><span className="text-xs font-bold">{m.label}</span></button>)}</div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={processing} onClick={() => { setProcessing(true); setTimeout(() => { toast.success("Subscrito!"); router.push(`/subscricao/${username}/sucesso`) }, 1500) }}>{processing ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Confirmar e pagar</>}</Button>
    </div>
  )
}
