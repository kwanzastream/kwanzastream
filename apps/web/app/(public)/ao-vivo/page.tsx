"use client"

import { useEffect, useState, useCallback } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Radio, RefreshCw } from "lucide-react"

interface Stream {
    id: string
    title: string
    category: string
    viewerCount: number
    thumbnailUrl?: string
    streamer: { id: string; username: string; displayName: string; avatarUrl?: string }
}

const CATEGORY_FILTERS = [
    { slug: "", label: "Todos" },
    { slug: "gaming", label: "🎮 Gaming" },
    { slug: "musica", label: "🎵 Música" },
    { slug: "futebol", label: "⚽ Futebol" },
    { slug: "just-talking", label: "💬 Just Talking" },
    { slug: "irl", label: "📍 IRL" },
    { slug: "comedia", label: "😂 Comédia" },
    { slug: "tech", label: "💻 Tech" },
    { slug: "radio", label: "📻 Rádio" },
]

export default function AoVivoPage() {
    const [streams, setStreams] = useState<Stream[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    const fetchStreams = useCallback(async (silent = false) => {
        if (!silent) setLoading(true)
        else setRefreshing(true)
        try {
            const res = await api.get("/api/streams/live")
            setStreams(res.data?.streams || res.data || [])
        } catch {
            setStreams([])
        } finally {
            setLoading(false); setRefreshing(false)
        }
    }, [])

    useEffect(() => { fetchStreams() }, [fetchStreams])
    useEffect(() => {
        const interval = setInterval(() => fetchStreams(true), 30_000)
        return () => clearInterval(interval)
    }, [fetchStreams])

    const filtered = filter ? streams.filter((s) => s.category?.toLowerCase() === filter) : streams
    const totalViewers = filtered.reduce((acc, s) => acc + (s.viewerCount || 0), 0)

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Radio className="w-5 h-5 text-[#CE1126]" />
                        <h1 className="text-2xl font-bold">Ao Vivo</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} stream{filtered.length !== 1 ? "s" : ""} ao vivo · {totalViewers > 999 ? `${(totalViewers / 1000).toFixed(1)}k` : totalViewers} viewer{totalViewers !== 1 ? "s" : ""}
                    </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => fetchStreams(true)} disabled={refreshing}>
                    <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                </Button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORY_FILTERS.map((cat) => (
                    <button key={cat.slug} onClick={() => setFilter(cat.slug)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${filter === cat.slug ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`}>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array(8).fill(0).map((_, i) => (
                        <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
                            <Skeleton className="aspect-video" />
                            <div className="p-3 flex gap-2.5"><Skeleton className="w-8 h-8 rounded-full shrink-0" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></div>
                        </div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-4xl mb-4">📺</p>
                    <p className="font-medium text-lg mb-2">{filter ? "Nenhum stream nesta categoria" : "Nenhum stream ao vivo"}</p>
                    <p className="text-sm text-muted-foreground mb-6">{filter ? "Tenta outra categoria ou volta mais tarde" : "Sê o primeiro a transmitir!"}</p>
                    {filter && <Button variant="outline" onClick={() => setFilter("")}>Ver todos</Button>}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((stream) => (
                        <Link key={stream.id} href={`/stream/${stream.streamer?.username || stream.id}`}>
                            <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all bg-card">
                                <div className="relative aspect-video bg-muted">
                                    {stream.thumbnailUrl ? (
                                        <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
                                            <span className="text-4xl opacity-60">{stream.category === "gaming" ? "🎮" : stream.category === "musica" ? "🎵" : "📺"}</span>
                                        </div>
                                    )}
                                    <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px] px-1.5 py-0.5 font-bold">AO VIVO</Badge>
                                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
                                        <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px] font-medium">{stream.viewerCount > 999 ? `${(stream.viewerCount / 1000).toFixed(1)}k` : stream.viewerCount}</span>
                                    </div>
                                </div>
                                <div className="p-3 flex gap-2.5">
                                    <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                                        <AvatarImage src={stream.streamer?.avatarUrl} />
                                        <AvatarFallback className="text-xs bg-primary/20 text-primary">{stream.streamer?.displayName?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium truncate">{stream.title}</p>
                                        <p className="text-xs text-muted-foreground truncate mt-0.5">{stream.streamer?.displayName}</p>
                                        <Badge variant="secondary" className="text-[10px] mt-1.5 px-1.5">{stream.category}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
