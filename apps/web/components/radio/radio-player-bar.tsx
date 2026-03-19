"use client"

import { useRadioPlayer } from "./radio-player-context"
import { Play, Pause, X, Volume2, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RadioPlayerBar() {
  const { isPlaying, currentStation, volume, play, pause, stop, setVolume } = useRadioPlayer()

  if (!currentStation) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center px-4 gap-4">
      {/* Artwork */}
      <Link href={`/radio/canal/${currentStation.channel}`} className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          {currentStation.artworkUrl ? <img src={currentStation.artworkUrl} className="w-full h-full object-cover rounded-lg" /> : <Music className="w-5 h-5 text-primary/40" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold truncate">{currentStation.title}</p>
          <p className="text-[10px] text-muted-foreground truncate">@{currentStation.channel} · {currentStation.genre}</p>
        </div>
      </Link>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full" onClick={() => isPlaying ? pause() : play(currentStation)}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>

        <div className="hidden sm:flex items-center gap-2"><Volume2 className="w-4 h-4 text-muted-foreground" /><input type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-20 h-1 accent-primary" /></div>

        <Button size="icon" variant="ghost" className="w-8 h-8" onClick={stop}><X className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}
