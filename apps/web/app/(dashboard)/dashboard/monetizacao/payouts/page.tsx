'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { StatCard } from '@/components/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
    Wallet, ArrowLeft, ArrowUpRight, ArrowDownRight,
    Shield, AlertCircle, CheckCircle
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Transaction {
    id: string
    amount: number
    type: string
    description: string
    createdAt: string
}

export default function StudioWalletPage() {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [balance, setBalance] = useState(0)
    const [pendingBalance, setPendingBalance] = useState(0)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [kycTier, setKycTier] = useState(0)
    const [toast, setToast] = useState<string | null>(null)

    useEffect(() => {
        if (!isLoading && !isLoggedIn) router.push('/auth')
    }, [isLoggedIn, isLoading, router])

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${API_URL}/api/creator/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                })
                if (res.ok) {
                    const data = await res.json()
                    setBalance(data.data?.balance || 0)
                    setPendingBalance(data.data?.pendingBalance || 0)
                    setTransactions(data.data?.recentTransactions || [])
                    setKycTier(data.data?.profile?.kycTier || 0)
                }
            } catch (err) {
                console.error('Erro ao carregar wallet:', err)
            } finally {
                setLoading(false)
            }
        }
        if (isLoggedIn) fetchWalletData()
    }, [isLoggedIn])

    const formatKz = (amount: number) => new Intl.NumberFormat('pt-AO').format(amount) + ' Kz'

    const handleWithdraw = () => {
        if (kycTier === 0) {
            setToast('Verifica a tua identidade primeiro para poderes sacar.')
        } else if (balance <= 0) {
            setToast('Saldo insuficiente para saque.')
        } else {
            setToast('Funcionalidade de saque disponível em breve! 🚀')
        }
        setTimeout(() => setToast(null), 3000)
    }

    const kycStatus = {
        0: { label: 'Não Verificado', color: 'text-muted-foreground', bg: 'bg-muted', icon: AlertCircle },
        1: { label: 'Verificação Básica', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Shield },
        2: { label: 'Verificação Completa', color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
    }

    const currentKyc = kycStatus[kycTier as keyof typeof kycStatus] || kycStatus[0]
    const KycIcon = currentKyc.icon

    if (isLoading || !isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in bg-green-500/90 text-white">
                    {toast}
                </div>
            )}
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/studio')} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Wallet Creator</h1>
                        <p className="text-sm text-muted-foreground">Gere os teus ganhos e saques</p>
                    </div>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard
                        icon={<Wallet className="h-5 w-5" />}
                        label="Saldo Disponível"
                        value={formatKz(balance)}
                        accentColor="bg-green-500/10"
                        iconColor="text-green-400"
                    />
                    <StatCard
                        icon={<ArrowUpRight className="h-5 w-5" />}
                        label="Saldo Pendente"
                        value={formatKz(pendingBalance)}
                        accentColor="bg-amber-500/10"
                        iconColor="text-amber-400"
                    />
                    <StatCard
                        icon={<ArrowDownRight className="h-5 w-5" />}
                        label="Comissão (20%)"
                        value={formatKz(Math.floor(balance * 0.25))}
                        accentColor="bg-muted"
                        iconColor="text-muted-foreground"
                    />
                </div>

                {/* KYC Status + Withdraw */}
                <Card className="card-surface rounded-2xl mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentKyc.bg}`}>
                                    <KycIcon className={`h-6 w-6 ${currentKyc.color}`} />
                                </div>
                                <div>
                                    <p className="font-semibold">Status KYC</p>
                                    <p className={`text-sm font-medium ${currentKyc.color}`}>{currentKyc.label}</p>
                                    {kycTier < 2 && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {kycTier === 0 ? 'Verifica a tua identidade para começar a sacar' : 'Saque até 50.000 Kz/mês'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {kycTier < 2 && (
                                    <Button variant="outline" className="rounded-xl border-border bg-transparent" onClick={() => router.push('/studio/kyc')}>
                                        Verificar Identidade
                                    </Button>
                                )}
                                <Button
                                    className="bg-primary hover:bg-primary/90 rounded-xl gap-2"
                                    onClick={handleWithdraw}
                                >
                                    <Wallet className="h-4 w-4" />
                                    Sacar
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction History */}
                <Card className="card-surface rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Histórico de Transações</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex justify-between p-3"><Skeleton className="h-4 w-48" /><Skeleton className="h-4 w-20" /></div>
                                ))}
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="py-12 text-center">
                                <Wallet className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground text-sm">Sem transações ainda.</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:surface-3 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'WITHDRAWAL' ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                                                {tx.type === 'WITHDRAWAL' ? (
                                                    <ArrowUpRight className="h-4 w-4 text-red-400" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4 text-green-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{tx.description}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(tx.createdAt).toLocaleDateString('pt-AO')}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={`text-sm font-bold ${tx.type === 'WITHDRAWAL' ? 'text-red-400' : 'text-green-400'}`}>
                                            {tx.type === 'WITHDRAWAL' ? '-' : '+'}{formatKz(tx.amount)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
