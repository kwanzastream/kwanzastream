"use client"

import { useEffect, useState, useCallback } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Radio, RefreshCw } from "lucide-react"

interface Stream {
  id: string; title: string; category: string; viewerCount: number; thumbnailUrl?: string
  streamer: { id: string; username: string; displayName: string; avatarUrl?: string }
}

interface Props { category: string; title: string; emoji: string; description: string }

export function LiveCategoryPage({ category, title, emoji, description }: Props) {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const res = await api.get("/api/streams/live")
      const all = res.data?.streams || res.data || []
      setStreams(all.filter((s: Stream) => s.category?.toLowerCase() === category))
    } catch { setStreams([]) }
    finally { setLoading(false) }
  }, [category])

  useEffect(() => { fetch() }, [fetch])
  useEffect(() => { const i = setInterval(() => fetch(true), 30_000); return () => clearInterval(i) }, [fetch])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{emoji}</span>
            <h1 className="text-2xl font-bold">{title}</h1>
            <Radio className="w-4 h-4 text-[#CE1126]" />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Link href="/ao-vivo" className="text-sm text-primary hover:underline">Ver todos →</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
              <Skeleton className="aspect-video" />
              <div className="p-3 flex gap-2.5"><Skeleton className="w-8 h-8 rounded-full shrink-0" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></div>
            </div>
          ))}
        </div>
      ) : streams.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">{emoji}</p>
          <p className="font-medium text-lg mb-2">Nenhum stream de {title.toLowerCase()} ao vivo</p>
          <p className="text-sm text-muted-foreground mb-6">Volta mais tarde ou explora outras categorias.</p>
          <Link href="/ao-vivo" className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Explorar ao vivo</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {streams.map((stream) => (
            <Link key={stream.id} href={`/stream/${stream.streamer?.username || stream.id}`}>
              <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all bg-card">
                <div className="relative aspect-video bg-muted">
                  {stream.thumbnailUrl ? (
                    <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
                      <span className="text-4xl opacity-60">{emoji}</span>
                    </div>
                  )}
                  <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px] px-1.5 py-0.5 font-bold">AO VIVO</Badge>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
                    <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px] font-medium">{stream.viewerCount}</span>
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
