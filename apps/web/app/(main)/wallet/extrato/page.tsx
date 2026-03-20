"use client"
import { TransactionItem, type TransactionData } from "@/components/wallet/transaction-item"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: TransactionData[] = [
  { id: "e1", type: "deposit", description: "Multicaixa Express", amount: 5000, date: "1 Mar", status: "completed" },
  { id: "e2", type: "subscription", description: "Sub @kuduro_master", amount: 500, date: "3 Mar", status: "completed" },
  { id: "e3", type: "salos_sent", description: "Salos stream", amount: 200, date: "5 Mar", status: "completed" },
]

export default function ExtratoPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/saldo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5" />Extracto — Março 2026</h1></div>
      <div className="flex gap-3"><Button variant="outline" className="flex-1 gap-1 text-xs"><Download className="w-3 h-3" />Descarregar PDF</Button><Link href="/wallet/extrato/mensal"><Button variant="outline" className="flex-1 text-xs">Outro mês</Button></Link></div>
      <div className="space-y-1.5">{MOCK.map(tx => <TransactionItem key={tx.id} tx={tx} />)}</div>
    </div>
  )
}
