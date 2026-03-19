"use client"
import { GiftHistoryRow, type GiftHistoryItem } from "@/components/gifting/gift-history-item"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SENT: GiftHistoryItem[] = [
  { id: "s1", type: "subscription", direction: "sent", channel: "kuduro_master", tier: "Tier 1", quantity: 1, date: "há 2 dias", status: "delivered" },
  { id: "s2", type: "subscription", direction: "sent", channel: "esports_ao", tier: "Tier 2", quantity: 5, date: "há 1 semana", status: "delivered", isAnonymous: true },
  { id: "s3", type: "salos", direction: "sent", user: "super_fan", amount: 500, date: "há 3 dias", status: "delivered" },
]

export default function GiftEnviadosPage() {
  const totalSubs = SENT.filter(s => s.type === "subscription").reduce((sum, s) => sum + (s.quantity || 1), 0)
  const totalSalos = SENT.filter(s => s.type === "salos").reduce((sum, s) => sum + (s.amount || 0), 0)

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/gift"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><ArrowUpRight className="w-5 h-5 text-red-400" />Gifts Enviados</h1></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center"><p className="text-lg font-bold">{totalSubs}</p><p className="text-[9px] text-muted-foreground">subscrições oferecidas</p></div>
        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center"><p className="text-lg font-bold">{totalSalos.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">Salos oferecidos</p></div>
      </div>
      <div className="space-y-1.5">{SENT.map(s => <GiftHistoryRow key={s.id} item={s} />)}</div>
    </div>
  )
}
