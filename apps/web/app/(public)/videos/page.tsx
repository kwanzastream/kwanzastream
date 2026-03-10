"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/lib/auth-context"
import {
    Play, Eye, Clock, Calendar, Filter, Search,
    Video, Loader2, ChevronRight
} from "lucide-react"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface VodItem {
    id: string
    title: string
    description: string | null
    thumbnailUrl: string | null
    videoUrl: string
    duration: number
    viewCount: number
    isPublic: boolean
    createdAt: string
    stream: { id: string; category: string | null } | null
    creator: {
        id: string
        displayName: string | null
        username: string | null
        avatarUrl: string | null
    }
}

export default function VodsPage() {
    const { user } = useAuth()
    const [vods, setVods] = useState<VodItem[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<"all" | "mine">("all")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchVods()
    }, [filter])

    const fetchVods = async () => {
        setLoading(true)
        try {
            const endpoint = filter === "mine"
                ? `${API_URL}/api/vods/my`
                : `${API_URL}/api/vods`
            const res = await fetch(endpoint, { credentials: "include" })
            if (res.ok) {
                const data = await res.json()
                setVods(data.vods || [])
            }
        } catch { }
        setLoading(false)
    }

    const formatDuration = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        return `${m}:${s.toString().padStart(2, "0")}`
    }

    const formatViews = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
        return count.toString()
    }

    const timeAgo = (dateStr: string) => {
        const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
        if (secs < 3600) return `${Math.floor(secs / 60)}m`
        if (secs < 86400) return `${Math.floor(secs / 3600)}h atrás`
        if (secs < 604800) return `${Math.floor(secs / 86400)}d atrás`
        return new Date(dateStr).toLocaleDateString("pt-AO", { day: "numeric", month: "short" })
    }

    const filteredVods = vods.filter(v => {
        if (!searchQuery) return true
        return v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (v.creator.displayName || v.creator.username || "").toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-3">
                                <Video className="w-8 h-8 text-primary" />
                                VODs & Replays
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Revê as melhores streams sempre que quiseres
                            </p>
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="relative flex-1 w-full">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Procurar VODs..."
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === "all"
                                        ? "bg-primary/20 text-primary border border-primary/30"
                                        : "bg-white/[0.04] text-muted-foreground border border-white/[0.08] hover:bg-white/[0.06]"
                                    }`}
                            >
                                Todos
                            </button>
                            {user && (
                                <button
                                    onClick={() => setFilter("mine")}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === "mine"
                                            ? "bg-primary/20 text-primary border border-primary/30"
                                            : "bg-white/[0.04] text-muted-foreground border border-white/[0.08] hover:bg-white/[0.06]"
                                        }`}
                                >
                                    Os Meus
                                </button>
                            )}
                        </div>
                    </div>

                    {/* VOD Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : filteredVods.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Video className="w-16 h-16 text-muted-foreground/20 mb-4" />
                            <p className="text-lg font-bold text-white">Sem VODs disponíveis</p>
                            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                                {filter === "mine"
                                    ? "As tuas streams gravadas aparecerão aqui"
                                    : "Quando os creators fizerem streams, os replays aparecerão aqui"}
                            </p>
                            <Link
                                href="/explore"
                                className="mt-4 px-6 py-2.5 bg-primary rounded-xl text-sm font-bold text-white hover:bg-primary/80 transition-colors"
                            >
                                Explorar Streams
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredVods.map((vod) => (
                                <Link
                                    key={vod.id}
                                    href={`/vods/${vod.id}`}
                                    className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-primary/30 hover:bg-white/[0.05] transition-all"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video bg-black/30">
                                        {vod.thumbnailUrl ? (
                                            <img src={vod.thumbnailUrl} alt={vod.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                                                <Play className="w-10 h-10 text-white/30" />
                                            </div>
                                        )}
                                        {/* Duration badge */}
                                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded-md text-[11px] font-mono text-white">
                                            {formatDuration(vod.duration)}
                                        </span>
                                        {/* Play overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all">
                                                <Play className="w-5 h-5 text-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-3 space-y-2">
                                        <p className="text-sm font-medium text-white line-clamp-2 leading-snug">
                                            {vod.title}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {vod.creator.avatarUrl ? (
                                                <img src={vod.creator.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                                    {(vod.creator.displayName || vod.creator.username || "?")[0].toUpperCase()}
                                                </div>
                                            )}
                                            <span className="text-xs text-muted-foreground truncate">
                                                {vod.creator.displayName || vod.creator.username}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> {formatViews(vod.viewCount)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {timeAgo(vod.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <MobileNav />
        </div>
    )
}
