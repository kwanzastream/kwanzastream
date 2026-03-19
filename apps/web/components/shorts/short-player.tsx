"use client"

import { useRef, useEffect, useState } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

interface ShortPlayerProps {
  videoUrl?: string
  thumbnailUrl?: string
  autoplay?: boolean
  fullscreen?: boolean
}

/**
 * Vertical video player: 9:16, autoplay + loop + muted.
 * Tap to toggle sound. IntersectionObserver for viewport autoplay.
 */
export function ShortPlayer({ videoUrl, thumbnailUrl, autoplay = true, fullscreen = false }: ShortPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoplay) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { video.play().then(() => setPlaying(true)).catch(() => {}) }
        else { video.pause(); setPlaying(false) }
      },
      { threshold: 0.7 }
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [autoplay])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => { if (video.duration) setProgress((video.currentTime / video.duration) * 100) }
    video.addEventListener("timeupdate", onTime)
    return () => video.removeEventListener("timeupdate", onTime)
  }, [])

  const toggleMute = () => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted) } }
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) { playing ? videoRef.current.pause() : videoRef.current.play(); setPlaying(!playing) }
  }

  return (
    <div className={`relative bg-black overflow-hidden ${fullscreen ? "w-full h-full" : "aspect-[9/16] rounded-xl"}`} onClick={toggleMute}>
      {videoUrl ? (
        <video ref={videoRef} src={videoUrl} muted={muted} loop playsInline preload="metadata"
          poster={thumbnailUrl} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
          {thumbnailUrl ? <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" /> : <Play className="w-12 h-12 text-white/40" />}
        </div>
      )}
      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center z-10" onClick={(e) => { e.stopPropagation(); toggleMute() }}>
        {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
      <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center z-10" onClick={togglePlay}>
        {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
