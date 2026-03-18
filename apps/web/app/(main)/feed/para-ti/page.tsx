"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { LiveNowRail } from "@/components/feed/live-now-rail"
import { FeedMixedList, interleaveFeedItems, type FeedItem } from "@/components/feed/feed-mixed-list"
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

// Mock feed data
const MOCK_LIVE: any[] = [
  { id: "l1", username: "angolangamer", displayName: "Angola Gamer", viewerCount: 234, category: "Gaming" },
  { id: "l2", username: "kuduroking", displayName: "Kuduro King", viewerCount: 89, category: "Música" },
]

const MOCK_FEED: FeedItem[] = [
  { type: "stream", id: "s1", title: "Valorant Ranked Angola 🇦🇴", category: "Gaming", viewerCount: 234, startedAt: new Date(Date.now() - 3600000).toISOString(), streamer: { username: "angolangamer", displayName: "Angola Gamer" } },
  { type: "video", id: "v1", title: "Melhor jogada da semana - CS2", category: "Gaming", duration: 1800, views: 1200, uploadedAt: new Date(Date.now() - 86400000).toISOString(), streamer: { username: "proplayer_ao", displayName: "Pro Player AO" } },
  { type: "clip", id: "c1", title: "Clutch 1v5 insano! 🔥", duration: 30, views: 5600, streamer: { username: "angolangamer", displayName: "Angola Gamer" } },
  { type: "stream", id: "s2", title: "Kuduro ao vivo - Sexta à noite", category: "Música", viewerCount: 89, startedAt: new Date(Date.now() - 7200000).toISOString(), streamer: { username: "kuduroking", displayName: "Kuduro King" } },
  { type: "video", id: "v2", title: "Como cozinhar Muamba de Galinha", category: "Culinária", duration: 4200, views: 3400, uploadedAt: new Date(Date.now() - 172800000).toISOString(), streamer: { username: "chefangola", displayName: "Chef Angola" } },
  { type: "short", id: "sh1", title: "Tutorial dança kuduro em 15s", views: 12000, streamer: { username: "dancer_ao", displayName: "Dancer AO" } },
  { type: "clip", id: "c2", title: "Golo impossível no FIFA!", duration: 20, views: 8900, streamer: { username: "fifamaster", displayName: "FIFA Master AO" } },
  { type: "stream", id: "s3", title: "Conversa noturna com viewers", category: "Conversa", viewerCount: 45, startedAt: new Date(Date.now() - 1800000).toISOString(), streamer: { username: "talker_ao", displayName: "Talker AO" } },
]

export default function FeedParaTiPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setItems(interleaveFeedItems(MOCK_FEED))
      setLoading(false)
    }, 800)
  }, [])

  const loadMore = useCallback(() => {
    if (!hasMore) return
    setPage(p => p + 1)
    // Simulate loading more
    setTimeout(() => {
      if (page >= 3) { setHasMore(false); return }
      const more = MOCK_FEED.map(i => ({ ...i, id: `${i.id}-p${page + 1}` }))
      setItems(prev => [...prev, ...interleaveFeedItems(more)])
    }, 600)
  }, [page, hasMore])

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />

      <div className="max-w-screen-xl mx-auto py-4">
        {/* Live Now Rail — hidden if no live channels */}
        {MOCK_LIVE.length > 0 && <LiveNowRail channels={MOCK_LIVE} className="mb-6" />}

        {/* Feed */}
        {loading ? (
          <FeedSkeleton variant="grid" count={8} className="px-4" />
        ) : items.length === 0 ? (
          <FeedEmptyState
            emoji="📺"
            title="Nenhum conteúdo disponível"
            description="Segue mais criadores para teres um feed personalizado"
            actions={[
              { label: "Explorar canais angolanos →", href: "/feed/explorar" },
              { label: "Ver tendências →", href: "/explorar", variant: "outline" },
            ]}
          />
        ) : (
          <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading} className="px-4">
            <FeedMixedList items={items} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}
