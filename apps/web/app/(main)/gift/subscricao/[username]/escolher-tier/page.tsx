"use client"
import { useParams } from "next/navigation"
import { GiftTierSelector, TIERS } from "@/components/gifting/gift-tier-selector"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EscolherTierPage() {
  const { username } = useParams()
  const [tier, setTier] = useState("tier1")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/gift/subscricao/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Escolher Tier</h1></div>
      <p className="text-xs text-muted-foreground">Compara os benefícios de cada tier para @{username}.</p>
      <GiftTierSelector selected={tier} onChange={setTier} />
      <Link href={`/gift/subscricao/${username}/escolher-quantidade?tier=${tier}`}><Button className="w-full gap-1"><ArrowRight className="w-4 h-4" />Continuar com {TIERS.find(t => t.id === tier)?.name}</Button></Link>
    </div>
  )
}
