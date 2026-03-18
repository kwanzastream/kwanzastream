"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Headphones, Play, Pause, Volume2, SkipForward } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { TabPills } from "@/components/public/content-filters"

const GENRES = [
  { value: "all", label: "Todos" },
  { value: "kuduro", label: "Kuduro" },
  { value: "semba", label: "Semba" },
  { value: "kizomba", label: "Kizomba" },
  { value: "afrohouse", label: "Afrohouse" },
  { value: "hiphop", label: "Hip-Hop AO" },
  { value: "gospel", label: "Gospel" },
  { value: "noticias", label: "Notícias" },
  { value: "podcasts", label: "Podcasts" },
]

const MOCK_RADIO = Array.from({ length: 10 }, (_, i) => ({
  id: `radio-${i}`, name: `Rádio ${["Kuduro FM", "Semba Classics", "Kizomba Vibes", "Afrohouse Mix", "Hip-Hop AO", "Gospel Angola", "Notícias WAT", "Podcast AO", "DJ Set Live", "Angola Sounds"][i]}`,
  host: `DJ ${["KwanzaBeat", "SembaKing", "KizoQueen", "AfroMaster", "RapAO", "GospelVoice", "NewsAO", "PodcasterAO", "LiveMixer", "SoundAO"][i]}`,
  genre: ["kuduro", "semba", "kizomba", "afrohouse", "hiphop", "gospel", "noticias", "podcasts", "kuduro", "semba"][i],
  listeners: Math.floor(Math.random() * 500) + 10,
  isLive: i < 6,
}))

export default function ExplorarRadioPage() {
  const [genre, setGenre] = useState("all")
  const [playing, setPlaying] = useState<string | null>(null)

  const filtered = MOCK_RADIO.filter(r => genre === "all" || r.genre === genre)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Rádio</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Rádio ao Vivo 📻</h1>
        <p className="text-sm text-muted-foreground">Canais em modo rádio — áudio apenas, menos dados, mais música</p>
      </div>

      <div className="mb-6">
        <TabPills tabs={GENRES.map(g => ({ value: g.value, label: g.label }))} activeTab={genre} onTabChange={setGenre} />
      </div>

      <div className="space-y-2">
        {filtered.map((radio) => (
          <div key={radio.id} className={`rounded-xl border transition-all p-4 flex items-center gap-4 ${playing === radio.id ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/30 bg-card"}`}>
            {/* Play/Pause Button */}
            <button
              onClick={() => setPlaying(playing === radio.id ? null : radio.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${playing === radio.id ? "bg-primary text-white" : "bg-[var(--surface-2)] text-muted-foreground hover:text-foreground"}`}
            >
              {playing === radio.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm truncate">{radio.name}</h3>
                {radio.isLive && <span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full animate-pulse" />}
              </div>
              <p className="text-xs text-muted-foreground truncate">{radio.host}</p>
            </div>

            {/* Genre Badge */}
            <Badge variant="outline" className="text-[10px] shrink-0 hidden sm:inline-flex">
              {GENRES.find(g => g.value === radio.genre)?.label || radio.genre}
            </Badge>

            {/* Listeners */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Headphones className="w-3 h-3" />
              <span>{radio.listeners}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Player Bar */}
      {playing && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface-1)] border-t border-border/50 backdrop-blur-lg p-3 animate-slide-up">
          <div className="max-w-screen-xl mx-auto flex items-center gap-4">
            <button onClick={() => setPlaying(null)} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
              <Pause className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{MOCK_RADIO.find(r => r.id === playing)?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{MOCK_RADIO.find(r => r.id === playing)?.host}</p>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <div className="w-20 h-1 bg-[var(--surface-3)] rounded-full">
                <div className="w-3/4 h-full bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
