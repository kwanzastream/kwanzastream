"use client"
import { WalletBalanceCard } from "@/components/wallet/wallet-balance-card"
import { TransactionItem, type TransactionData } from "@/components/wallet/transaction-item"
import { KYCStatusCard } from "@/components/wallet/kyc-status-card"
import { Wallet } from "lucide-react"
import Link from "next/link"

const RECENT: TransactionData[] = [
  { id: "t1", type: "deposit", description: "Depósito Multicaixa Express", amount: 5000, date: "há 2h", status: "completed", reference: "MCX-789456" },
  { id: "t2", type: "subscription", description: "Subscrição @kuduro_master Tier 1", amount: 500, date: "hoje", status: "completed" },
  { id: "t3", type: "salos_received", description: "Salos recebidos de stream", amount: 2300, date: "ontem", status: "completed" },
  { id: "t4", type: "gift", description: "Gift sub para @esports_ao", amount: 1500, date: "há 3 dias", status: "completed" },
  { id: "t5", type: "salos_sent", description: "500 Salos para @semba_dj", amount: 500, date: "há 4 dias", status: "completed" },
]

export default function WalletSaldoPage() {
  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-5">
      <h1 className="text-xl font-bold flex items-center gap-2"><Wallet className="w-5 h-5" />Carteira</h1>
      <WalletBalanceCard balance={12500} salos={2300} />
      <KYCStatusCard kyc={{ status: "none" }} />
      <div className="space-y-2">
        <div className="flex items-center justify-between"><h2 className="text-sm font-bold">Actividade recente</h2><Link href="/wallet/historico" className="text-[10px] text-primary hover:underline">Ver tudo →</Link></div>
        {RECENT.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/wallet/extrato" className="flex-1 text-center text-[10px] text-primary hover:underline py-2">Extracto</Link>
        <Link href="/wallet/historico" className="flex-1 text-center text-[10px] text-primary hover:underline py-2">Histórico</Link>
      </div>
    </div>
  )
}
