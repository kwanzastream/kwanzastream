"use client"

import { Play, Eye, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export interface VodData {
  id: string
  title: string
  thumbnailUrl?: string
  duration: number
  viewCount: number
  createdAt: string
  category?: string
  progress?: number // 0-1 for resume
  creator: { username: string; displayName: string; avatarUrl?: string }
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  return `${m}:${s.toString().padStart(2, "0")}`
}

function timeAgo(dateStr: string) {
  const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (secs < 3600) return `${Math.floor(secs / 60)}m`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`
  if (secs < 604800) return `${Math.floor(secs / 86400)}d`
  return new Date(dateStr).toLocaleDateString("pt-AO", { day: "numeric", month: "short" })
}

export function VodCard({ vod }: { vod: VodData }) {
  return (
    <Link href={`/videos/${vod.id}`} className="group rounded-xl overflow-hidden border border-white/[0.06] hover:border-primary/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
      <div className="relative aspect-video bg-black/30">
        {vod.thumbnailUrl ? (
          <img src={vod.thumbnailUrl} alt={vod.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10"><Play className="w-8 h-8 text-white/30" /></div>
        )}
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded-md text-[10px] font-mono text-white">{formatDuration(vod.duration)}</span>
        {vod.progress && vod.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"><div className="h-full bg-primary" style={{ width: `${vod.progress * 100}%` }} /></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all"><Play className="w-4 h-4 text-white ml-0.5" /></div>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-sm font-medium line-clamp-2 leading-snug">{vod.title}</p>
        <div className="flex items-center gap-2">
          {vod.creator.avatarUrl ? (
            <img src={vod.creator.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">{vod.creator.displayName[0]}</div>
          )}
          <span className="text-xs text-muted-foreground truncate">{vod.creator.displayName}</span>
          {vod.category && <Badge variant="outline" className="text-[8px] h-4">{vod.category}</Badge>}
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{vod.viewCount > 999 ? `${(vod.viewCount / 1000).toFixed(1)}k` : vod.viewCount}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(vod.createdAt)}</span>
        </div>
      </div>
    </Link>
  )
}
