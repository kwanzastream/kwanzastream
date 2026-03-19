"use client"

import { Play, Eye, Clock, Share2, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { toast } from "sonner"

export interface ClipData {
  id: string
  title: string
  thumbnailUrl?: string
  videoUrl?: string
  duration: number // seconds
  viewCount: number
  shares?: number
  createdAt: string
  category?: string
  sourceStreamId?: string
  sourceTimestamp?: number
  creator: { username: string; displayName: string; avatarUrl?: string }
}

function formatDuration(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

function timeAgo(dateStr: string) {
  const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (secs < 3600) return `${Math.floor(secs / 60)}m`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`
  if (secs < 604800) return `${Math.floor(secs / 86400)}d`
  return new Date(dateStr).toLocaleDateString("pt-AO", { day: "numeric", month: "short" })
}

export function ClipCard({ clip }: { clip: ClipData }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handleHover = async () => {
    if (videoRef.current && clip.videoUrl) {
      try { await videoRef.current.play(); setPlaying(true) } catch { }
    }
  }
  const handleLeave = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; setPlaying(false) }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    const url = `https://kwanzastream.ao/clips/${clip.id}`
    const text = `Vê este clip de ${clip.creator.displayName} no Kwanza Stream! 🇦🇴🔥`
    if (navigator.share) navigator.share({ title: clip.title, url, text })
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank")
    toast.success("A partilhar...")
  }

  return (
    <Link href={`/clips/${clip.id}`} className="group block" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 bg-black transition-all">
        {clip.videoUrl && (
          <video ref={videoRef} src={clip.videoUrl} muted loop playsInline preload="none"
            className={`absolute inset-0 w-full h-full object-cover ${playing ? "opacity-100" : "opacity-0"} transition-opacity`} />
        )}
        {clip.thumbnailUrl && !playing && <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
        {!clip.thumbnailUrl && !playing && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/10"><Play className="w-8 h-8 text-white/30" /></div>}

        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />{formatDuration(clip.duration)}
        </div>
        {/* Time ago */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[10px] text-white/80">{timeAgo(clip.createdAt)}</div>
        {/* WhatsApp share */}
        <button onClick={handleShare} className="absolute bottom-12 right-2 w-7 h-7 rounded-full bg-[#25D366]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <MessageCircle className="w-3.5 h-3.5 text-white" />
        </button>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="bg-primary/90 rounded-full p-3 shadow-lg"><Play className="w-5 h-5 fill-white text-white" /></div>
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{clip.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {clip.creator.avatarUrl ? (
              <img src={clip.creator.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center text-[7px] font-bold text-white">{clip.creator.displayName[0]}</div>
            )}
            <span className="text-white/80 text-[10px] truncate">{clip.creator.displayName}</span>
          </div>
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{clip.viewCount > 999 ? `${(clip.viewCount / 1000).toFixed(1)}k` : clip.viewCount}</span>
        {clip.shares && clip.shares > 0 && <span className="flex items-center gap-0.5"><Share2 className="w-3 h-3" />{clip.shares}</span>}
      </div>
    </Link>
  )
}
