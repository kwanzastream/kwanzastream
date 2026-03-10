"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye } from "lucide-react"

interface Stream {
    id: string
    title: string
    category: string
    viewerCount: number
    thumbnailUrl?: string
    streamer: {
        id: string
        username: string
        displayName: string
        avatarUrl?: string
    }
}

export function HomeLiveStreams() {
    const [streams, setStreams] = useState<Stream[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/api/streams/live")
            .then((res) => setStreams(res.data?.streams || res.data || []))
            .catch(() => setStreams([]))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-border/50">
                        <Skeleton className="aspect-video" />
                        <div className="p-3 flex gap-2.5">
                            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (streams.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg mb-2">Nenhum stream ao vivo agora</p>
                <p className="text-sm">Volta mais tarde ou explora os VODs</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {streams.slice(0, 8).map((stream) => (
                <Link key={stream.id} href={`/stream/${stream.streamer?.username || stream.id}`}>
                    <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                        <div className="relative aspect-video bg-muted">
                            {stream.thumbnailUrl ? (
                                <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl">{stream.category === "gaming" ? "🎮" : stream.category === "musica" ? "🎵" : stream.category === "futebol" ? "⚽" : "📺"}</span>
                                </div>
                            )}
                            <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px] px-1.5 py-0.5 font-bold">AO VIVO</Badge>
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
                                <Eye className="w-3 h-3 text-white" />
                                <span className="text-white text-[10px] font-medium">{stream.viewerCount > 999 ? `${(stream.viewerCount / 1000).toFixed(1)}k` : stream.viewerCount}</span>
                            </div>
                        </div>
                        <div className="p-3 flex gap-2.5">
                            <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                                <AvatarImage src={stream.streamer?.avatarUrl} />
                                <AvatarFallback className="text-xs">{stream.streamer?.displayName?.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate leading-tight">{stream.title}</p>
                                <p className="text-xs text-muted-foreground truncate mt-0.5">{stream.streamer?.displayName}</p>
                                <Badge variant="secondary" className="text-[10px] mt-1.5 px-1.5">{stream.category}</Badge>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
