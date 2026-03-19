"use client"
import { useState } from "react"
import { RadioCard, type RadioStationData } from "@/components/radio/radio-card"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { SearchFilters } from "@/components/search/search-filters"
import { Calendar, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/radio/ao-vivo" },
  { id: "generos", label: "Géneros", href: "/radio/generos" },
  { id: "schedule", label: "Programação", href: "/radio/schedule" },
  { id: "top", label: "Top", href: "/radio/top" },
  { id: "recentes", label: "Recentes", href: "/radio/recentes" },
  { id: "guardados", label: "Guardados", href: "/radio/guardados" },
]

const GENRE_FILTERS = [{ id: "todos", label: "Todos" }, { id: "kuduro", label: "Kuduro" }, { id: "semba", label: "Semba" }, { id: "noticias", label: "Notícias" }]

const SCHEDULE = [
  { time: "14:00", channel: "radio_noticias_ao", displayName: "Rádio Notícias AO", title: "Notícias da Tarde", genre: "Notícias" },
  { time: "18:00", channel: "semba_classics", displayName: "Semba Classics", title: "Hora de Semba", genre: "Semba" },
  { time: "21:00", channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix Noturno 🎵", genre: "Kuduro" },
  { time: "22:00", channel: "afrohouse_mix", displayName: "Afrohouse Mix", title: "Afrohouse Friday Night", genre: "Afrohouse" },
]

export default function RadioSchedulePage() {
  const [genre, setGenre] = useState("todos")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Programação de Rádio</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "schedule" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <SearchFilters filters={GENRE_FILTERS} active={genre} onChange={setGenre} />
      <div className="space-y-2">
        {SCHEDULE.map((s, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <span className="text-lg font-mono font-bold text-primary w-14">{s.time}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{s.title}</p>
              <p className="text-[10px] text-muted-foreground">@{s.channel} · {s.genre}</p>
            </div>
            <Button size="sm" variant="outline" className="text-[10px] gap-1 shrink-0" onClick={() => toast.success(`Lembrete para "${s.title}" activado`)}><Bell className="w-3 h-3" />Lembrar</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
