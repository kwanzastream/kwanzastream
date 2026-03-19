"use client"
import { useState } from "react"
import { RadioCard, type RadioStationData } from "@/components/radio/radio-card"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { Radio, Headphones } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/radio/ao-vivo" },
  { id: "generos", label: "Géneros", href: "/radio/generos" },
  { id: "schedule", label: "Programação", href: "/radio/schedule" },
  { id: "top", label: "Top", href: "/radio/top" },
  { id: "recentes", label: "Recentes", href: "/radio/recentes" },
  { id: "guardados", label: "Guardados", href: "/radio/guardados" },
]

const LIVE: RadioStationData[] = [
  { channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix — Sexta à Noite 🎵", genre: "Kuduro", listeners: 234, isLive: true },
  { channel: "radio_noticias_ao", displayName: "Rádio Notícias AO", title: "Notícias Angola ao Vivo", genre: "Notícias", listeners: 89, isLive: true },
  { channel: "semba_classics", displayName: "Semba Classics", title: "As melhores de Semba — Live Session", genre: "Semba", listeners: 156, isLive: true },
  { channel: "gospel_angola", displayName: "Gospel Angola", title: "Louvor e Adoração — Stream Contínuo", genre: "Gospel", listeners: 67, isLive: true },
  { channel: "afrohouse_mix", displayName: "Afrohouse Mix", title: "Afrohouse Friday Night 🔥", genre: "Afrohouse", listeners: 312, isLive: true },
]

export default function RadioAoVivoPage() {
  const { isPlaying, currentStation, play, pause } = useRadioPlayer()

  const handlePlay = (station: RadioStationData) => {
    if (isPlaying && currentStation?.channel === station.channel) { pause() }
    else { play({ channel: station.channel, displayName: station.displayName, title: station.title, genre: station.genre, artworkUrl: station.artworkUrl, listeners: station.listeners }) }
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2"><Radio className="w-5 h-5 text-red-400" />Rádio ao Vivo</h1>
        <span className="text-xs text-muted-foreground flex items-center gap-1"><Headphones className="w-3 h-3" />{LIVE.length} rádios ao vivo</span>
      </div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "ao-vivo" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="space-y-2">
        {LIVE.map(s => <RadioCard key={s.channel} station={s} onPlay={handlePlay} isPlaying={isPlaying && currentStation?.channel === s.channel} />)}
      </div>
      {LIVE.length === 0 && <div className="text-center py-16"><Radio className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem rádios ao vivo agora</p></div>}
    </div>
  )
}
