"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

interface ClipPlayerProps {
  videoUrl?: string
  thumbnailUrl?: string
  title: string
}

/**
 * Simple clip player with autoplay + loop + muted default.
 * Tap/click to toggle mute. Minimal UI — just progress bar.
 */
export function ClipPlayer({ videoUrl, thumbnailUrl, title }: ClipPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
    }
    video.addEventListener("timeupdate", handleTime)
    return () => video.removeEventListener("timeupdate", handleTime)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false) }
      else { videoRef.current.play(); setPlaying(true) }
    }
  }

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden cursor-pointer" onClick={toggleMute}>
      {videoUrl ? (
        <video ref={videoRef} src={videoUrl} autoPlay loop muted={muted} playsInline
          poster={thumbnailUrl} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
          <Play className="w-16 h-16 text-white/60" />
        </div>
      )}

      {/* Mute indicator */}
      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white" onClick={toggleMute}>
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Play/pause */}
      <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white" onClick={togglePlay}>
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Simple progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
