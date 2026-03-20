"use client"
import { ArrowDownLeft, ArrowUpRight, Gift, Heart, CreditCard, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface TransactionData {
  id: string
  type: "deposit" | "withdrawal" | "salos_sent" | "salos_received" | "subscription" | "gift" | "refund"
  description: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed" | "refunded"
  reference?: string
}

const TYPE_CONFIG: Record<string, { icon: any; color: string }> = {
  deposit: { icon: ArrowDownLeft, color: "text-green-400" },
  withdrawal: { icon: ArrowUpRight, color: "text-red-400" },
  salos_sent: { icon: Heart, color: "text-yellow-400" },
  salos_received: { icon: Heart, color: "text-green-400" },
  subscription: { icon: CreditCard, color: "text-primary" },
  gift: { icon: Gift, color: "text-purple-400" },
  refund: { icon: RefreshCw, color: "text-blue-400" },
}
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  completed: { label: "Concluído", color: "bg-green-500/10 text-green-400" },
  pending: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-400" },
  failed: { label: "Falhado", color: "bg-red-500/10 text-red-400" },
  refunded: { label: "Reembolsado", color: "bg-blue-500/10 text-blue-400" },
}

export function TransactionItem({ tx }: { tx: TransactionData }) {
  const cfg = TYPE_CONFIG[tx.type] || TYPE_CONFIG.deposit
  const st = STATUS_MAP[tx.status]
  const Icon = cfg.icon
  const isPositive = ["deposit", "salos_received", "refund"].includes(tx.type)
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/5`}><Icon className={`w-4 h-4 ${cfg.color}`} /></div>
      <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{tx.description}</p><p className="text-[9px] text-muted-foreground">{tx.date}{tx.reference && ` · Ref: ${tx.reference}`}</p></div>
      <div className="text-right shrink-0"><p className={`text-sm font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>{isPositive ? "+" : "-"}{Math.abs(tx.amount).toLocaleString()} Kz</p>{st && <Badge className={`text-[7px] ${st.color}`}>{st.label}</Badge>}</div>
    </div>
  )
}
