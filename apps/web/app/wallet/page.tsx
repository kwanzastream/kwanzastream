'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Gift,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { walletService } from '@/lib/services'

interface WalletData {
  balance: number
  stats: { totalEarned: number; totalSpent: number }
  recentTransactions: Transaction[]
}

interface Transaction {
  id: string
  amount: number
  type: string
  status: string
  description?: string
  reference?: string
  createdAt: string
}

export default function WalletPage() {
  const { isLoggedIn, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [wallet, setWallet] = React.useState<WalletData | null>(null)
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<'overview' | 'deposit' | 'withdraw' | 'history'>('overview')

  // Deposit state
  const [depositAmount, setDepositAmount] = React.useState('')
  const [depositMethod, setDepositMethod] = React.useState<'multicaixa' | 'unitel_money' | 'bank_transfer'>('multicaixa')
  const [isDepositing, setIsDepositing] = React.useState(false)
  const [depositSuccess, setDepositSuccess] = React.useState('')

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = React.useState('')
  const [bankName, setBankName] = React.useState('')
  const [accountNumber, setAccountNumber] = React.useState('')
  const [accountName, setAccountName] = React.useState('')
  const [isWithdrawing, setIsWithdrawing] = React.useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = React.useState('')

  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (!authLoading && !isLoggedIn) router.push('/auth')
  }, [authLoading, isLoggedIn, router])

  React.useEffect(() => {
    if (isLoggedIn) fetchWallet()
  }, [isLoggedIn])

  const fetchWallet = async () => {
    try {
      const [walletRes, txRes] = await Promise.all([
        walletService.getWallet(),
        walletService.getTransactions(1, 20),
      ])
      setWallet(walletRes.data)
      setTransactions(txRes.data.transactions || [])
    } catch (err) {
      console.error('Wallet fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeposit = async () => {
    const amount = Number(depositAmount)
    if (amount < 100 || amount > 1000000) {
      setError('Montante deve ser entre 100 e 1.000.000 Kz')
      return
    }
    setIsDepositing(true)
    setError('')
    try {
      await walletService.deposit({ amount, paymentMethod: depositMethod })
      setDepositSuccess(`${amount.toLocaleString()} Kz depositado com sucesso!`)
      setDepositAmount('')
      fetchWallet()
      setTimeout(() => setDepositSuccess(''), 4000)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao depositar')
    } finally {
      setIsDepositing(false)
    }
  }

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount)
    if (amount < 1000 || amount > 500000) {
      setError('Montante deve ser entre 1.000 e 500.000 Kz')
      return
    }
    if (!bankName || !accountNumber || !accountName) {
      setError('Preenche todos os dados bancários')
      return
    }
    setIsWithdrawing(true)
    setError('')
    try {
      await walletService.withdraw({
        amount,
        bankAccount: { bank: bankName, accountNumber, accountName },
      })
      setWithdrawSuccess('Pedido de saque submetido! Processamento em 1-3 dias úteis.')
      setWithdrawAmount('')
      setBankName('')
      setAccountNumber('')
      setAccountName('')
      fetchWallet()
      setTimeout(() => setWithdrawSuccess(''), 5000)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao sacar')
    } finally {
      setIsWithdrawing(false)
    }
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case 'PENDING': return <Clock className="h-4 w-4 text-yellow-400" />
      case 'FAILED': return <XCircle className="h-4 w-4 text-red-400" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const typeIcon = (type: string) => {
    switch (type) {
      case 'DEPOSIT': return <ArrowDownLeft className="h-4 w-4 text-green-400" />
      case 'WITHDRAWAL': return <ArrowUpRight className="h-4 w-4 text-red-400" />
      case 'DONATION_SENT': return <Gift className="h-4 w-4 text-orange-400" />
      case 'DONATION_RECEIVED': return <Gift className="h-4 w-4 text-green-400" />
      default: return <Wallet className="h-4 w-4 text-muted-foreground" />
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-6 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    )
  }

  const paymentMethods = [
    { id: 'multicaixa' as const, name: 'Multicaixa Express', icon: <CreditCard className="h-5 w-5" />, color: 'text-blue-400' },
    { id: 'unitel_money' as const, name: 'Unitel Money', icon: <Smartphone className="h-5 w-5" />, color: 'text-orange-400' },
    { id: 'bank_transfer' as const, name: 'Transferência Bancária', icon: <Building2 className="h-5 w-5" />, color: 'text-green-400' },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/feed')} className="text-muted-foreground hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="h-6 w-6 text-primary" /> Carteira
            </h1>
            <p className="text-sm text-muted-foreground">Gere o teu saldo e transações</p>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="border-white/10 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent overflow-hidden">
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground font-medium mb-1">Saldo Disponível</p>
            <p className="text-5xl font-black tracking-tight">
              {(wallet?.balance || 0).toLocaleString()} <span className="text-2xl text-muted-foreground font-normal">Kz</span>
            </p>
            <div className="flex gap-3 mt-6">
              <Button onClick={() => setActiveTab('deposit')} className="bg-green-600 hover:bg-green-700 gap-2 font-bold">
                <Plus className="h-4 w-4" /> Depositar
              </Button>
              <Button onClick={() => setActiveTab('withdraw')} variant="outline" className="border-white/20 bg-transparent gap-2 font-bold">
                <Minus className="h-4 w-4" /> Sacar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-white/10 bg-card/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Ganho</p>
                <p className="text-lg font-bold text-green-400">{(wallet?.stats?.totalEarned || 0).toLocaleString()} Kz</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-card/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Gasto</p>
                <p className="text-lg font-bold text-red-400">{(wallet?.stats?.totalSpent || 0).toLocaleString()} Kz</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
          {(['overview', 'deposit', 'withdraw', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setError('') }}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-bold transition-all ${activeTab === tab ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'
                }`}
            >
              {tab === 'overview' ? 'Resumo' : tab === 'deposit' ? 'Depositar' : tab === 'withdraw' ? 'Sacar' : 'Histórico'}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
            <Button variant="ghost" size="sm" onClick={() => setError('')} className="ml-auto text-red-400 h-6 px-2">✕</Button>
          </div>
        )}

        {/* Deposit Tab */}
        {activeTab === 'deposit' && (
          <Card className="border-white/10 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-green-400" /> Depositar Fundos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Método de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => setDepositMethod(pm.id)}
                      className={`p-3 rounded-lg border text-center transition-all ${depositMethod === pm.id
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 hover:border-white/30'
                        }`}
                    >
                      <div className={`mx-auto mb-1 ${pm.color}`}>{pm.icon}</div>
                      <p className="text-xs font-bold">{pm.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Montante (Kz)</label>
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Ex: 5000"
                  className="bg-white/5 border-white/10 h-12 text-lg font-bold"
                  min={100}
                  max={1000000}
                />
                <div className="flex gap-2">
                  {[500, 1000, 5000, 10000].map(v => (
                    <Button key={v} variant="outline" size="sm" onClick={() => setDepositAmount(String(v))} className="border-white/10 bg-transparent text-xs flex-1">
                      {v.toLocaleString()} Kz
                    </Button>
                  ))}
                </div>
              </div>
              {depositSuccess && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                  <p className="text-sm font-bold text-green-300">{depositSuccess}</p>
                </div>
              )}
              <Button onClick={handleDeposit} disabled={isDepositing || !depositAmount} className="w-full h-12 bg-green-600 hover:bg-green-700 font-bold text-base gap-2">
                {isDepositing ? <><Loader2 className="h-4 w-4 animate-spin" /> A processar...</> : <><Plus className="h-4 w-4" /> Depositar {depositAmount ? `${Number(depositAmount).toLocaleString()} Kz` : ''}</>}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <Card className="border-white/10 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Minus className="h-5 w-5 text-red-400" /> Sacar Fundos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Montante (Kz)</label>
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Ex: 10000"
                  className="bg-white/5 border-white/10 h-12 text-lg font-bold"
                  min={1000}
                  max={500000}
                />
              </div>
              <Separator className="bg-white/10" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Banco</label>
                  <Input value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="BFA, BAI, BIC..." className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Nº da Conta</label>
                  <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="000-000-000-000" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Titular</label>
                  <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Nome completo" className="bg-white/5 border-white/10" />
                </div>
              </div>
              {withdrawSuccess && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                  <p className="text-sm font-bold text-green-300">{withdrawSuccess}</p>
                </div>
              )}
              <Button onClick={handleWithdraw} disabled={isWithdrawing || !withdrawAmount} className="w-full h-12 bg-red-600 hover:bg-red-700 font-bold text-base gap-2">
                {isWithdrawing ? <><Loader2 className="h-4 w-4 animate-spin" /> A processar...</> : <><Minus className="h-4 w-4" /> Sacar {withdrawAmount ? `${Number(withdrawAmount).toLocaleString()} Kz` : ''}</>}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Overview / History Tab */}
        {(activeTab === 'overview' || activeTab === 'history') && (
          <Card className="border-white/10 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                {activeTab === 'overview' ? 'Transações Recentes' : 'Todas as Transações'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(activeTab === 'overview' ? (wallet?.recentTransactions || []) : transactions).length === 0 ? (
                <div className="text-center py-8">
                  <Wallet className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Sem transações ainda</p>
                  <p className="text-xs text-muted-foreground mt-1">Faz um depósito para começar!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(activeTab === 'overview' ? (wallet?.recentTransactions || []) : transactions).map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        {typeIcon(tx.type)}
                        <div>
                          <p className="text-sm font-medium">{tx.description || tx.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString('pt-AO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.amount >= 0 ? '+' : ''}{tx.amount.toLocaleString()} Kz
                        </span>
                        {statusIcon(tx.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
