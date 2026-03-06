"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { clipsService } from "@/lib/services"
import {
    ArrowLeft, Play, Eye, Clock, Share2, Heart, Link2,
    ChevronRight, Calendar
} from "lucide-react"

interface ClipData {
    id: string
    title: string
    thumbnailUrl?: string
    videoUrl?: string
    duration: number
    startTime: number
    viewCount: number
    likeCount?: number
    createdAt: string
    creator: {
        id: string
        displayName?: string
        username?: string
        avatarUrl?: string
    }
    stream?: {
        id: string
        title: string
        category?: string
    }
}

export default function ClipDetailPage() {
    const params = useParams()
    const router = useRouter()
    const clipId = params.id as string

    const [clip, setClip] = React.useState<ClipData | null>(null)
    const [related, setRelated] = React.useState<ClipData[]>([])
    const [loading, setLoading] = React.useState(true)
    const [copied, setCopied] = React.useState(false)
    const [liked, setLiked] = React.useState(false)

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await clipsService.getById(clipId)
                setClip(res.data.clip || res.data)
                // Track view
                clipsService.incrementView(clipId).catch(() => { })
                // Load related clips
                const trendingRes = await clipsService.trending(8)
                setRelated((trendingRes.data.clips || []).filter((c: ClipData) => c.id !== clipId).slice(0, 6))
            } catch {
                // Clip not found
            }
            setLoading(false)
        }
        if (clipId) load()
    }, [clipId])

    const formatDuration = (secs: number) => {
        const m = Math.floor(secs / 60)
        const s = secs % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('pt-AO', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const formatViews = (n: number) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
        if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
        return String(n)
    }

    const handleShare = async () => {
        const url = `${window.location.origin}/clips/${clipId}`
        if (navigator.share) {
            try {
                await navigator.share({ title: clip?.title || 'Clip', url })
            } catch { /* cancelled */ }
        } else {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleWhatsAppShare = () => {
        const url = `${window.location.origin}/clips/${clipId}`
        const text = `🎬 Vê este clip no Kwanza Stream: ${clip?.title}\n${url}`
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
                    <div className="animate-pulse space-y-4">
                        <div className="aspect-video rounded-2xl bg-white/5" />
                        <div className="h-8 bg-white/5 rounded w-2/3" />
                        <div className="h-4 bg-white/5 rounded w-1/3" />
                    </div>
                </main>
                <MobileNav />
            </div>
        )
    }

    if (!clip) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <Play className="w-16 h-16 text-muted-foreground/20 mx-auto" />
                        <p className="text-xl font-bold">Clip não encontrado</p>
                        <p className="text-sm text-muted-foreground">Este clip pode ter sido removido.</p>
                        <Button onClick={() => router.push('/clips')} variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Voltar aos Clips
                        </Button>
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
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Main Content */}
                        <div className="flex-1 space-y-4">
                            {/* Back Button */}
                            <Button variant="ghost" size="sm" onClick={() => router.push('/clips')} className="gap-2 text-muted-foreground hover:text-white -ml-2">
                                <ArrowLeft className="h-4 w-4" /> Clips
                            </Button>

                            {/* Video Player */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                                {clip.videoUrl ? (
                                    <video
                                        src={clip.videoUrl}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                        poster={clip.thumbnailUrl}
                                    />
                                ) : clip.thumbnailUrl ? (
                                    <div className="relative w-full h-full">
                                        <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                            <div className="bg-primary/90 rounded-full p-6 shadow-xl shadow-primary/30">
                                                <Play className="w-10 h-10 fill-white text-white" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                                        <Play className="w-16 h-16 text-white/30" />
                                    </div>
                                )}
                            </div>

                            {/* Clip Info */}
                            <div className="space-y-3">
                                <h1 className="text-xl md:text-2xl font-black tracking-tight">{clip.title}</h1>

                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" /> {formatViews(clip.viewCount)} visualizações
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> {formatDuration(clip.duration)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" /> {formatDate(clip.createdAt)}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={`gap-2 border-white/10 ${liked ? 'text-red-400 bg-red-400/10 border-red-400/30' : ''}`}
                                        onClick={() => setLiked(!liked)}
                                    >
                                        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                                        {clip.likeCount || 0}
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2 border-white/10" onClick={handleShare}>
                                        <Share2 className="w-4 h-4" /> Partilhar
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2 border-white/10 text-green-400 hover:text-green-300" onClick={handleWhatsAppShare}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.29-1.24l-.29-.18-3.12.82.84-3.04-.2-.3A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
                                        </svg>
                                        WhatsApp
                                    </Button>
                                    <Button
                                        variant="outline" size="sm"
                                        className="gap-2 border-white/10"
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(`${window.location.origin}/clips/${clipId}`)
                                            setCopied(true)
                                            setTimeout(() => setCopied(false), 2000)
                                        }}
                                    >
                                        <Link2 className="w-4 h-4" /> {copied ? 'Copiado!' : 'Copiar Link'}
                                    </Button>
                                </div>
                            </div>

                            {/* Creator Card */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => router.push(`/u/${clip.creator?.username || clip.creator?.id}`)}
                                >
                                    <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                                        <AvatarImage src={clip.creator?.avatarUrl} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold">
                                            {(clip.creator?.displayName || clip.creator?.username || '?')[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm">{clip.creator?.displayName || clip.creator?.username}</p>
                                        <p className="text-xs text-muted-foreground">@{clip.creator?.username}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-white/10" onClick={() => router.push(`/u/${clip.creator?.username || clip.creator?.id}`)}>
                                    Ver Perfil
                                </Button>
                            </div>

                            {/* From Stream */}
                            {clip.stream && (
                                <div
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] cursor-pointer hover:bg-white/[0.05] transition-colors"
                                    onClick={() => router.push(`/watch/${clip.stream?.id}`)}
                                >
                                    <Badge variant="outline" className="border-primary/30 text-primary text-xs shrink-0">STREAM</Badge>
                                    <p className="text-sm truncate flex-1">{clip.stream.title}</p>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                                </div>
                            )}
                        </div>

                        {/* Related Clips Sidebar */}
                        <div className="w-full lg:w-80 space-y-4">
                            <h2 className="text-lg font-bold">Clips Relacionados</h2>
                            {related.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Sem clips relacionados</p>
                            ) : (
                                <div className="space-y-3">
                                    {related.map(r => (
                                        <div
                                            key={r.id}
                                            className="flex gap-3 cursor-pointer group"
                                            onClick={() => router.push(`/clips/${r.id}`)}
                                        >
                                            <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-black border border-white/10 shrink-0">
                                                {r.thumbnailUrl ? (
                                                    <img src={r.thumbnailUrl} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                                                        <Play className="w-5 h-5 text-white/30" />
                                                    </div>
                                                )}
                                                <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                                                    {formatDuration(r.duration)}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">{r.title}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{r.creator?.displayName || r.creator?.username}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                    <Eye className="w-3 h-3" /> {formatViews(r.viewCount)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <MobileNav />

            {/* Copied Toast */}
            {copied && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2">
                    ✓ Link copiado!
                </div>
            )}
        </div>
    )
}
