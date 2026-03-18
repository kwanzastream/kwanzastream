"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"
import { Play, Eye, Clock, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Vod { id: string; title: string; thumbnailUrl?: string; duration: number; viewCount: number; createdAt: string; category?: string }

function formatDuration(s: number) {
  const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
}

export function VideoGrid({ vods, emptyMessage = "Sem vídeos" }: { vods: Vod[]; emptyMessage?: string }) {
  if (vods.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🎬</p>
        <p className="font-medium">{emptyMessage}</p>
        <p className="text-sm text-muted-foreground mt-1">Este canal ainda não publicou vídeos nesta secção</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {vods.map((vod) => (
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
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{vod.viewCount.toLocaleString("pt-AO")}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(vod.createdAt).toLocaleDateString("pt-AO")}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function ChannelVideosPage() {
  const { username } = useParams()
  const [vods, setVods] = useState<Vod[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      if (!u) return
      const vodsRes = await api.get(`/api/vods/?creatorId=${u.id}`)
      setVods(vodsRes.data?.vods || vodsRes.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="py-12 text-center text-muted-foreground">A carregar...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Todos os vídeos</h2>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="text-xs" asChild><Link href={`/${username}/videos/recentes`}>Recentes</Link></Button>
          <Button variant="ghost" size="sm" className="text-xs" asChild><Link href={`/${username}/videos/populares`}>Populares</Link></Button>
        </div>
      </div>
      <VideoGrid vods={vods} />
    </div>
  )
}
