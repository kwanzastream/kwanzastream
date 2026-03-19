"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { GiftQuantitySelector } from "@/components/gifting/gift-quantity-selector"
import { TIERS } from "@/components/gifting/gift-tier-selector"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EscolherQuantidadePage() {
  const { username } = useParams()
  const [quantity, setQuantity] = useState(1)
  const tier = TIERS[0]
  const total = tier.price * quantity

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/gift/subscricao/${username}/escolher-tier`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Quantidade</h1></div>
      <GiftQuantitySelector quantity={quantity} onChange={setQuantity} max={100} />
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center"><p className="text-xs text-muted-foreground">{quantity}× {tier.name} para @{username}</p><p className="text-lg font-black text-primary">{total.toLocaleString()} Kz</p></div>
      <Link href={`/gift/subscricao/${username}/confirmar?tier=${tier.id}&qty=${quantity}`}><Button className="w-full gap-1"><ArrowRight className="w-4 h-4" />Continuar para pagamento</Button></Link>
    </div>
  )
}
