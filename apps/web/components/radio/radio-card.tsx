"use client"

import { Music, Headphones, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface RadioStationData {
  channel: string
  displayName: string
  title: string
  genre: string
  artworkUrl?: string
  listeners: number
  isLive: boolean
}

interface RadioCardProps {
  station: RadioStationData
  onPlay?: (station: RadioStationData) => void
  isPlaying?: boolean
}

export function RadioCard({ station, onPlay, isPlaying }: RadioCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all bg-card group">
      {/* Artwork */}
      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-primary/20 to-purple-500/10 flex items-center justify-center">
        {station.artworkUrl ? <img src={station.artworkUrl} className="w-full h-full object-cover" /> : <Music className="w-6 h-6 text-primary/40" />}
        {station.isLive && <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/radio/canal/${station.channel}`} className="hover:text-primary transition-colors">
          <p className="text-sm font-bold truncate">{station.title}</p>
        </Link>
        <p className="text-[10px] text-muted-foreground">@{station.channel}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="outline" className="text-[8px]">{station.genre}</Badge>
          <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Headphones className="w-3 h-3" />{station.listeners}</span>
        </div>
      </div>

      {/* Play */}
      <Button size="icon" className={`rounded-full w-10 h-10 shrink-0 ${isPlaying ? "bg-primary/20 text-primary" : ""}`} onClick={() => onPlay?.(station)}>
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </Button>
    </div>
  )
}
