'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/stat-card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft, Upload, Shield, CheckCircle, AlertCircle,
    FileText, Star, Lock, Wallet, Radio, Users, TrendingUp
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * KYC Twitch-style — verificação automática baseada em critérios.
 * Não há aprovação manual. O sistema promove o creator automaticamente
 * quando atinge os requisitos (semelhante ao Twitch Affiliate/Partner).
 * 
 * Tier 0 → Tier 1 (Afiliado): Verificação automática quando:
 *   - ≥ 3 streams realizadas
 *   - ≥ 50 seguidores
 *   - Telefone verificado (já é requisito para login)
 *   - Upload de selfie com BI (para compliance BNA)
 * 
 * Tier 1 → Tier 2 (Parceiro): Verificação automática quando:
 *   - ≥ 25 streams nos últimos 30 dias
 *   - ≥ 500 seguidores
 *   - Média de ≥ 10 viewers simultâneos
 *   - Upload de comprovativo de morada
 */

const TIERS = [
    {
        tier: 0,
        label: 'Novo Streamer',
        description: 'Começa a tua jornada como creator',
        limit: 'Não pode sacar',
        color: 'text-muted-foreground',
        bg: 'bg-muted',
        border: 'border-border',
        icon: Radio,
        emoji: '🌱',
    },
    {
        tier: 1,
        label: 'Afiliado Kwanza',
        description: 'Começa a monetizar o teu conteúdo',
        limit: 'Saque até 50.000 Kz/mês',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        icon: Shield,
        emoji: '💎',
    },
    {
        tier: 2,
        label: 'Parceiro Kwanza',
        description: 'O topo dos creators angolanos',
        limit: 'Sem limite de saque',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        icon: Star,
        emoji: '👑',
    },
]

interface CreatorProgress {
    totalStreams: number
    followers: number
    avgViewers: number
    recentStreams: number // últimos 30 dias
    selfieUploaded: boolean
    addressUploaded: boolean
}

export default function StudioKYCPage() {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [currentTier, setCurrentTier] = useState(0)
    const [progress, setProgress] = useState<CreatorProgress>({
        totalStreams: 0,
        followers: 0,
        avgViewers: 0,
        recentStreams: 0,
        selfieUploaded: false,
        addressUploaded: false,
    })

    useEffect(() => {
        if (!isLoading && !isLoggedIn) router.push('/auth')
    }, [isLoggedIn, isLoading, router])

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${API_URL}/api/creator/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                })
                if (res.ok) {
                    const data = await res.json()
                    setCurrentTier(data.data?.profile?.kycTier || 0)
                    setProgress({
                        totalStreams: data.data?.totalStreams || 0,
                        followers: data.data?.followers || 0,
                        avgViewers: data.data?.avgViewers || 0,
                        recentStreams: data.data?.recentStreams || 0,
                        selfieUploaded: data.data?.profile?.kycDocumentUrl ? true : false,
                        addressUploaded: data.data?.profile?.kycTier >= 2,
                    })
                }
            } catch (err) {
                console.error('Erro ao carregar progresso:', err)
            }
        }
        if (isLoggedIn) fetchProgress()
    }, [isLoggedIn])

    if (isLoading || !isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary" />
            </div>
        )
    }

    // Tier 1 requirements
    const tier1Requirements = [
        { label: '3+ streams realizadas', met: progress.totalStreams >= 3, current: `${progress.totalStreams}/3`, icon: Radio },
        { label: '50+ seguidores', met: progress.followers >= 50, current: `${progress.followers}/50`, icon: Users },
        { label: 'Telefone verificado', met: true, current: '✓', icon: CheckCircle }, // sempre verdade — login é por OTP
        { label: 'Upload de selfie com BI', met: progress.selfieUploaded, current: progress.selfieUploaded ? '✓' : 'Pendente', icon: FileText },
    ]

    const tier2Requirements = [
        { label: '25+ streams nos últimos 30 dias', met: progress.recentStreams >= 25, current: `${progress.recentStreams}/25`, icon: Radio },
        { label: '500+ seguidores', met: progress.followers >= 500, current: `${progress.followers}/500`, icon: Users },
        { label: '10+ viewers médios', met: progress.avgViewers >= 10, current: `${Math.floor(progress.avgViewers)}/10`, icon: TrendingUp },
        { label: 'Comprovativo de morada', met: progress.addressUploaded, current: progress.addressUploaded ? '✓' : 'Pendente', icon: FileText },
    ]

    const tier1Progress = tier1Requirements.filter(r => r.met).length
    const tier2Progress = tier2Requirements.filter(r => r.met).length
    const tier1Pct = (tier1Progress / tier1Requirements.length) * 100
    const tier2Pct = (tier2Progress / tier2Requirements.length) * 100

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/studio')} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Programa de Creator</h1>
                        <p className="text-sm text-muted-foreground">Evolui o teu canal e desbloqueia novas funcionalidades</p>
                    </div>
                </div>

                {/* Current Tier Banner */}
                <Card className={`rounded-2xl mb-8 border-2 ${TIERS[currentTier].border}`}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${TIERS[currentTier].bg}`}>
                                {TIERS[currentTier].emoji}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h2 className={`text-xl font-bold ${TIERS[currentTier].color}`}>{TIERS[currentTier].label}</h2>
                                    <Badge className={`${TIERS[currentTier].color} bg-transparent border-current/20 text-xs`}>
                                        Tier {currentTier}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{TIERS[currentTier].description}</p>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                                    <Wallet className="h-3.5 w-3.5" /> {TIERS[currentTier].limit}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tier Progression Path */}
                <div className="space-y-6">
                    {/* Tier 1 — Afiliado */}
                    <Card className={`rounded-2xl ${currentTier >= 1 ? 'opacity-60' : ''}`}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-3">
                                    <span className="text-xl">💎</span>
                                    Afiliado Kwanza
                                    {currentTier >= 1 && <Badge className="bg-green-500/10 text-green-400 border-transparent text-xs">Alcançado ✓</Badge>}
                                </CardTitle>
                                {currentTier < 1 && (
                                    <span className="text-sm font-semibold text-muted-foreground">
                                        {tier1Progress}/{tier1Requirements.length} requisitos
                                    </span>
                                )}
                            </div>
                            {currentTier < 1 && (
                                <Progress value={tier1Pct} className="h-2 mt-3" />
                            )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {tier1Requirements.map((req, i) => {
                                const Icon = req.icon
                                return (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${req.met ? 'bg-green-500/10' : 'bg-muted'}`}>
                                            {req.met ? (
                                                <CheckCircle className="h-4 w-4 text-green-400" />
                                            ) : (
                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${req.met ? 'text-green-400 line-through' : ''}`}>
                                                {req.label}
                                            </p>
                                        </div>
                                        <span className={`text-xs font-semibold ${req.met ? 'text-green-400' : 'text-muted-foreground'}`}>
                                            {req.current}
                                        </span>
                                        {!req.met && req.label.includes('Upload') && (
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg gap-1.5 text-xs">
                                                <Upload className="h-3.5 w-3.5" /> Enviar
                                            </Button>
                                        )}
                                    </div>
                                )
                            })}
                            {currentTier < 1 && (
                                <p className="text-xs text-muted-foreground pt-2">
                                    💡 Quando cumprires todos os requisitos, serás promovido automaticamente a Afiliado Kwanza!
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tier 2 — Parceiro */}
                    <Card className={`rounded-2xl ${currentTier < 1 ? 'opacity-40' : currentTier >= 2 ? 'opacity-60' : ''}`}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-3">
                                    <span className="text-xl">👑</span>
                                    Parceiro Kwanza
                                    {currentTier >= 2 && <Badge className="bg-amber-500/10 text-amber-400 border-transparent text-xs">Alcançado ✓</Badge>}
                                    {currentTier < 1 && (
                                        <Badge className="bg-muted text-muted-foreground border-transparent text-xs flex items-center gap-1">
                                            <Lock className="h-3 w-3" /> Requer Afiliado
                                        </Badge>
                                    )}
                                </CardTitle>
                                {currentTier === 1 && (
                                    <span className="text-sm font-semibold text-muted-foreground">
                                        {tier2Progress}/{tier2Requirements.length} requisitos
                                    </span>
                                )}
                            </div>
                            {currentTier === 1 && (
                                <Progress value={tier2Pct} className="h-2 mt-3" />
                            )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {tier2Requirements.map((req, i) => {
                                const Icon = req.icon
                                return (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${req.met ? 'bg-green-500/10' : 'bg-muted'}`}>
                                            {req.met ? (
                                                <CheckCircle className="h-4 w-4 text-green-400" />
                                            ) : (
                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${req.met ? 'text-green-400 line-through' : ''}`}>
                                                {req.label}
                                            </p>
                                        </div>
                                        <span className={`text-xs font-semibold ${req.met ? 'text-green-400' : 'text-muted-foreground'}`}>
                                            {req.current}
                                        </span>
                                        {!req.met && req.label.includes('Comprovativo') && currentTier >= 1 && (
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg gap-1.5 text-xs">
                                                <Upload className="h-3.5 w-3.5" /> Enviar
                                            </Button>
                                        )}
                                    </div>
                                )
                            })}
                            {currentTier === 1 && (
                                <p className="text-xs text-muted-foreground pt-2">
                                    👑 Quando cumprires todos os requisitos, serás promovido automaticamente a Parceiro Kwanza!
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Benefits Comparison */}
                <Card className="card-surface rounded-2xl mt-8">
                    <CardHeader>
                        <CardTitle className="text-lg">Benefícios por Tier</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 pr-4 text-muted-foreground font-medium">Benefício</th>
                                        <th className="text-center py-3 px-4 font-medium">🌱 Novo</th>
                                        <th className="text-center py-3 px-4 font-medium text-blue-400">💎 Afiliado</th>
                                        <th className="text-center py-3 px-4 font-medium text-amber-400">👑 Parceiro</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { benefit: 'Streaming ilimitado', t0: true, t1: true, t2: true },
                                        { benefit: 'Chat e comunidade', t0: true, t1: true, t2: true },
                                        { benefit: 'Receber Salos', t0: false, t1: true, t2: true },
                                        { benefit: 'Sacar ganhos', t0: false, t1: true, t2: true },
                                        { benefit: 'Limite de saque', t0: '—', t1: '50K Kz/mês', t2: 'Ilimitado' },
                                        { benefit: 'Badge verificado', t0: false, t1: true, t2: true },
                                        { benefit: 'Badge parceiro', t0: false, t1: false, t2: true },
                                        { benefit: 'Suporte prioritário', t0: false, t1: false, t2: true },
                                        { benefit: 'Eventos exclusivos', t0: false, t1: false, t2: true },
                                        { benefit: 'Destaque no explore', t0: false, t1: false, t2: true },
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="py-3 pr-4">{row.benefit}</td>
                                            {[row.t0, row.t1, row.t2].map((val, j) => (
                                                <td key={j} className="text-center py-3 px-4">
                                                    {typeof val === 'boolean' ? (
                                                        val ? <CheckCircle className="h-4 w-4 text-green-400 mx-auto" /> : <span className="text-muted-foreground">—</span>
                                                    ) : (
                                                        <span className="text-xs font-medium">{val}</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
