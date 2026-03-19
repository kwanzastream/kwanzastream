"use client"
import { GiftHistoryRow, type GiftHistoryItem } from "@/components/gifting/gift-history-item"
import { ArrowLeft, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const RECEIVED: GiftHistoryItem[] = [
  { id: "r1", type: "subscription", direction: "received", channel: "kuduro_master", user: "generous_fan", tier: "Tier 1", quantity: 1, date: "há 1 dia", status: "delivered" },
  { id: "r2", type: "salos", direction: "received", user: "stream_friend", amount: 1000, date: "há 4 dias", status: "delivered" },
  { id: "r3", type: "subscription", direction: "received", channel: "esports_ao", tier: "Tier 2", quantity: 1, date: "há 1 semana", status: "delivered", isAnonymous: true },
]

export default function GiftRecebidosPage() {
  const totalSubs = RECEIVED.filter(r => r.type === "subscription").reduce((s, r) => s + (r.quantity || 1), 0)
  const totalSalos = RECEIVED.filter(r => r.type === "salos").reduce((s, r) => s + (r.amount || 0), 0)

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/gift"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><ArrowDownLeft className="w-5 h-5 text-green-400" />Gifts Recebidos</h1></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center"><p className="text-lg font-bold">{totalSubs}</p><p className="text-[9px] text-muted-foreground">subscrições recebidas</p></div>
        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center"><p className="text-lg font-bold">{totalSalos.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">Salos recebidos</p></div>
      </div>
      <div className="space-y-1.5">{RECEIVED.map(r => <GiftHistoryRow key={r.id} item={r} />)}</div>
    </div>
  )
}
