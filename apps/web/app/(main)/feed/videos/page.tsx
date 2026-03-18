"use client"

import { useState, useEffect } from "react"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedCardVideo } from "@/components/feed/feed-card-video"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
import { FeedEmptyState } from "@/components/feed/feed-empty-state"
import { InfiniteScroll } from "@/components/feed/infinite-scroll"
import { Flame, Users, Compass, Video, Scissors, Play, CalendarDays, UserPlus } from "lucide-react"

const TABS = [
  { id: "para-ti", label: "Para Ti", href: "/feed/para-ti", icon: <Flame className="w-3.5 h-3.5" /> },
  { id: "a-seguir", label: "A Seguir", href: "/feed/a-seguir", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "explorar", label: "Explorar", href: "/feed/explorar", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "videos", label: "Vídeos", href: "/feed/videos", icon: <Video className="w-3.5 h-3.5" /> },
  { id: "clips", label: "Clips", href: "/feed/clips", icon: <Scissors className="w-3.5 h-3.5" /> },
  { id: "shorts", label: "Shorts", href: "/feed/shorts", icon: <Play className="w-3.5 h-3.5" /> },
  { id: "eventos", label: "Eventos", href: "/feed/eventos", icon: <CalendarDays className="w-3.5 h-3.5" /> },
  { id: "canais-novos", label: "Novos", href: "/feed/canais-novos", icon: <UserPlus className="w-3.5 h-3.5" /> },
]

const FILTERS = {
  source: ["Todos", "Canais seguidos", "Para ti"],
  duration: ["Qualquer", "< 30min", "30–120min", "> 2h"],
  sort: ["Recente", "Popular", "Recomendado"],
}

const MOCK_VIDEOS = [
  { id: "v1", title: "Melhor jogada da semana - CS2", category: "Gaming", duration: 1800, views: 1200, uploadedAt: new Date(Date.now() - 86400000).toISOString(), streamer: { username: "proplayer_ao", displayName: "Pro Player AO" } },
  { id: "v2", title: "Como cozinhar Muamba de Galinha", category: "Culinária", duration: 4200, views: 3400, uploadedAt: new Date(Date.now() - 172800000).toISOString(), streamer: { username: "chefangola", displayName: "Chef Angola" } },
  { id: "v3", title: "Setup Gaming barato em Angola", category: "Tecnologia", duration: 900, views: 890, uploadedAt: new Date(Date.now() - 259200000).toISOString(), streamer: { username: "tech_ao", displayName: "Tech AO" } },
  { id: "v4", title: "Tutorial de Semba na guitarra", category: "Música", duration: 7200, views: 2100, uploadedAt: new Date(Date.now() - 345600000).toISOString(), streamer: { username: "guitarra_ao", displayName: "Guitarra AO" } },
]

export default function FeedVideosPage() {
  const [source, setSource] = useState("Todos")
  const [duration, setDuration] = useState("Qualquer")
  const [sort, setSort] = useState("Recente")
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    setTimeout(() => { setVideos(MOCK_VIDEOS); setLoading(false) }, 600)
  }, [])

  // Client-side filter demo
  const filtered = videos.filter((v) => {
    if (duration === "< 30min" && v.duration >= 1800) return false
    if (duration === "30–120min" && (v.duration < 1800 || v.duration > 7200)) return false
    if (duration === "> 2h" && v.duration <= 7200) return false
    return true
  }).sort((a, b) => sort === "Popular" ? b.views - a.views : new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />
      <div className="max-w-screen-xl mx-auto py-4 px-4 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.source.map((s) => (
            <button key={s} onClick={() => setSource(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${source === s ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground hover:text-foreground"}`}>{s}</button>
          ))}
          <div className="w-px bg-white/10 mx-1" />
          {FILTERS.duration.map((d) => (
            <button key={d} onClick={() => setDuration(d)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${duration === d ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{d}</button>
          ))}
          <div className="w-px bg-white/10 mx-1" />
          {FILTERS.sort.map((sr) => (
            <button key={sr} onClick={() => setSort(sr)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${sort === sr ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{sr}</button>
          ))}
        </div>

        {loading ? <FeedSkeleton count={4} /> : filtered.length === 0 ? (
          <FeedEmptyState emoji="🎬" title="Nenhum vídeo encontrado" description="Tenta ajustar os filtros" />
        ) : (
          <InfiniteScroll onLoadMore={() => {}} hasMore={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((v) => <FeedCardVideo key={v.id} {...v} />)}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}
