"use client"
import { useState } from "react"
import { TransactionItem, type TransactionData } from "@/components/wallet/transaction-item"

import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TABS = [
  { id: "todos", label: "Todos", href: "/wallet/historico" },
  { id: "depositos", label: "Depósitos", href: "/wallet/historico/depositos" },
  { id: "levantamentos", label: "Levantamentos", href: "/wallet/historico/levantamentos" },
  { id: "salos-enviados", label: "Salos enviados", href: "/wallet/historico/salos-enviados" },
  { id: "salos-recebidos", label: "Salos recebidos", href: "/wallet/historico/salos-recebidos" },
  { id: "subscricoes", label: "Subscrições", href: "/wallet/historico/subscricoes" },
  { id: "reembolsos", label: "Reembolsos", href: "/wallet/historico/reembolsos" },
  { id: "gifts", label: "Gifts", href: "/wallet/historico/gifts" },
]

const MOCK: TransactionData[] = [
  { id: "t1", type: "deposit", description: "Multicaixa Express", amount: 5000, date: "há 2h", status: "completed", reference: "MCX-789" },
  { id: "t2", type: "subscription", description: "Sub @kuduro_master T1", amount: 500, date: "hoje", status: "completed" },
  { id: "t3", type: "salos_received", description: "Stream — 150 Salos", amount: 150, date: "ontem", status: "completed" },
  { id: "t4", type: "salos_sent", description: "500 Salos @semba_dj", amount: 500, date: "há 3d", status: "completed" },
  { id: "t5", type: "gift", description: "Gift sub @esports_ao", amount: 1500, date: "há 5d", status: "completed" },
  { id: "t6", type: "withdrawal", description: "Levantamento banco", amount: 10000, date: "há 1sem", status: "completed" },
]

export default function HistoricoPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/wallet/saldo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Histórico</h1></div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold ${t.id === "todos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="space-y-1.5">{MOCK.map(tx => <TransactionItem key={tx.id} tx={tx} />)}</div>
    </div>
  )
}
