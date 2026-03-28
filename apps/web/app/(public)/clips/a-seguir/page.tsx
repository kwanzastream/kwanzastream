"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Film, Heart, Users } from "lucide-react"

export default function ClipsASeguirPage() {
  const [clips, setClips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/clips/trending").then(r => setClips(r.data?.clips || r.data || [])).catch(() => setClips([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Film className="w-5 h-5 text-primary" />Clips — A Seguir</h1>
          <p className="text-sm text-muted-foreground">Clips dos canais que segues</p>
        </div>
        <Link href="/clips" className="text-sm text-primary hover:underline">Todos os clips →</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => <div key={i} className="aspect-video rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      ) : clips.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-5xl">🎬</p>
          <p className="font-medium text-lg">Nenhum clip disponível</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Segue creators para ver os seus melhores clips aqui. Quando estiveres a assistir a uma stream, cria o teu próprio clip!</p>
          <Link href="/explorar" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-2"><Users className="w-3.5 h-3.5" />Encontrar creators</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clips.map((clip: any) => (
            <Link key={clip.id} href={`/clips/${clip.id}`} className="group">
              <div className="rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                <div className="relative aspect-video bg-muted">
                  {clip.thumbnailUrl && <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">{clip.duration}s</div>
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-medium truncate">{clip.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span>{clip.streamer?.displayName}</span>
                    <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5" />{clip.likes || 0}</span>
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
