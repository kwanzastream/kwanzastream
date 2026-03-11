"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, WifiOff, Play } from "lucide-react"

export default function StreamOfflinePage() {
  const [liveStreams, setLiveStreams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/streams/live")
      .then((res) => setLiveStreams((res.data?.streams || res.data || []).slice(0, 6)))
      .catch(() => setLiveStreams([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg mb-12">
        <div className="w-24 h-24 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Stream Offline</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A transmissão que procuras não está disponível de momento. Pode ter terminado ou ainda não ter começado.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/ao-vivo"><Button className="gap-1.5"><Play className="w-4 h-4" />Ver streams ao vivo</Button></Link>
          <Link href="/explorar"><Button variant="outline">Explorar canais</Button></Link>
        </div>
      </div>

      {liveStreams.length > 0 && (
        <div className="w-full max-w-4xl">
          <h2 className="font-semibold text-lg mb-4 text-center">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />
              Streams ao vivo agora
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream: any) => (
              <Link key={stream.id} href={`/stream/${stream.streamer?.username || stream.id}`}>
                <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                  <div className="relative aspect-video bg-muted">
                    {stream.thumbnailUrl && <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover" />}
                    <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px]">AO VIVO</Badge>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
                      <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px]">{stream.viewerCount || 0}</span>
                    </div>
                  </div>
                  <div className="p-3 flex gap-2.5">
                    <Avatar className="w-7 h-7 shrink-0"><AvatarImage src={stream.streamer?.avatarUrl} /><AvatarFallback className="text-[10px]">{stream.streamer?.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
                    <div className="min-w-0"><p className="text-sm font-medium truncate">{stream.title}</p><p className="text-xs text-muted-foreground truncate">{stream.streamer?.displayName}</p></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
