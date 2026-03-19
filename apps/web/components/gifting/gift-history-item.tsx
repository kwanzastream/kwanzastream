"use client"

import { Gift, Heart, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface GiftHistoryItem {
  id: string
  type: "subscription" | "salos"
  direction: "sent" | "received"
  channel?: string
  user?: string
  tier?: string
  quantity?: number
  amount?: number
  date: string
  isAnonymous?: boolean
  status?: "delivered" | "pending" | "refunded"
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  delivered: { label: "Entregue", color: "bg-green-500/10 text-green-400" },
  pending: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-400" },
  refunded: { label: "Reembolsado", color: "bg-red-500/10 text-red-400" },
}

export function GiftHistoryRow({ item }: { item: GiftHistoryItem }) {
  const isSent = item.direction === "sent"
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.type === "subscription" ? "bg-primary/10" : "bg-yellow-500/10"}`}>
        {item.type === "subscription" ? <Gift className="w-4 h-4 text-primary" /> : <Heart className="w-4 h-4 text-yellow-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate flex items-center gap-1">
          {isSent ? <ArrowUpRight className="w-3 h-3 text-red-400" /> : <ArrowDownLeft className="w-3 h-3 text-green-400" />}
          {item.type === "subscription" ? `${item.quantity || 1}× Sub ${item.tier || "Tier 1"}` : `${item.amount?.toLocaleString()} Salos`}
        </p>
        <p className="text-[9px] text-muted-foreground">
          {isSent ? "Para " : "De "}{item.isAnonymous ? "Anónimo" : `@${item.user || item.channel}`} · {item.date}
        </p>
      </div>
      {item.status && <Badge className={`text-[8px] ${STATUS_MAP[item.status]?.color || ""}`}>{STATUS_MAP[item.status]?.label}</Badge>}
    </div>
  )
}
