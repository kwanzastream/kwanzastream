"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Heart, MessageSquare, Share2, Play, Volume2 } from "lucide-react"

interface FeedCardShortProps {
  id: string
  title: string
  views: number
  videoUrl?: string
  thumbnailUrl?: string
  streamer: { username: string; displayName: string; avatarUrl?: string }
  autoplay?: boolean
  className?: string
}

export function FeedCardShort({
  id, title, views, videoUrl, thumbnailUrl, streamer, autoplay = false, className = "",
}: FeedCardShortProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPlayBtn, setShowPlayBtn] = useState(false)

  // Autoplay when in viewport (muted — always allowed by browsers)
  useEffect(() => {
    if (!autoplay || !videoRef.current) return
    const el = videoRef.current
    const obs = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try { await el.play(); setShowPlayBtn(false) }
          catch { setShowPlayBtn(true) } // browser blocked — show manual play
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [autoplay])

  const handleManualPlay = async () => {
    if (videoRef.current) {
      try { await videoRef.current.play(); setShowPlayBtn(false) } catch {}
    }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    const url = `https://kwanzastream.ao/shorts/${id}`
    if (navigator.share) navigator.share({ title, url })
    else window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank")
  }

  return (
    <Link href={`/shorts/${id}`}>
      <div className={`group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all bg-black aspect-[9/16] ${className}`}>
        {videoUrl ? (
          <video ref={videoRef} src={videoUrl} muted loop playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover" poster={thumbnailUrl} />
        ) : thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black flex items-center justify-center">
            <Play className="w-10 h-10 text-white/30" />
          </div>
        )}

        {/* Manual play button fallback (review correction #2) */}
        {showPlayBtn && (
          <button onClick={(e) => { e.preventDefault(); handleManualPlay() }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </button>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-xs font-bold text-white line-clamp-2">{title}</p>
          <p className="text-[10px] text-white/70 mt-1">@{streamer.username} · {views > 999 ? `${(views / 1000).toFixed(1)}k` : views} views</p>
        </div>

        {/* Side actions */}
        <div className="absolute right-2 bottom-20 flex flex-col gap-3 items-center opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity">
          <button className="flex flex-col items-center gap-0.5" onClick={(e) => e.preventDefault()}>
            <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center"><Heart className="w-4 h-4 text-white" /></div>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={(e) => e.preventDefault()}>
            <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-white" /></div>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={handleShare}>
            <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center"><Share2 className="w-4 h-4 text-white" /></div>
          </button>
        </div>
      </div>
    </Link>
  )
}
