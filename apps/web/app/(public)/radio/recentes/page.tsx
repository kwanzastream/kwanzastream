"use client"
import { RadioCard, type RadioStationData } from "@/components/radio/radio-card"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { Clock } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/radio/ao-vivo" },
  { id: "generos", label: "Géneros", href: "/radio/generos" },
  { id: "schedule", label: "Programação", href: "/radio/schedule" },
  { id: "top", label: "Top", href: "/radio/top" },
  { id: "recentes", label: "Recentes", href: "/radio/recentes" },
  { id: "guardados", label: "Guardados", href: "/radio/guardados" },
]

const RECENT: RadioStationData[] = [
  { channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix — Ep. 12", genre: "Kuduro", listeners: 0, isLive: false },
  { channel: "gospel_angola", displayName: "Gospel Angola", title: "Louvor — Sessão de Ontem", genre: "Gospel", listeners: 0, isLive: false },
]

export default function RadioRecentesPage() {
  const { isPlaying, currentStation, play, pause } = useRadioPlayer()
  const handlePlay = (s: RadioStationData) => {
    if (isPlaying && currentStation?.channel === s.channel) pause()
    else play({ channel: s.channel, displayName: s.displayName, title: s.title, genre: s.genre, listeners: s.listeners })
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Rádios Recentes</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "recentes" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <p className="text-xs text-muted-foreground">Transmissões de rádio das últimas 48 horas (com VOD activado).</p>
      <div className="space-y-2">{RECENT.map(s => <RadioCard key={s.channel} station={s} onPlay={handlePlay} isPlaying={isPlaying && currentStation?.channel === s.channel} />)}</div>
    </div>
  )
}
