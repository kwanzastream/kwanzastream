'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/stat-card'
import { LiveBadge } from '@/components/live-badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Radio, ArrowLeft, Eye, Square, History, Users
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface StreamItem {
    id: string
    title: string
    category?: string
    status: string
    viewerCount: number
    streamer: { id: string; displayName?: string; username?: string }
    startedAt?: string
    endedAt?: string
}

export default function AdminStreamsPage() {
    const router = useRouter()
    const [streams, setStreams] = useState<StreamItem[]>([])
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3000)
    }

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const res = await fetch(`${API_URL}/api/streams/live?limit=50`, { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json()
                    setStreams(data.data?.streams || data.streams || data.data || [])
                }
            } catch (err) {
                console.error('Erro ao carregar streams:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStreams()
    }, [])

    const handleForceEnd = async (stream: StreamItem) => {
        if (!confirm(`Tens a certeza que queres forçar o fim de "${stream.title}"?`)) return
        try {
            const res = await fetch(`${API_URL}/api/streams/${stream.id}/end`, {
                method: 'POST',
                credentials: 'include',
            })
            if (res.ok) {
                setStreams(prev => prev.map(s => s.id === stream.id ? { ...s, status: 'ENDED' } : s))
                showToast(`Stream "${stream.title}" foi terminada.`)
            } else {
                showToast('Erro ao terminar stream.', 'error')
            }
        } catch {
            showToast('Erro de rede.', 'error')
        }
    }

    const liveStreams = streams.filter(s => s.status === 'LIVE')

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in ${toast.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    {toast.msg}
                </div>
            )}
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gestão de Streams</h1>
                        <p className="text-sm text-muted-foreground">Monitoriza e gere streams ao vivo</p>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard icon={<Radio className="h-5 w-5" />} label="Ao Vivo Agora" value={liveStreams.length} accentColor="bg-red-500/10" iconColor="text-red-400" />
                    <StatCard icon={<Users className="h-5 w-5" />} label="Viewers Totais" value={liveStreams.reduce((a, s) => a + s.viewerCount, 0)} accentColor="bg-primary/10" iconColor="text-primary" />
                    <StatCard icon={<History className="h-5 w-5" />} label="Total de Streams" value={streams.length} accentColor="bg-accent/10" iconColor="text-accent" />
                </div>

                {/* Live Streams */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Radio className="h-5 w-5 text-red-400" />
                            Streams Ao Vivo
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-4 p-3">
                                        <Skeleton className="h-10 w-10 rounded-xl" />
                                        <div className="flex-1 space-y-2"><Skeleton className="h-4 w-48" /><Skeleton className="h-3 w-24" /></div>
                                    </div>
                                ))}
                            </div>
                        ) : liveStreams.length === 0 ? (
                            <div className="py-12 text-center">
                                <Radio className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground text-sm">Nenhuma stream ao vivo no momento.</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {liveStreams.map((stream) => (
                                    <div key={stream.id} className="flex items-center gap-4 p-4 rounded-xl hover:surface-3 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                            <Radio className="h-5 w-5 text-red-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{stream.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {stream.streamer?.displayName || stream.streamer?.username} · {stream.viewerCount} viewers
                                            </p>
                                        </div>
                                        <LiveBadge variant="small" />
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => router.push(`/watch/${stream.id}`)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-400 hover:bg-red-500/10"
                                                onClick={() => handleForceEnd(stream)} title="Forçar fim">
                                                <Square className="h-4 w-4" />
                                            </Button>
                                        </div>
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
