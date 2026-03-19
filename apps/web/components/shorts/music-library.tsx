"use client"

import { useState } from "react"
import { Music, Search, Play, Pause, Star, TrendingUp, Drum } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  genre: string
  previewUrl?: string
}

const GENRES = [
  { id: "kuduro", label: "🎵 Kuduro", icon: "🎵" },
  { id: "semba", label: "🎶 Semba", icon: "🎶" },
  { id: "kizomba", label: "💃 Kizomba", icon: "💃" },
  { id: "afrohouse", label: "🔊 Afrohouse", icon: "🔊" },
  { id: "originais", label: "🎤 Sons Originais", icon: "🎤" },
  { id: "efeitos", label: "🔔 Efeitos Sonoros", icon: "🔔" },
]

const MOCK_TRACKS: Track[] = [
  { id: "t1", title: "Kuduro Nacional", artist: "DJ Malvado", duration: 30, genre: "kuduro" },
  { id: "t2", title: "Semba do Amor", artist: "Paulo Flores", duration: 45, genre: "semba" },
  { id: "t3", title: "Kizomba Suave", artist: "Anselmo Ralph", duration: 35, genre: "kizomba" },
  { id: "t4", title: "Afro Beat Drop", artist: "DJ Satelite", duration: 20, genre: "afrohouse" },
  { id: "t5", title: "Efeito Golo", artist: "Kwanza Stream", duration: 3, genre: "efeitos" },
  { id: "t6", title: "Aplausos", artist: "Kwanza Stream", duration: 2, genre: "efeitos" },
]

interface MusicLibraryProps {
  onSelect: (track: Track) => void
  selected?: string
}

export function MusicLibrary({ onSelect, selected }: MusicLibraryProps) {
  const [genre, setGenre] = useState("kuduro")
  const [search, setSearch] = useState("")
  const [previewing, setPreviewing] = useState<string | null>(null)

  const filtered = MOCK_TRACKS.filter(t => {
    if (genre !== "all" && t.genre !== genre) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.artist.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const formatDur = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar música..." className="pl-9 h-9 bg-white/5 border-white/10 rounded-xl text-sm" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-1">
        {GENRES.map(g => (
          <button key={g.id} onClick={() => setGenre(g.id)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${genre === g.id ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>
            {g.label}
          </button>
        ))}
      </div>

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {filtered.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Sem resultados</p>}
        {filtered.map(t => (
          <button key={t.id} onClick={() => onSelect(t)}
            className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${selected === t.id ? "bg-primary/10 border border-primary/30" : "hover:bg-white/[0.04]"}`}>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              {previewing === t.id ? <Pause className="w-3 h-3 text-primary" /> : <Play className="w-3 h-3 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{t.title}</p>
              <p className="text-[10px] text-muted-foreground">{t.artist} · {formatDur(t.duration)}</p>
            </div>
            {t.genre === "efeitos" && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Livre</span>}
          </button>
        ))}
      </div>

      <p className="text-[8px] text-muted-foreground text-center">🎵 Músicas angolanas em breve (acordo OSSIC) · Efeitos sonoros disponíveis</p>
    </div>
  )
}

export type { Track }
