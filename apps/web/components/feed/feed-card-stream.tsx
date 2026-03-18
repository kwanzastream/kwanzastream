"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Clock } from "lucide-react"

interface FeedCardStreamProps {
  id: string
  title: string
  category: string
  viewerCount: number
  thumbnailUrl?: string
  startedAt?: string
  streamer: { username: string; displayName: string; avatarUrl?: string }
  className?: string
}

export function FeedCardStream({
  id, title, category, viewerCount, thumbnailUrl, startedAt, streamer, className = "",
}: FeedCardStreamProps) {
  const timeAgo = (dateStr?: string) => {
    if (!dateStr) return ""
    const diff = Date.now() - new Date(dateStr).getTime()
    const m = Math.floor(diff / 60000); const h = Math.floor(m / 60)
    return h > 0 ? `${h}h ao vivo` : `${m}min ao vivo`
  }

  return (
    <Link href={`/stream/${streamer.username}`}>
      <div className={`group rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all bg-card ${className}`}>
        <div className="relative aspect-video bg-muted">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
              <span className="text-4xl opacity-60">{category === "gaming" ? "🎮" : category === "musica" ? "🎵" : "📺"}</span>
            </div>
          )}
          <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px] px-1.5 py-0.5 font-bold border-none">AO VIVO</Badge>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
            <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px] font-medium">{viewerCount > 999 ? `${(viewerCount / 1000).toFixed(1)}k` : viewerCount}</span>
          </div>
          {startedAt && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
              <Clock className="w-3 h-3 text-white" /><span className="text-white text-[10px]">{timeAgo(startedAt)}</span>
            </div>
          )}
        </div>
        <div className="p-3 flex gap-2.5">
          <Avatar className="w-8 h-8 shrink-0 mt-0.5"><AvatarImage src={streamer.avatarUrl} /><AvatarFallback className="text-xs bg-primary/20 text-primary">{streamer.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{title}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{streamer.displayName}</p>
            <Badge variant="secondary" className="text-[10px] mt-1.5 px-1.5">{category}</Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
