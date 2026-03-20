"use client"
import { useParams } from "next/navigation"
import { GiftTierSelector, TIERS } from "@/components/gifting/gift-tier-selector"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubscricaoUsernamePage() {
  const { username } = useParams()
  const [tier, setTier] = useState("tier1")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Subscrever @{username}</h1></div>
      <GiftTierSelector selected={tier} onChange={setTier} />
      <div className="flex gap-3">
        <Link href={`/subscricao/${username}/confirmar?tier=${tier}`} className="flex-1"><Button className="w-full gap-1"><ArrowRight className="w-4 h-4" />Subscrever — {TIERS.find(t => t.id === tier)?.price.toLocaleString()} Kz</Button></Link>
        <Link href={`/gift/subscricao/${username}`}><Button variant="outline" size="icon"><Gift className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
