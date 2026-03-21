"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Flame, Clock, Scissors, TrendingUp, CalendarDays } from "lucide-react"

import { MobileNav } from "@/components/mobile-nav"
import { clipsService } from "@/lib/services"
import { useAuth } from "@/lib/auth-context"

interface ClipItem {
    id: string; title: string; thumbnailUrl?: string; duration: number;
    viewCount: number; createdAt: string;
    creator: { id: string; displayName?: string; username?: string; avatarUrl?: string }
}

type SortMode = 'trending' | 'recent'

export default function ClipsPage() {
    const router = useRouter()
    const { isLoggedIn } = useAuth()
    const [clips, setClips] = React.useState<ClipItem[]>([])
    const [loading, setLoading] = React.useState(true)
    const [sortMode, setSortMode] = React.useState<SortMode>('trending')

    React.useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const res = await clipsService.trending(40)
                let items = res.data.clips || []
                if (sortMode === 'recent') {
                    items = [...items].sort((a: ClipItem, b: ClipItem) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                }
                setClips(items)
            } catch { }
            setLoading(false)
        }
        load()
    }, [sortMode])

    const formatDuration = (secs: number) => {
        const m = Math.floor(secs / 60)
        const s = secs % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const formatViews = (n: number) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
        if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
        return String(n)
    }

    const formatTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime()
        const hours = Math.floor(diff / 3600000)
        if (hours < 1) return 'Agora'
        if (hours < 24) return `${hours}h`
        const days = Math.floor(hours / 24)
        if (days < 7) return `${days}d`
        return `${Math.floor(days / 7)}sem`
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
                            <Flame className="w-6 h-6 text-primary" /> Clips
                        </h1>
                        <div className="flex items-center gap-2">
                            {isLoggedIn && (
                                <Button
                                    onClick={() => router.push('/clips/create')}
                                    className="gap-2 bg-primary hover:bg-primary/90 font-bold"
                                    size="sm"
                                >
                                    <Scissors className="w-4 h-4" /> Criar Clip
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Sort Filters */}
                    <div className="flex gap-2">
                        <Button
                            variant={sortMode === 'trending' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSortMode('trending')}
                            className={`gap-1.5 rounded-full ${sortMode === 'trending' ? 'bg-primary' : 'border-white/10 bg-transparent'}`}
                        >
                            <TrendingUp className="w-3.5 h-3.5" /> Em Alta
                        </Button>
                        <Button
                            variant={sortMode === 'recent' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSortMode('recent')}
                            className={`gap-1.5 rounded-full ${sortMode === 'recent' ? 'bg-primary' : 'border-white/10 bg-transparent'}`}
                        >
                            <CalendarDays className="w-3.5 h-3.5" /> Recentes
                        </Button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[9/16] rounded-xl bg-white/5" />
                                    <div className="mt-2 h-3 bg-white/5 rounded w-3/4" />
                                </div>
                            ))}
                        </div>
                    ) : clips.length === 0 ? (
                        <div className="text-center py-20">
                            <Play className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="font-bold text-lg">Sem clips ainda</p>
                            <p className="text-sm text-muted-foreground mt-1">Quando os creators criarem clips, aparecerão aqui</p>
                            {isLoggedIn && (
                                <Button onClick={() => router.push('/clips/create')} className="mt-4 gap-2">
                                    <Scissors className="w-4 h-4" /> Criar o Primeiro Clip
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {clips.map(clip => (
                                <div
                                    key={clip.id}
                                    className="group cursor-pointer"
                                    onClick={() => router.push(`/clips/${clip.id}`)}
                                >
                                    <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black border border-white/10">
                                        {clip.thumbnailUrl ? (
                                            <img src={clip.thumbnailUrl} alt={clip.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                                                <Play className="w-10 h-10 text-white/30" />
                                            </div>
                                        )}
                                        {/* Play overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                            <div className="bg-primary/90 rounded-full p-3 shadow-lg shadow-primary/20">
                                                <Play className="w-6 h-6 fill-white text-white" />
                                            </div>
                                        </div>
                                        {/* Duration */}
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {formatDuration(clip.duration)}
                                        </div>
                                        {/* Time ago */}
                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-medium text-white/80">
                                            {formatTimeAgo(clip.createdAt)}
                                        </div>
                                        {/* Bottom info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                                            <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-md">{clip.title}</h3>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <Avatar className="h-5 w-5 border border-white/20">
                                                    <AvatarImage src={clip.creator?.avatarUrl} />
                                                    <AvatarFallback className="text-[8px]">{(clip.creator?.displayName || clip.creator?.username || '?')[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-white/80 text-xs truncate">{clip.creator?.displayName || clip.creator?.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Views */}
                                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                        <Eye className="w-3 h-3" /> {formatViews(clip.viewCount)} visualizações
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <MobileNav />
        </div>
    )
}
