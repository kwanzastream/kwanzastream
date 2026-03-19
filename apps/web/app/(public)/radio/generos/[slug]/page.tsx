"use client"
import { useParams } from "next/navigation"
import { RadioCard, type RadioStationData } from "@/components/radio/radio-card"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { ArrowLeft, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: RadioStationData[] = [
  { channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix Live 🎵", genre: "Kuduro", listeners: 234, isLive: true },
  { channel: "kuduro_beats", displayName: "Kuduro Beats", title: "Producer Session", genre: "Kuduro", listeners: 45, isLive: false },
]

export default function RadioGeneroPage() {
  const { slug } = useParams()
  const { isPlaying, currentStation, play, pause } = useRadioPlayer()
  const name = typeof slug === "string" ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ") : "Género"
  const live = MOCK.filter(s => s.isLive)
  const recent = MOCK.filter(s => !s.isLive)

  const handlePlay = (s: RadioStationData) => {
    if (isPlaying && currentStation?.channel === s.channel) pause()
    else play({ channel: s.channel, displayName: s.displayName, title: s.title, genre: s.genre, listeners: s.listeners })
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/radio/generos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">{name}</h1></div>
      {live.length > 0 && <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Radio className="w-4 h-4 text-red-400 animate-pulse" />Ao Vivo</h2>{live.map(s => <RadioCard key={s.channel} station={s} onPlay={handlePlay} isPlaying={isPlaying && currentStation?.channel === s.channel} />)}</div>}
      {recent.length > 0 && <div className="space-y-2"><h2 className="text-sm font-bold">Recentes (24h)</h2>{recent.map(s => <RadioCard key={s.channel} station={s} onPlay={handlePlay} isPlaying={isPlaying && currentStation?.channel === s.channel} />)}</div>}
    </div>
  )
}
