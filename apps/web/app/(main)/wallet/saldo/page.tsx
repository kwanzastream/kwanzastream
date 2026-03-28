"use client"
import { useEffect, useState } from "react"
import { WalletBalanceCard } from "@/components/wallet/wallet-balance-card"
import { TransactionItem, type TransactionData } from "@/components/wallet/transaction-item"
import { KYCStatusCard } from "@/components/wallet/kyc-status-card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Wallet, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function WalletSaldoPage() {
  const { user } = useAuth()
  const [balance, setBalance] = useState(0)
  const [salos, setSalos] = useState(0)
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [kycStatus, setKycStatus] = useState<{ status: "none" | "pending" | "approved" | "rejected" }>({ status: "none" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.allSettled([
      api.get("/api/wallet/balance"),
      api.get("/api/wallet/transactions?limit=5"),
    ]).then(([balRes, txRes]) => {
      if (balRes.status === "fulfilled") {
        const data = balRes.value.data
        setBalance(data.balance ?? data.balanceKz ?? 0)
        setSalos(data.salos ?? data.salosBalance ?? 0)
        if (data.kycStatus) setKycStatus({ status: data.kycStatus })
      } else {
        // Fallback: use user balance from auth context
        setBalance(user?.balance ?? 0)
        setError(true)
      }
      if (txRes.status === "fulfilled") {
        setTransactions(txRes.value.data?.transactions || txRes.value.data || [])
      }
    }).finally(() => setLoading(false))
  }, [user?.balance])

  if (loading) {
    return (
      <div className="max-w-lg mx-auto py-4 px-4 space-y-5">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <div className="space-y-2">
          {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-5">
      <h1 className="text-xl font-bold flex items-center gap-2"><Wallet className="w-5 h-5" />Carteira</h1>
      {error && (
        <div className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 rounded-lg p-2.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Não foi possível carregar dados completos da carteira.</span>
        </div>
      )}
      <WalletBalanceCard balance={balance} salos={salos} />
      <KYCStatusCard kyc={kycStatus} />
      <div className="space-y-2">
        <div className="flex items-center justify-between"><h2 className="text-sm font-bold">Actividade recente</h2><Link href="/wallet/historico" className="text-[10px] text-primary hover:underline">Ver tudo →</Link></div>
        {transactions.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">Sem transacções recentes</p>
        ) : (
          transactions.map(tx => <TransactionItem key={tx.id} tx={tx} />)
        )}
      </div>
      <div className="flex gap-2">
        <Link href="/wallet/extrato" className="flex-1 text-center text-[10px] text-primary hover:underline py-2">Extrato</Link>
        <Link href="/wallet/historico" className="flex-1 text-center text-[10px] text-primary hover:underline py-2">Histórico</Link>
      </div>
    </div>
  )
}

