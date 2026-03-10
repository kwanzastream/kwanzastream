'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { StatCard } from '@/components/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
    BarChart3, Eye, Users, Clock, TrendingUp, ArrowLeft,
    Calendar
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function StudioAnalyticsPage() {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [period, setPeriod] = useState<'7' | '30' | '90'>('7')
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isLoading && !isLoggedIn) router.push('/auth')
    }, [isLoggedIn, isLoading, router])

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${API_URL}/api/creator/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                })
                if (res.ok) setStats(await res.json())
            } catch (err) {
                console.error('Erro ao carregar analytics:', err)
            } finally {
                setLoading(false)
            }
        }
        if (isLoggedIn) fetchAnalytics()
    }, [isLoggedIn, period])

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
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/studio')} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h1>
                        <p className="text-sm text-muted-foreground">Acompanha o desempenho do teu canal</p>
                    </div>
                </div>

                {/* Period Selector */}
                <Tabs value={period} onValueChange={(v) => setPeriod(v as any)} className="mb-8">
                    <TabsList className="bg-surface-1 border border-border rounded-xl">
                        <TabsTrigger value="7" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
                            7 dias
                        </TabsTrigger>
                        <TabsTrigger value="30" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
                            30 dias
                        </TabsTrigger>
                        <TabsTrigger value="90" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
                            90 dias
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* KPI Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-5 rounded-2xl card-surface space-y-3">
                                <Skeleton className="h-10 w-10 rounded-xl" />
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            icon={<Eye className="h-5 w-5" />}
                            label="Total de Viewers"
                            value={stats?.data?.totalViewers?.toLocaleString('pt-AO') || '0'}
                            trend={{ value: '+12%', direction: 'up' }}
                            accentColor="bg-primary/10"
                            iconColor="text-primary"
                        />
                        <StatCard
                            icon={<Clock className="h-5 w-5" />}
                            label="Horas Assistidas"
                            value={stats?.data?.totalHoursWatched?.toFixed(1) || '0'}
                            trend={{ value: '+8%', direction: 'up' }}
                            accentColor="bg-secondary/10"
                            iconColor="text-secondary"
                        />
                        <StatCard
                            icon={<Users className="h-5 w-5" />}
                            label="Novos Seguidores"
                            value={stats?.data?.newFollowers?.toLocaleString('pt-AO') || '0'}
                            trend={{ value: '+23%', direction: 'up' }}
                            accentColor="bg-accent/10"
                            iconColor="text-accent"
                        />
                        <StatCard
                            icon={<BarChart3 className="h-5 w-5" />}
                            label="Pico de Viewers"
                            value={stats?.data?.peakViewers?.toLocaleString('pt-AO') || '0'}
                            trend={{ value: '+5%', direction: 'up' }}
                            accentColor="bg-green-500/10"
                            iconColor="text-green-400"
                        />
                    </div>
                )}

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card className="card-surface rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Viewers por Dia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                                {/* Placeholder para gráfico — integrar Recharts quando disponível */}
                                <div className="flex items-end gap-1 h-32">
                                    {Array.from({ length: Number(period) > 30 ? 30 : Number(period) }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-2 bg-primary/40 rounded-t hover:bg-primary transition-colors"
                                            style={{ height: `${Math.random() * 100 + 20}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card-surface rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="h-5 w-5 text-accent" />
                                Crescimento de Followers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                                <div className="flex items-end gap-1 h-32">
                                    {Array.from({ length: Number(period) > 30 ? 30 : Number(period) }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-2 bg-accent/40 rounded-t hover:bg-accent transition-colors"
                                            style={{ height: `${Math.min(100, (i / Number(period)) * 100 + Math.random() * 30)}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Categories */}
                <Card className="card-surface rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-secondary" />
                            Top Categorias por Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {['Gaming', 'Música', 'Conversa & IRL', 'Kuduro'].map((cat, i) => (
                                <div key={cat} className="flex items-center gap-4 p-3 rounded-xl hover:surface-3 transition-colors">
                                    <span className="text-xl font-bold text-muted-foreground w-8">#{i + 1}</span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{cat}</p>
                                        <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 500 + 100)} viewers médios</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-primary">{Math.floor(Math.random() * 20 + 5)}h</p>
                                        <p className="text-[10px] text-muted-foreground">streaming</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
