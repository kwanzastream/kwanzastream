"use client"
import { useState } from "react"
import { RadioCard, type RadioStationData } from "@/components/radio/radio-card"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { SearchFilters } from "@/components/search/search-filters"
import { Trophy } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/radio/ao-vivo" },
  { id: "generos", label: "Géneros", href: "/radio/generos" },
  { id: "schedule", label: "Programação", href: "/radio/schedule" },
  { id: "top", label: "Top", href: "/radio/top" },
  { id: "recentes", label: "Recentes", href: "/radio/recentes" },
  { id: "guardados", label: "Guardados", href: "/radio/guardados" },
]

const PERIOD_FILTERS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "alltime", label: "De sempre" }]

const TOP: (RadioStationData & { rank: number; hours: number })[] = [
  { rank: 1, channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix", genre: "Kuduro", listeners: 890, isLive: true, hours: 42 },
  { rank: 2, channel: "afrohouse_mix", displayName: "Afrohouse Mix", title: "Afrohouse Sessions", genre: "Afrohouse", listeners: 560, isLive: true, hours: 38 },
  { rank: 3, channel: "semba_classics", displayName: "Semba Classics", title: "As melhores de Semba", genre: "Semba", listeners: 320, isLive: false, hours: 25 },
  { rank: 4, channel: "radio_noticias_ao", displayName: "Rádio Notícias AO", title: "Notícias Angola", genre: "Notícias", listeners: 210, isLive: false, hours: 20 },
]

export default function RadioTopPage() {
  const { isPlaying, currentStation, play, pause } = useRadioPlayer()
  const [period, setPeriod] = useState("week")

  const handlePlay = (s: RadioStationData) => {
    if (isPlaying && currentStation?.channel === s.channel) pause()
    else play({ channel: s.channel, displayName: s.displayName, title: s.title, genre: s.genre, listeners: s.listeners })
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" />Top Rádios</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "top" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <SearchFilters filters={PERIOD_FILTERS} active={period} onChange={setPeriod} />
      <div className="space-y-2">
        {TOP.map(s => (
          <div key={s.channel} className="flex items-center gap-3">
            <span className={`w-8 text-center text-lg font-black ${s.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>{s.rank}</span>
            <div className="flex-1"><RadioCard station={s} onPlay={handlePlay} isPlaying={isPlaying && currentStation?.channel === s.channel} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}
