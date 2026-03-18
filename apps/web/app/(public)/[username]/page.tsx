"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import Link from "next/link"
import { Play, Eye, Clock } from "lucide-react"
import { ChannelOfflineHero } from "@/components/channel/channel-offline-hero"
import { ChannelLiveBanner } from "@/components/channel/channel-live-banner"

interface Vod { id: string; title: string; thumbnailUrl?: string; duration: number; viewCount: number; createdAt: string }
interface LiveStream { title: string; category: string; viewerCount: number; thumbnailUrl?: string }

export default function ChannelHomePage() {
  const params = useParams()
  const username = params.username as string
  const [liveStream, setLiveStream] = useState<LiveStream | null>(null)
  const [vods, setVods] = useState<Vod[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    setLoading(true)

    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      if (!u) return

      const [liveRes, vodsRes] = await Promise.allSettled([
        api.get(`/api/streams/user/${u.id}`),
        api.get(`/api/vods/?creatorId=${u.id}`),
      ])

      if (liveRes.status === "fulfilled") {
        const streams = liveRes.value.data?.streams || liveRes.value.data || []
        const live = streams.find((s: any) => s.status === "LIVE")
        if (live) setLiveStream(live)
      }
      if (vodsRes.status === "fulfilled") {
        setVods(vodsRes.value.data?.vods || vodsRes.value.data || [])
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username])

  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
  }

  if (loading) {
    return <div className="py-12 text-center text-muted-foreground">A carregar...</div>
  }

  return (
    <div className="space-y-6">
      {/* Live banner */}
      {liveStream && (
        <ChannelLiveBanner
          username={username}
          title={liveStream.title}
          category={liveStream.category}
          viewerCount={liveStream.viewerCount}
          thumbnailUrl={liveStream.thumbnailUrl}
        />
      )}

      {/* Offline hero */}
      {!liveStream && (
        <ChannelOfflineHero
          username={username}
          lastVod={vods[0]}
        />
      )}

      {/* Recent videos */}
      {vods.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Vídeos recentes</h3>
            <Link href={`/${username}/videos`} className="text-sm text-primary hover:underline">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vods.slice(0, 6).map((vod) => (
              <Link key={vod.id} href={`/videos/${vod.id}`}>
                <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                  <div className="relative aspect-video bg-muted">
                    {vod.thumbnailUrl ? (
                      <img src={vod.thumbnailUrl} alt={vod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center"><Play className="w-8 h-8 text-muted-foreground" /></div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{formatDuration(vod.duration)}</div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{vod.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{vod.viewCount}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(vod.createdAt).toLocaleDateString("pt-AO")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!liveStream && vods.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📺</p>
          <p className="font-medium">Sem conteúdo ainda</p>
          <p className="text-sm text-muted-foreground mt-1">Este canal ainda não tem vídeos publicados</p>
        </div>
      )}
    </div>
  )
}
