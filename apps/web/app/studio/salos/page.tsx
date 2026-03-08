'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { StatCard } from '@/components/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { Gift, ArrowLeft, Crown, Trophy, Download, DollarSign } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const SALO_TIERS: Record<string, { label: string; color: string; value: string }> = {
    bronze: { label: 'Bronze', color: 'text-amber-600', value: '50 Kz' },
    silver: { label: 'Prata', color: 'text-gray-300', value: '200 Kz' },
    gold: { label: 'Ouro', color: 'text-yellow-400', value: '1.000 Kz' },
    diamond: { label: 'Diamante', color: 'text-blue-400', value: '5.000 Kz' },
    legendary: { label: 'Lendário', color: 'text-red-400', value: '10.000 Kz' },
}

interface Donation {
    id: string
    amount: number
    saloType: string
    message?: string
    createdAt: string
    sender: { id: string; displayName?: string; username?: string; avatarUrl?: string }
}

export default function StudioSalosPage() {
    const { isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [donations, setDonations] = useState<Donation[]>([])
    const [loading, setLoading] = useState(true)
    const [totalReceived, setTotalReceived] = useState(0)

    useEffect(() => {
        if (!isLoading && !isLoggedIn) router.push('/auth')
    }, [isLoggedIn, isLoading, router])

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${API_URL}/api/creator/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                })
                if (res.ok) {
                    const data = await res.json()
                    setTotalReceived(data.data?.totalEarnings || 0)
                    setDonations(data.data?.recentDonations || [])
                }
            } catch (err) {
                console.error('Erro ao carregar doações:', err)
            } finally {
                setLoading(false)
            }
        }
        if (isLoggedIn) fetchDonations()
    }, [isLoggedIn])

    const formatKz = (amount: number) => {
        return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz'
    }

    const handleExport = () => {
        const header = 'Data,Remetente,Tier,Valor (Kz),Mensagem\n'
        const rows = donations.map(d =>
            `${new Date(d.createdAt).toLocaleDateString('pt-AO')},${d.sender?.displayName || d.sender?.username || 'Anónimo'},${d.saloType},${d.amount},"${(d.message || '').replace(/"/g, '""')}"`
        ).join('\n')
        const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `salos_kwanza_${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    if (isLoading || !isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/studio')} className="rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Salos Recebidos</h1>
                            <p className="text-sm text-muted-foreground">Gere as tuas doações e top apoiadores</p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2 rounded-xl border-border bg-transparent" onClick={handleExport} aria-label="Exportar CSV">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Exportar</span>
                    </Button>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard
                        icon={<Gift className="h-5 w-5" />}
                        label="Total Recebido"
                        value={formatKz(totalReceived)}
                        trend={{ value: '+18%', direction: 'up' }}
                        accentColor="bg-primary/10"
                        iconColor="text-primary"
                    />
                    <StatCard
                        icon={<Crown className="h-5 w-5" />}
                        label="Doações este Mês"
                        value={donations.length.toString()}
                        accentColor="bg-secondary/10"
                        iconColor="text-secondary"
                    />
                    <StatCard
                        icon={<Trophy className="h-5 w-5" />}
                        label="Top Tier Mais Recebido"
                        value="Ouro"
                        accentColor="bg-amber-500/10"
                        iconColor="text-amber-400"
                    />
                </div>

                {/* Salo Tiers Reference */}
                <Card className="card-surface rounded-2xl mb-8">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Gift className="h-5 w-5 text-primary" />
                            Tiers de Salos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {Object.entries(SALO_TIERS).map(([key, tier]) => (
                                <div key={key} className="p-3 rounded-xl surface-2 border border-border text-center">
                                    <p className={`font-bold text-sm ${tier.color}`}>{tier.label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tier.value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Donations */}
                <Card className="card-surface rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-400" />
                            Doações Recentes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-4 p-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-48" />
                                        </div>
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                ))}
                            </div>
                        ) : donations.length === 0 ? (
                            <div className="py-12 text-center">
                                <Gift className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground text-sm">Ainda não recebeste nenhum Salo.</p>
                                <p className="text-muted-foreground text-xs mt-1">Faz uma live e os apoiadores vão aparecer! 🇦🇴</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {donations.map((donation) => {
                                    const tier = SALO_TIERS[donation.saloType] || SALO_TIERS.bronze
                                    return (
                                        <div key={donation.id} className="flex items-center gap-4 p-3 rounded-xl hover:surface-3 transition-colors">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={donation.sender?.avatarUrl || undefined} />
                                                <AvatarFallback className="bg-primary/20 text-xs font-bold">
                                                    {(donation.sender?.displayName || 'U')[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold">
                                                    {donation.sender?.displayName || donation.sender?.username || 'Anónimo'}
                                                </p>
                                                {donation.message && (
                                                    <p className="text-xs text-muted-foreground truncate">&quot;{donation.message}&quot;</p>
                                                )}
                                            </div>
                                            <div className="text-right shrink-0">
                                                <Badge className={`${tier.color} bg-transparent border-current/20 font-bold text-xs`}>
                                                    {tier.label}
                                                </Badge>
                                                <p className="text-xs font-bold mt-1">{formatKz(donation.amount)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
