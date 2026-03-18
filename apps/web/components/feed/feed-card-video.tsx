"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Clock } from "lucide-react"

interface FeedCardVideoProps {
  id: string
  title: string
  category?: string
  duration: number // seconds
  views: number
  thumbnailUrl?: string
  uploadedAt: string
  streamer: { username: string; displayName: string; avatarUrl?: string }
  className?: string
}

export function FeedCardVideo({
  id, title, category, duration, views, thumbnailUrl, uploadedAt, streamer, className = "",
}: FeedCardVideoProps) {
  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
  }
  const formatViews = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days > 30) return `${Math.floor(days / 30)} meses`
    if (days > 0) return `${days}d atrás`
    const hours = Math.floor(diff / 3600000)
    return hours > 0 ? `${hours}h atrás` : "agora"
  }

  return (
    <Link href={`/videos/${id}`}>
      <div className={`group rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all bg-card ${className}`}>
        <div className="relative aspect-video bg-muted">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-muted"><Play className="w-8 h-8 text-white/40" /></div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/80 rounded px-1.5 py-0.5 text-[10px] font-mono text-white font-bold">{formatDuration(duration)}</div>
        </div>
        <div className="p-3 flex gap-2.5">
          <Avatar className="w-8 h-8 shrink-0 mt-0.5"><AvatarImage src={streamer.avatarUrl} /><AvatarFallback className="text-xs bg-primary/20 text-primary">{streamer.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{title}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{streamer.displayName}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{formatViews(views)} visualizações · {timeAgo(uploadedAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
