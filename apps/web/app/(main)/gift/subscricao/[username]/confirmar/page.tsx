"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Gift, CreditCard, Wallet, Smartphone } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const PAYMENT_METHODS = [
  { id: "multicaixa", label: "Multicaixa Express", icon: Smartphone },
  { id: "ekwanza", label: "e-Kwanza", icon: CreditCard },
  { id: "saldo", label: "Saldo Kwanza Stream", icon: Wallet },
]

export default function GiftConfirmarPage() {
  const { username } = useParams()
  const router = useRouter()
  const [payment, setPayment] = useState("multicaixa")
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/gift/subscricao/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Gift</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center space-y-3">
        <Gift className="w-10 h-10 text-primary mx-auto" />
        <p className="text-sm">Oferecer ao canal <span className="font-bold">@{username}</span>:</p>
        <p className="text-lg font-bold">1× Subscrição Tier 1</p>
        <p className="text-2xl font-black text-primary">500 Kz</p>
      </div>
      <div className="space-y-1.5"><p className="text-xs font-bold text-muted-foreground">Pagamento via:</p><div className="space-y-1">{PAYMENT_METHODS.map(m => <button key={m.id} onClick={() => setPayment(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${payment === m.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><m.icon className="w-4 h-4 text-primary" /><span className="text-xs font-bold">{m.label}</span></button>)}</div></div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => { setConfirming(true); setTimeout(() => { toast.success("🎁 Gift enviado com sucesso!"); router.push("/gift/enviados") }, 2000) }} disabled={confirming}>{confirming ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Confirmar e pagar</>}</Button>
    </div>
  )
}
