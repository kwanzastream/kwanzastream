"use client"

import { useState, useEffect } from "react"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedCardClip } from "@/components/feed/feed-card-clip"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
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

const FILTER_OPTS = ["Canais seguidos", "Trending", "Gaming", "Música", "Culinária"]

const MOCK_CLIPS = [
  { id: "c1", title: "Clutch 1v5 insano! 🔥", duration: 30, views: 5600, streamer: { username: "angolangamer", displayName: "Angola Gamer" } },
  { id: "c2", title: "Golo impossível no FIFA!", duration: 20, views: 8900, streamer: { username: "fifamaster", displayName: "FIFA Master AO" } },
  { id: "c3", title: "Reacção épica ao raid de 500!", duration: 45, views: 3200, streamer: { username: "talker_ao", displayName: "Talker AO" } },
  { id: "c4", title: "Kuduro dance battle no stream", duration: 60, views: 7100, streamer: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "c5", title: "Momento mais engraçado da semana", duration: 15, views: 4500, streamer: { username: "comedy_ao", displayName: "Comedy AO" } },
  { id: "c6", title: "Headshot triplo com AWP", duration: 12, views: 6200, streamer: { username: "proplayer_ao", displayName: "Pro Player AO" } },
]

export default function FeedClipsPage() {
  const [filter, setFilter] = useState("Trending")
  const [loading, setLoading] = useState(true)
  const [clips, setClips] = useState<any[]>([])

  useEffect(() => { setTimeout(() => { setClips(MOCK_CLIPS); setLoading(false) }, 600) }, [])

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />
      <div className="max-w-screen-xl mx-auto py-4 px-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filter === f ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{f}</button>
          ))}
        </div>
        {loading ? <FeedSkeleton count={6} /> : (
          <InfiniteScroll onLoadMore={() => {}} hasMore={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clips.map((c) => <FeedCardClip key={c.id} {...c} />)}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}
