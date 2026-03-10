"use client"

import { useEffect, useState, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Radio, Flame, Clock, Users, TrendingUp, RefreshCw } from "lucide-react"

interface Stream {
  id: string
  title: string
  category: string
  viewerCount: number
  thumbnailUrl?: string
  startedAt: string
  streamer: { id: string; username: string; displayName: string; avatarUrl?: string }
}

export default function FeedPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState("para-ti")
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchFeed = useCallback(async (currentTab: string, silent = false) => {
    if (!silent) { setLoading(true); setError(null) } else setRefreshing(true)
    try {
      const endpoint = currentTab === "a-seguir" ? "/api/streams/live" : "/api/recommendations/streams"
      const res = await api.get(endpoint)
      setStreams(res.data?.streams || res.data || [])
      setLoading(false); setError(null)
    } catch {
      setLoading(false); setError("Erro ao carregar feed")
    } finally { setRefreshing(false) }
  }, [])

  useEffect(() => { fetchFeed(tab) }, [tab, fetchFeed])
  useEffect(() => {
    const interval = setInterval(() => fetchFeed(tab, true), 60_000)
    return () => clearInterval(interval)
  }, [tab, fetchFeed])

  return (
    <div className="max-w-screen-xl mx-auto p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user?.displayName || user?.username} 👋</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Aqui está o que está a acontecer agora</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => fetchFeed(tab, true)} disabled={refreshing}>
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="para-ti" className="gap-1.5"><Flame className="w-3.5 h-3.5" />Para ti</TabsTrigger>
          <TabsTrigger value="a-seguir" className="gap-1.5"><Users className="w-3.5 h-3.5" />A seguir</TabsTrigger>
          <TabsTrigger value="ao-vivo" className="gap-1.5"><Radio className="w-3.5 h-3.5" />Ao vivo</TabsTrigger>
          <TabsTrigger value="explorar" className="gap-1.5"><TrendingUp className="w-3.5 h-3.5" />Explorar</TabsTrigger>
        </TabsList>

        {["para-ti", "a-seguir", "ao-vivo", "explorar"].map((t) => (
          <TabsContent key={t} value={t}>
            {loading ? <FeedSkeleton /> : error ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button variant="outline" onClick={() => fetchFeed(t)}>Tentar novamente</Button>
              </div>
            ) : streams.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-2xl mb-3">📺</p>
                <p className="font-medium mb-1">Nenhum stream de momento</p>
                <p className="text-sm text-muted-foreground mb-6">Segue alguns criadores para ver o teu feed personalizado</p>
                <Link href="/explorar"><Button variant="outline">Explorar criadores</Button></Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {streams.map((stream) => <FeedStreamCard key={stream.id} stream={stream} />)}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function FeedStreamCard({ stream }: { stream: Stream }) {
  const timeAgo = (dateStr: string) => {
    if (!dateStr) return ""
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / 60_000)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) return `${hours}h ao vivo`
    return `${minutes}min ao vivo`
  }

  return (
    <Link href={`/stream/${stream.streamer?.username || stream.id}`}>
      <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all bg-card">
        <div className="relative aspect-video bg-muted">
          {stream.thumbnailUrl ? (
            <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
              <span className="text-4xl opacity-60">{stream.category === "gaming" ? "🎮" : stream.category === "musica" ? "🎵" : stream.category === "futebol" ? "⚽" : "📺"}</span>
            </div>
          )}
          <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px] px-1.5 py-0.5 font-bold">AO VIVO</Badge>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
            <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px] font-medium">{stream.viewerCount > 999 ? `${(stream.viewerCount / 1000).toFixed(1)}k` : stream.viewerCount}</span>
          </div>
          {stream.startedAt && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
              <Clock className="w-3 h-3 text-white" /><span className="text-white text-[10px]">{timeAgo(stream.startedAt)}</span>
            </div>
          )}
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
  )
}

function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
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
