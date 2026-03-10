"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { clipsService, streamService } from "@/lib/services"
import { useAuth } from "@/lib/auth-context"
import {
    ArrowLeft, Scissors, Clock, Play, AlertCircle, Check, Loader2
} from "lucide-react"

interface StreamOption {
    id: string
    title: string
    category?: string
    status: string
    startedAt?: string
}

export default function CreateClipPage() {
    const router = useRouter()
    const { user, isLoggedIn } = useAuth()

    const [streams, setStreams] = React.useState<StreamOption[]>([])
    const [selectedStream, setSelectedStream] = React.useState<string>('')
    const [title, setTitle] = React.useState('')
    const [startTime, setStartTime] = React.useState(0)
    const [endTime, setEndTime] = React.useState(30)
    const [loading, setLoading] = React.useState(true)
    const [submitting, setSubmitting] = React.useState(false)
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState(false)

    // Load user streams
    React.useEffect(() => {
        const load = async () => {
            if (!user?.id) { setLoading(false); return }
            try {
                const res = await streamService.getUserStreams(user.id, 1, 50)
                const allStreams = res.data.streams || res.data || []
                setStreams(allStreams)
                if (allStreams.length > 0) setSelectedStream(allStreams[0].id)
            } catch { }
            setLoading(false)
        }
        load()
    }, [user?.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!selectedStream) { setError('Selecciona uma stream'); return }
        if (!title.trim()) { setError('O título é obrigatório'); return }
        if (title.length < 3) { setError('O título deve ter pelo menos 3 caracteres'); return }
        if (endTime <= startTime) { setError('O tempo final deve ser maior que o inicial'); return }
        if (endTime - startTime > 60) { setError('O clip não pode ter mais de 60 segundos'); return }
        if (endTime - startTime < 5) { setError('O clip deve ter pelo menos 5 segundos'); return }

        setSubmitting(true)
        try {
            await clipsService.create({
                streamId: selectedStream,
                title: title.trim(),
                startTime,
                endTime,
            })
            setSuccess(true)
            setTimeout(() => router.push('/clips'), 2000)
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Erro ao criar clip. Tenta novamente.')
        } finally {
            setSubmitting(false)
        }
    }

    const duration = Math.max(0, endTime - startTime)

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <Scissors className="w-16 h-16 text-muted-foreground/20 mx-auto" />
                        <p className="text-xl font-bold">Faz login para criar clips</p>
                        <Button onClick={() => router.push('/auth')} className="gap-2">Entrar</Button>
                    </div>
                </main>
                <MobileNav />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
                <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/clips')} className="shrink-0">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                                <Scissors className="w-6 h-6 text-primary" /> Criar Clip
                            </h1>
                            <p className="text-sm text-muted-foreground">Recorta os melhores momentos das tuas streams</p>
                        </div>
                    </div>

                    {success ? (
                        <div className="text-center py-16 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                                <Check className="w-8 h-8 text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold">Clip Criado!</h2>
                            <p className="text-sm text-muted-foreground">O teu clip está a ser processado e ficará disponível em breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Stream Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Stream de Origem
                                </label>
                                {loading ? (
                                    <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                                ) : streams.length === 0 ? (
                                    <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-sm text-yellow-300 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>Sem streams disponíveis. Faz uma live primeiro!</span>
                                    </div>
                                ) : (
                                    <select
                                        value={selectedStream}
                                        onChange={e => setSelectedStream(e.target.value)}
                                        className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        {streams.map(s => (
                                            <option key={s.id} value={s.id} className="bg-[#1a1a2e]">
                                                {s.title} {s.category ? `(${s.category})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Título do Clip
                                </label>
                                <Input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Ex: Jogada incrível no FIFA..."
                                    className="h-12 bg-white/5 border-white/10 rounded-xl text-sm"
                                    maxLength={100}
                                />
                                <p className="text-xs text-muted-foreground text-right">{title.length}/100</p>
                            </div>

                            {/* Time Range */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Intervalo de Tempo
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-muted-foreground">Início (segundos)</label>
                                        <Input
                                            type="number"
                                            value={startTime}
                                            onChange={e => setStartTime(Math.max(0, parseInt(e.target.value) || 0))}
                                            min={0}
                                            className="h-12 bg-white/5 border-white/10 rounded-xl text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-muted-foreground">Fim (segundos)</label>
                                        <Input
                                            type="number"
                                            value={endTime}
                                            onChange={e => setEndTime(Math.max(0, parseInt(e.target.value) || 0))}
                                            min={0}
                                            className="h-12 bg-white/5 border-white/10 rounded-xl text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Duration Preview */}
                                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">
                                        Duração: <span className={`font-black ${duration >= 5 && duration <= 60 ? 'text-green-400' : 'text-red-400'}`}>
                                            {duration}s
                                        </span>
                                    </span>
                                    <span className="text-xs text-muted-foreground">(5-60 seg)</span>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={submitting || !selectedStream || !title.trim()}
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold text-base gap-2"
                            >
                                {submitting ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Criando...</>
                                ) : (
                                    <><Scissors className="w-5 h-5" /> Criar Clip</>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </main>
            <MobileNav />
        </div>
    )
}
