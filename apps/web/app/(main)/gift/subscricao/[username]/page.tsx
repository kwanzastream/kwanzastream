"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { GiftTierSelector, TIERS } from "@/components/gifting/gift-tier-selector"
import { GiftQuantitySelector } from "@/components/gifting/gift-quantity-selector"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, User, Users, EyeOff } from "lucide-react"
import Link from "next/link"

export default function GiftSubscricaoUsernamePage() {
  const { username } = useParams()
  const router = useRouter()
  const [tier, setTier] = useState("tier1")
  const [quantity, setQuantity] = useState(1)
  const [recipientType, setRecipientType] = useState<"specific" | "random">("specific")
  const [recipient, setRecipient] = useState("")

  const selectedTier = TIERS.find(t => t.id === tier)!
  const total = selectedTier.price * quantity

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/gift/subscricao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Oferecer a @{username}</h1></div>

      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <p className="text-xs font-bold text-muted-foreground">Para quem?</p>
        <div className="space-y-2">
          <button onClick={() => setRecipientType("specific")} className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${recipientType === "specific" ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><User className="w-4 h-4 text-primary" /><div><p className="text-xs font-bold">Para um viewer específico</p>{recipientType === "specific" && <Input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="@username do destinatário" className="mt-2 bg-white/5 h-8 text-xs" />}</div></button>
          <button onClick={() => setRecipientType("random")} className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${recipientType === "random" ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><Users className="w-4 h-4 text-primary" /><div><p className="text-xs font-bold">Distribuído aleatoriamente</p><p className="text-[9px] text-muted-foreground">Viewers activos recebem</p></div></button>
        </div>
      </div>

      <div className="space-y-1.5"><p className="text-xs font-bold text-muted-foreground">Quantidade</p><GiftQuantitySelector quantity={quantity} onChange={setQuantity} max={100} /></div>
      <div className="space-y-1.5"><p className="text-xs font-bold text-muted-foreground">Tipo de subscrição</p><GiftTierSelector selected={tier} onChange={setTier} /></div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between"><span className="text-sm font-bold">Total:</span><span className="text-lg font-black text-primary">{total.toLocaleString()} Kz</span></div>

      <div className="flex gap-3">
        <Link href={`/gift/subscricao/anonimo`} className="flex-1"><Button variant="outline" className="w-full gap-1 text-xs"><EyeOff className="w-3 h-3" />Anónimo</Button></Link>
        <Button className="flex-1 gap-1" onClick={() => router.push(`/gift/subscricao/${username}/confirmar?tier=${tier}&qty=${quantity}&to=${recipientType === "specific" ? recipient : "random"}`)}><ArrowRight className="w-4 h-4" />Continuar</Button>
      </div>
    </div>
  )
}
