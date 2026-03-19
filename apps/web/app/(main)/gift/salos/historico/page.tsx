"use client"
import { GiftHistoryRow, type GiftHistoryItem } from "@/components/gifting/gift-history-item"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const HISTORY: GiftHistoryItem[] = [
  { id: "sh1", type: "salos", direction: "sent", user: "super_fan", amount: 500, date: "há 3 dias", status: "delivered" },
  { id: "sh2", type: "salos", direction: "sent", user: "kuduro_lover", amount: 200, date: "há 1 semana", status: "delivered" },
]

export default function SalosHistoricoPage() {
  const total = HISTORY.reduce((s, h) => s + (h.amount || 0), 0)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/gift/salos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Heart className="w-5 h-5 text-yellow-400" />Histórico de Salos Oferecidos</h1></div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center"><p className="text-sm font-bold flex items-center justify-center gap-1"><Heart className="w-4 h-4 text-yellow-400" />{total.toLocaleString()} Salos oferecidos no total</p></div>
      <div className="space-y-1.5">{HISTORY.map(h => <GiftHistoryRow key={h.id} item={h} />)}</div>
    </div>
  )
}
