"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { SearchBar } from "@/components/search/search-bar"
import { SearchTabs } from "@/components/search/search-tabs"
import { SearchResultsSection } from "@/components/search/search-results-section"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Radio, Users, Video, Scissors, Hash } from "lucide-react"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"

const MOCK_STREAMS = [
  { id: "s1", title: "Kuduro & Gaming 🇦🇴", username: "angolangamer", displayName: "Angola Gamer", isLive: true, viewerCount: 234, category: "Gaming" },
  { id: "s2", title: "Valorant Ranked Angola", username: "luanda_fps", displayName: "Luanda FPS", isLive: true, viewerCount: 89, category: "Valorant" },
]
const MOCK_CHANNELS = [
  { id: "c1", username: "angolangamer", displayName: "Angola Gamer", followers: 12400, isLive: true, category: "Gaming" },
  { id: "c2", username: "kuduroking", displayName: "Kuduro King", followers: 8900, isLive: false, category: "Música" },
  { id: "c3", username: "chef_mwangole", displayName: "Chef Mwangolê", followers: 3200, isLive: false, category: "Culinária" },
]
const MOCK_VIDEOS = [
  { id: "v1", title: "Melhores momentos — Girabola 2026", username: "desporto_ao", displayName: "Desporto AO", views: 15600, duration: "12:34" },
  { id: "v2", title: "Tutorial: Stream com telemóvel em Angola", username: "tech_ao", displayName: "Tech AO", views: 8900, duration: "25:10" },
]
const MOCK_CATEGORIES = [
  { id: "cat1", name: "Gaming", icon: "🎮", liveCount: 12 },
  { id: "cat2", name: "Música", icon: "🎵", liveCount: 5 },
]

function SearchTudoContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""
  const [query, setQuery] = useState(q)
  const [loading, setLoading] = useState(true)

  useEffect(() => { setQuery(q); setTimeout(() => setLoading(false), 500) }, [q])

  const total = MOCK_STREAMS.length + MOCK_CHANNELS.length + MOCK_VIDEOS.length + MOCK_CATEGORIES.length

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 space-y-4">
      <SearchBar initialQuery={q} />
      <SearchTabs query={q} />

      {loading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
      : total === 0 ? <SearchEmptyState query={q} />
      : <>
        <p className="text-xs text-muted-foreground">{total} resultados para &quot;{q}&quot;</p>

        <SearchResultsSection title="Ao Vivo" icon={<Radio className="w-4 h-4 text-[#CE1126]" />} count={MOCK_STREAMS.length} viewAllHref={`/pesquisa/streams?q=${encodeURIComponent(q)}`}>
          <div className="space-y-2">{MOCK_STREAMS.map(s => (
            <Link key={s.id} href={`/stream/${s.username}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#CE1126]/10 flex items-center justify-center shrink-0"><Radio className="w-4 h-4 text-[#CE1126]" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{s.title}</p><p className="text-xs text-muted-foreground">{s.displayName} · {s.category}</p></div>
              <div className="flex items-center gap-1.5 shrink-0"><Badge className="bg-[#CE1126] text-white text-[8px]">LIVE</Badge><span className="text-xs text-muted-foreground">{s.viewerCount}</span></div>
            </Link>
          ))}</div>
        </SearchResultsSection>

        <SearchResultsSection title="Canais" icon={<Users className="w-4 h-4" />} count={MOCK_CHANNELS.length} viewAllHref={`/pesquisa/canais?q=${encodeURIComponent(q)}`}>
          <div className="space-y-2">{MOCK_CHANNELS.map(c => (
            <Link key={c.id} href={`/${c.username}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
              <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary text-xs">{c.displayName.slice(0, 2)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{c.displayName}</p><p className="text-xs text-muted-foreground">@{c.username} · {(c.followers / 1000).toFixed(1)}k seguidores</p></div>
              {c.isLive && <Badge className="bg-[#CE1126] text-white text-[8px]">LIVE</Badge>}
            </Link>
          ))}</div>
        </SearchResultsSection>

        <SearchResultsSection title="Vídeos" icon={<Video className="w-4 h-4" />} count={MOCK_VIDEOS.length} viewAllHref={`/pesquisa/videos?q=${encodeURIComponent(q)}`}>
          <div className="space-y-2">{MOCK_VIDEOS.map(v => (
            <Link key={v.id} href={`/videos/${v.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0"><Video className="w-4 h-4 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{v.title}</p><p className="text-xs text-muted-foreground">{v.displayName} · {v.views.toLocaleString()} views · {v.duration}</p></div>
            </Link>
          ))}</div>
        </SearchResultsSection>

        <SearchResultsSection title="Categorias" icon={<Hash className="w-4 h-4" />} count={MOCK_CATEGORIES.length} viewAllHref={`/pesquisa/categorias?q=${encodeURIComponent(q)}`}>
          <div className="flex gap-3">{MOCK_CATEGORIES.map(c => (
            <Link key={c.id} href={`/categorias/${c.id}`} className="flex items-center gap-2 p-3 rounded-xl border border-white/10 hover:border-primary/30">
              <span className="text-xl">{c.icon}</span><div><p className="text-sm font-bold">{c.name}</p><p className="text-[10px] text-muted-foreground">{c.liveCount} ao vivo</p></div>
            </Link>
          ))}</div>
        </SearchResultsSection>
      </>}
    </div>
  )
}

export default function PesquisaTudoPage() { return <Suspense><SearchTudoContent /></Suspense> }
