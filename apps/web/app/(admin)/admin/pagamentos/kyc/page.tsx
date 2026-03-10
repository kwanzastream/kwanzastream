'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatCard } from '@/components/stat-card'
import {
    Shield, ArrowLeft, CheckCircle, XCircle, Clock,
    FileText, Eye
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface KYCApplication {
    id: string
    userId: string
    displayName: string
    username: string
    documentType: string
    status: 'pending' | 'approved' | 'rejected'
    submittedAt: string
    currentTier: number
    requestedTier: number
}

// Dados de exemplo para demonstração
const SAMPLE_APPLICATIONS: KYCApplication[] = [
    { id: '1', userId: 'u1', displayName: 'João Luanda', username: 'joaoluanda', documentType: 'BI', status: 'pending', submittedAt: '2026-03-06', currentTier: 0, requestedTier: 1 },
    { id: '2', userId: 'u2', displayName: 'Maria Benguela', username: 'mariab', documentType: 'Passaporte', status: 'pending', submittedAt: '2026-03-05', currentTier: 0, requestedTier: 1 },
    { id: '3', userId: 'u3', displayName: 'Pedro Gaming', username: 'pedrogaming', documentType: 'BI + Morada', status: 'pending', submittedAt: '2026-03-05', currentTier: 1, requestedTier: 2 },
    { id: '4', userId: 'u4', displayName: 'Ana Criativa', username: 'anacriativa', documentType: 'BI', status: 'approved', submittedAt: '2026-03-03', currentTier: 1, requestedTier: 1 },
    { id: '5', userId: 'u5', displayName: 'Carlos Show', username: 'carlosshow', documentType: 'Passaporte', status: 'rejected', submittedAt: '2026-03-02', currentTier: 0, requestedTier: 1 },
]

export default function AdminKYCPage() {
    const router = useRouter()
    const [applications, setApplications] = useState(SAMPLE_APPLICATIONS)
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3000)
    }

    const pending = applications.filter(a => a.status === 'pending')
    const approved = applications.filter(a => a.status === 'approved')
    const rejected = applications.filter(a => a.status === 'rejected')

    const handleApprove = async (app: KYCApplication) => {
        try {
            const res = await fetch(`${API_URL}/api/users/${app.userId}/kyc`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ kycTier: app.requestedTier, status: 'approved' }),
            })
            setApplications(apps => apps.map(a => a.id === app.id ? { ...a, status: 'approved' as const } : a))
            showToast(`${app.displayName} aprovado para Tier ${app.requestedTier}!`)
        } catch {
            setApplications(apps => apps.map(a => a.id === app.id ? { ...a, status: 'approved' as const } : a))
            showToast(`${app.displayName} aprovado localmente (API indisponível).`)
        }
    }

    const handleReject = async (app: KYCApplication) => {
        if (!confirm(`Rejeitar verificação de ${app.displayName}?`)) return
        try {
            await fetch(`${API_URL}/api/users/${app.userId}/kyc`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status: 'rejected' }),
            })
        } catch { }
        setApplications(apps => apps.map(a => a.id === app.id ? { ...a, status: 'rejected' as const } : a))
        showToast(`Verificação de ${app.displayName} rejeitada.`)
    }

    const statusConfig = {
        pending: { label: 'Pendente', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
        approved: { label: 'Aprovado', color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
        rejected: { label: 'Rejeitado', color: 'text-red-400', bg: 'bg-red-500/10', icon: XCircle },
    }

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in ${toast.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    {toast.msg}
                </div>
            )}
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 pb-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Aprovação KYC</h1>
                        <p className="text-sm text-muted-foreground">Analisa e aprova verificações de identidade</p>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard icon={<Clock className="h-5 w-5" />} label="Pendentes" value={pending.length} accentColor="bg-amber-500/10" iconColor="text-amber-400" />
                    <StatCard icon={<CheckCircle className="h-5 w-5" />} label="Aprovados" value={approved.length} accentColor="bg-green-500/10" iconColor="text-green-400" />
                    <StatCard icon={<XCircle className="h-5 w-5" />} label="Rejeitados" value={rejected.length} accentColor="bg-red-500/10" iconColor="text-red-400" />
                </div>

                {/* Pending Queue */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-400" />
                            Fila de Pendentes ({pending.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pending.length === 0 ? (
                            <div className="py-12 text-center">
                                <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground text-sm">Sem aplicações pendentes! 🎉</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pending.map((app) => (
                                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:surface-3 transition-colors">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary/20 text-xs font-bold">{app.displayName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold">{app.displayName}</p>
                                            <p className="text-xs text-muted-foreground">
                                                @{app.username} · {app.documentType} · Tier {app.currentTier} → {app.requestedTier}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
                                                onClick={() => router.push(`/profile/${app.userId}`)} title="Ver perfil">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-lg gap-1 text-xs" onClick={() => handleApprove(app)}>
                                                <CheckCircle className="h-3.5 w-3.5" /> Aprovar
                                            </Button>
                                            <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg gap-1 text-xs bg-transparent" onClick={() => handleReject(app)}>
                                                <XCircle className="h-3.5 w-3.5" /> Rejeitar
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* History */}
                <Card className="card-surface rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            Histórico
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[...approved, ...rejected].map((app) => {
                                const config = statusConfig[app.status]
                                const Icon = config.icon
                                return (
                                    <div key={app.id} className="flex items-center gap-4 p-3 rounded-xl hover:surface-3 transition-colors">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bg}`}>
                                            <Icon className={`h-4 w-4 ${config.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{app.displayName}</p>
                                            <p className="text-xs text-muted-foreground">{app.documentType} · {app.submittedAt}</p>
                                        </div>
                                        <Badge className={`${config.color} bg-transparent border-current/20 text-xs`}>
                                            {config.label}
                                        </Badge>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
