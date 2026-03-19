"use client"

import { Play, Eye, Heart } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

export interface ShortData {
  id: string
  title: string
  thumbnailUrl?: string
  videoUrl?: string
  duration: number
  viewCount: number
  likes: number
  createdAt: string
  category?: string
  music?: string
  creator: { username: string; displayName: string; avatarUrl?: string }
}

export function ShortCard({ short }: { short: ShortData }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handleHover = async () => {
    if (videoRef.current && short.videoUrl) { try { await videoRef.current.play(); setPlaying(true) } catch { } }
  }
  const handleLeave = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; setPlaying(false) }
  }

  return (
    <Link href={`/shorts/${short.id}`} className="group block" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 bg-black transition-all">
        {short.videoUrl && <video ref={videoRef} src={short.videoUrl} muted loop playsInline preload="none" className={`absolute inset-0 w-full h-full object-cover ${playing ? "opacity-100" : "opacity-0"} transition-opacity`} />}
        {short.thumbnailUrl && !playing && <img src={short.thumbnailUrl} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
        {!short.thumbnailUrl && !playing && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/10"><Play className="w-8 h-8 text-white/30" /></div>}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
          <p className="text-white font-bold text-xs line-clamp-2">{short.title}</p>
          <p className="text-[10px] text-white/70 mt-1">@{short.creator.username}</p>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">{short.duration}s</div>
      </div>
      <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{short.viewCount > 999 ? `${(short.viewCount / 1000).toFixed(1)}k` : short.viewCount}</span>
        <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{short.likes > 999 ? `${(short.likes / 1000).toFixed(1)}k` : short.likes}</span>
      </div>
    </Link>
  )
}
