"use client"
import { RadioGenreCard, type RadioGenre } from "@/components/radio/radio-genre-card"
import { Music } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/radio/ao-vivo" },
  { id: "generos", label: "Géneros", href: "/radio/generos" },
  { id: "schedule", label: "Programação", href: "/radio/schedule" },
  { id: "top", label: "Top", href: "/radio/top" },
  { id: "recentes", label: "Recentes", href: "/radio/recentes" },
  { id: "guardados", label: "Guardados", href: "/radio/guardados" },
]

const ANGOLA_FIRST: RadioGenre[] = [
  { slug: "kuduro", name: "Kuduro", emoji: "🎵", liveCount: 3, color: "#CE1126" },
  { slug: "semba", name: "Semba", emoji: "🎶", liveCount: 2, color: "#F59E0B" },
  { slug: "kizomba", name: "Kizomba", emoji: "💃", liveCount: 1, color: "#EC4899" },
  { slug: "afrohouse", name: "Afrohouse", emoji: "🔊", liveCount: 2, color: "#8B5CF6" },
  { slug: "hiphop-ao", name: "Hip-Hop AO", emoji: "🎤", liveCount: 1, color: "#6366F1" },
  { slug: "gospel-angola", name: "Gospel Angola", emoji: "🙏", liveCount: 1, color: "#14B8A6" },
  { slug: "musica-tradicional", name: "Música Tradicional", emoji: "🥁", liveCount: 0, color: "#D97706" },
]

const TALK: RadioGenre[] = [
  { slug: "noticias", name: "Notícias", emoji: "📻", liveCount: 1 },
  { slug: "podcasts", name: "Podcasts", emoji: "🎙️", liveCount: 0 },
  { slug: "debates", name: "Debates", emoji: "💬", liveCount: 0 },
  { slug: "desporto", name: "Desporto", emoji: "⚽", liveCount: 1 },
]

const INTERNATIONAL: RadioGenre[] = [
  { slug: "afrobeats", name: "Afrobeats", emoji: "🌍", liveCount: 0 },
  { slug: "reggae", name: "Reggae", emoji: "🟢", liveCount: 0 },
  { slug: "rnb", name: "R&B", emoji: "🎹", liveCount: 0 },
]

export default function RadioGenerosPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Music className="w-5 h-5" />Géneros de Rádio</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "generos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>

      <div className="space-y-2"><h2 className="text-sm font-bold">🇦🇴 Angola-First</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{ANGOLA_FIRST.map(g => <RadioGenreCard key={g.slug} genre={g} />)}</div></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">🎙️ Conversa</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{TALK.map(g => <RadioGenreCard key={g.slug} genre={g} />)}</div></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">🌍 Internacional</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{INTERNATIONAL.map(g => <RadioGenreCard key={g.slug} genre={g} />)}</div></div>
    </div>
  )
}
