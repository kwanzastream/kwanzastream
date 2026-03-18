"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Monitor, PictureInPicture2, Settings, Radio
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface StreamPlayerControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  hlsRef: React.RefObject<any>
  isPlaying: boolean
  onPlayPause: () => void
  onTheatreToggle: () => void
  isTheatre: boolean
  viewerCount: number
}

const QUALITIES = [
  { label: "Auto", value: -1 },
  { label: "720p", value: 2 },
  { label: "480p", value: 1 },
  { label: "360p", value: 0 },
]

export function StreamPlayerControls({
  videoRef, hlsRef, isPlaying, onPlayPause, onTheatreToggle, isTheatre, viewerCount
}: StreamPlayerControlsProps) {
  const [volume, setVolume] = useState(80)
  const [muted, setMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentQuality, setCurrentQuality] = useState(-1)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef<NodeJS.Timeout | null>(null)

  const resetHideTimer = () => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 3000)
  }

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current) }
  }, [])

  const handleVolumeChange = (val: number[]) => {
    const v = val[0]
    setVolume(v)
    setMuted(v === 0)
    if (videoRef.current) {
      videoRef.current.volume = v / 100
      videoRef.current.muted = v === 0
    }
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    if (videoRef.current) {
      videoRef.current.muted = next
      if (!next && volume === 0) { setVolume(50); videoRef.current.volume = 0.5 }
    }
  }

  const toggleFullscreen = async () => {
    const container = videoRef.current?.closest("[data-player-container]")
    if (!container) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } else {
        await container.requestFullscreen()
        setIsFullscreen(true)
      }
    } catch {}
  }

  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture()
      }
    } catch {}
  }

  const setQuality = (level: number) => {
    setCurrentQuality(level)
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level
    }
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      onMouseMove={resetHideTimer}
      onTouchStart={() => setShowControls(s => !s)}
    >
      {/* Top overlay: live + viewers */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="flex items-center gap-1.5 bg-[#CE1126] text-white px-2.5 py-1 rounded-md font-bold text-xs animate-pulse">
          <Radio className="w-3 h-3" /> AO VIVO
        </span>
        <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
          {viewerCount.toLocaleString("pt-AO")} a ver
        </span>
      </div>

      {/* Bottom gradient + controls */}
      <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-12 pb-3 px-4">
        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20" onClick={onPlayPause}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </Button>

          {/* Volume */}
          <div className="flex items-center gap-1.5 group">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20" onClick={toggleMute}>
              {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <div className="w-0 group-hover:w-20 overflow-hidden transition-all duration-200">
              <Slider value={[muted ? 0 : volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-20" />
            </div>
          </div>

          <div className="flex-1" />

          {/* Quality */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border-white/20 text-white">
              {QUALITIES.map(q => (
                <DropdownMenuItem
                  key={q.value}
                  onClick={() => setQuality(q.value)}
                  className={`text-xs ${currentQuality === q.value ? "text-primary font-bold" : ""}`}
                >
                  {q.label} {currentQuality === q.value && "✓"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theatre */}
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20 hidden lg:flex" onClick={onTheatreToggle}>
            <Monitor className={`w-4 h-4 ${isTheatre ? "text-primary" : ""}`} />
          </Button>

          {/* PiP */}
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20 hidden sm:flex" onClick={togglePiP}>
            <PictureInPicture2 className="w-4 h-4" />
          </Button>

          {/* Fullscreen */}
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
