"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Eye, Share2 } from "lucide-react"
import { toast } from "sonner"

interface FeedCardClipProps {
  id: string
  title: string
  duration: number // seconds (10-90)
  views: number
  videoUrl?: string
  thumbnailUrl?: string
  streamer: { username: string; displayName: string }
  className?: string
}

export function FeedCardClip({
  id, title, duration, views, videoUrl, thumbnailUrl, streamer, className = "",
}: FeedCardClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handleHoverStart = async () => {
    if (videoRef.current && videoUrl) {
      try { await videoRef.current.play(); setPlaying(true) } catch { /* autoplay blocked — ok */ }
    }
  }
  const handleHoverEnd = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; setPlaying(false) }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    const url = `https://kwanzastream.ao/clips/${id}`
    const text = `Vê este clip de ${streamer.displayName} no Kwanza Stream! 🇦🇴🔥`
    if (navigator.share) navigator.share({ title, url, text })
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank")
  }

  return (
    <Link href={`/clips/${id}`}>
      <div
        className={`group rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all bg-card ${className}`}
        onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}
      >
        <div className="relative aspect-video bg-muted">
          {videoUrl && (
            <video ref={videoRef} src={videoUrl} muted loop playsInline preload="none"
              className={`absolute inset-0 w-full h-full object-cover ${playing ? "opacity-100" : "opacity-0"} transition-opacity`} />
          )}
          {thumbnailUrl && !playing && (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
          )}
          {!thumbnailUrl && !playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-900/30 to-muted"><Play className="w-8 h-8 text-white/40" /></div>
          )}
          <Badge className="absolute top-2 left-2 bg-amber-500/80 text-white text-[10px] px-1.5 py-0.5 font-bold border-none">CLIP</Badge>
          <div className="absolute bottom-2 right-2 bg-black/80 rounded px-1.5 py-0.5 text-[10px] font-mono text-white font-bold">{duration}s</div>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 w-7 h-7 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleShare}>
            <Share2 className="w-3 h-3" />
          </Button>
        </div>
        <div className="p-3">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{streamer.displayName} · <Eye className="w-3 h-3 inline" /> {views > 999 ? `${(views / 1000).toFixed(1)}k` : views}</p>
        </div>
      </div>
    </Link>
  )
}
