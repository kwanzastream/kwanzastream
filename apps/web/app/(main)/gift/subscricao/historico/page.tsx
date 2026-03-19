"use client"
import { GiftHistoryRow, type GiftHistoryItem } from "@/components/gifting/gift-history-item"
import { ArrowLeft, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const HISTORY: GiftHistoryItem[] = [
  { id: "gs1", type: "subscription", direction: "sent", channel: "kuduro_master", tier: "Tier 1", quantity: 1, date: "há 2 dias", status: "delivered" },
  { id: "gs2", type: "subscription", direction: "sent", channel: "esports_ao", tier: "Tier 2", quantity: 5, date: "há 1 semana", status: "delivered", isAnonymous: true },
  { id: "gs3", type: "subscription", direction: "sent", channel: "semba_dj", tier: "Tier 1", quantity: 10, date: "há 2 semanas", status: "delivered" },
]

export default function SubscricaoHistoricoPage() {
  const total = HISTORY.reduce((s, h) => s + (h.quantity || 1), 0)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/gift"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Histórico de Subs Oferecidas</h1></div>
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center"><p className="text-sm font-bold">{total} subscrições oferecidas no total</p></div>
      <div className="space-y-1.5">{HISTORY.map(h => <GiftHistoryRow key={h.id} item={h} />)}</div>
    </div>
  )
}
