"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDownLeft, ArrowUpRight, Zap, AlertCircle, CheckCircle, Clock, Plus, Minus, RefreshCw, Shield } from "lucide-react"
import Link from "next/link"

interface Transaction { id: string; type: string; amount: number; status: string; reference?: string; createdAt: string }

const TX_ICONS: Record<string, any> = { DEPOSIT: ArrowDownLeft, WITHDRAWAL: ArrowUpRight, DONATION_SENT: Zap, DONATION_RECEIVED: Zap, REFUND: RefreshCw }
const TX_COLORS: Record<string, string> = { DEPOSIT: "text-green-500", WITHDRAWAL: "text-red-400", DONATION_SENT: "text-yellow-500", DONATION_RECEIVED: "text-yellow-400", REFUND: "text-blue-400" }
const TX_LABELS: Record<string, string> = { DEPOSIT: "Depósito", WITHDRAWAL: "Levantamento", DONATION_SENT: "Salos enviados", DONATION_RECEIVED: "Salos recebidos", REFUND: "Reembolso" }
const STATUS_BADGE: Record<string, { label: string; cls: string }> = { COMPLETED: { label: "Concluído", cls: "bg-green-500/10 text-green-500" }, PENDING: { label: "Pendente", cls: "bg-yellow-500/10 text-yellow-500" }, FAILED: { label: "Falhado", cls: "bg-red-500/10 text-red-500" }, CANCELLED: { label: "Cancelado", cls: "bg-muted text-muted-foreground" } }

export default function WalletPage() {
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [kycTier, setKycTier] = useState(0)
  const [pendingDeposits, setPendingDeposits] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true)
    try {
      const [wRes, txRes] = await Promise.allSettled([api.get("/api/wallet/"), api.get("/api/wallet/transactions")])
      if (wRes.status === "fulfilled") { const d = wRes.value.data; setBalance(Number(d.balance ?? d.wallet?.balance ?? 0)); setKycTier(d.kycTier ?? (user as any)?.kycTier ?? 0); setPendingDeposits(d.pendingDeposits ?? 0) }
      if (txRes.status === "fulfilled") setTransactions(txRes.value.data?.transactions || txRes.value.data || [])
    } catch {} finally { setLoading(false); setRefreshing(false) }
  }

  useEffect(() => { fetchData() }, [])

  const formatKz = (c: number) => `${(c / 100).toLocaleString("pt-AO", { minimumFractionDigits: 2 })} Kz`
  const isDebit = (t: string) => ["WITHDRAWAL", "DONATION_SENT"].includes(t)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold">Carteira</h1>
        <Button variant="ghost" size="icon" onClick={() => { fetchData(true); refreshUser() }} disabled={refreshing}><RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} /></Button>
      </div>

      {/* KYC Banner */}
      {(kycTier || (user as any)?.kycTier || 0) === 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div className="flex-1"><p className="text-sm font-medium">Verifica a tua identidade</p><p className="text-xs text-muted-foreground mt-0.5">Para depositar ou levantar dinheiro, precisas de completar a verificação KYC.</p></div>
          <Link href="/kyc"><Button size="sm" variant="outline" className="text-xs h-7 shrink-0"><Shield className="w-3 h-3 mr-1.5" />Verificar</Button></Link>
        </div>
      )}

      {/* Balance Card */}
      {loading ? <Skeleton className="h-40 rounded-2xl" /> : (
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardContent className="pt-6 pb-6">
            <p className="text-sm text-muted-foreground mb-1">Saldo disponível</p>
            <p className="text-4xl font-bold tracking-tight">{formatKz(balance)}</p>
            {pendingDeposits > 0 && <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><Clock className="w-3 h-3" />{formatKz(pendingDeposits)} pendente</p>}
            <div className="flex items-center gap-2 mt-4">
              {kycTier > 0 ? <Badge className="bg-green-500/10 text-green-500 gap-1"><CheckCircle className="w-3 h-3" />Verificado KYC Tier {kycTier}</Badge> : <Badge variant="outline" className="gap-1"><Shield className="w-3 h-3" />Não verificado</Badge>}
            </div>
            <div className="flex gap-3 mt-5">
              <Button className="flex-1 gap-1.5" onClick={() => router.push("/wallet/depositar")} disabled={kycTier === 0}><Plus className="w-4 h-4" />Depositar</Button>
              <Button variant="outline" className="flex-1 gap-1.5" onClick={() => router.push("/wallet/levantar")} disabled={kycTier === 0}><Minus className="w-4 h-4" />Levantar</Button>
              <Button variant="outline" className="gap-1.5" onClick={() => router.push("/salos/comprar")}><Zap className="w-4 h-4 text-[#F9D616]" />Salos</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions */}
      <Tabs defaultValue="historico">
        <TabsList className="w-full"><TabsTrigger value="historico" className="flex-1">Histórico</TabsTrigger><TabsTrigger value="salos-enviados" className="flex-1">Salos enviados</TabsTrigger><TabsTrigger value="salos-recebidos" className="flex-1">Salos recebidos</TabsTrigger></TabsList>
        <TabsContent value="historico"><TxList txs={transactions} loading={loading} formatKz={formatKz} isDebit={isDebit} /></TabsContent>
        <TabsContent value="salos-enviados"><TxList txs={transactions.filter(t => t.type === "DONATION_SENT")} loading={loading} formatKz={formatKz} isDebit={isDebit} /></TabsContent>
        <TabsContent value="salos-recebidos"><TxList txs={transactions.filter(t => t.type === "DONATION_RECEIVED")} loading={loading} formatKz={formatKz} isDebit={isDebit} /></TabsContent>
      </Tabs>
    </div>
  )
}

function TxList({ txs, loading, formatKz, isDebit }: { txs: Transaction[]; loading: boolean; formatKz: (n: number) => string; isDebit: (t: string) => boolean }) {
  if (loading) return <div className="space-y-3 mt-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
  if (txs.length === 0) return <div className="text-center py-12"><p className="text-2xl mb-2">💳</p><p className="text-sm text-muted-foreground">Sem transacções ainda</p></div>
  return (
    <div className="space-y-2 mt-3">
      {txs.map((tx) => {
        const Icon = TX_ICONS[tx.type] ?? Zap; const color = TX_COLORS[tx.type] ?? "text-primary"; const st = STATUS_BADGE[tx.status] ?? STATUS_BADGE.PENDING; const debit = isDebit(tx.type)
        return (
          <div key={tx.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0"><Icon className={`w-4 h-4 ${color}`} /></div>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium">{TX_LABELS[tx.type] ?? tx.type}</p><p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString("pt-AO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p></div>
            <div className="text-right shrink-0"><p className={`text-sm font-bold ${debit ? "text-red-400" : "text-green-400"}`}>{debit ? "−" : "+"}{formatKz(Number(tx.amount))}</p><Badge className={`text-[10px] h-4 px-1.5 ${st.cls}`}>{st.label}</Badge></div>
          </div>
        )
      })}
    </div>
  )
}
