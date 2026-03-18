"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedCardStream } from "@/components/feed/feed-card-stream"
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

// Mock — chronological content from followed channels only
const MOCK_FOLLOWING: any[] = [
  { type: "stream", id: "fs1", title: "Stream noturno de domingo", category: "Conversa", viewerCount: 45, startedAt: new Date(Date.now() - 900000).toISOString(), streamer: { username: "talker_ao", displayName: "Talker AO" } },
  { type: "video", id: "fv1", title: "Resumo da semana no gaming angolano", category: "Gaming", duration: 2400, views: 890, uploadedAt: new Date(Date.now() - 43200000).toISOString(), thumbnailUrl: "", streamer: { username: "angolangamer", displayName: "Angola Gamer" } },
]

export default function FeedASeguirPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setTimeout(() => { setItems(MOCK_FOLLOWING); setLoading(false) }, 600)
  }, [])

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />
      <div className="max-w-screen-xl mx-auto py-4 px-4">
        {loading ? <FeedSkeleton count={4} /> : items.length === 0 ? (
          <FeedEmptyState
            emoji="👥"
            title="Ainda não segues nenhum canal"
            description="Segue criadores angolanos para veres o seu conteúdo aqui"
            actions={[
              { label: "Explorar canais angolanos →", href: "/feed/explorar" },
              { label: "Ver o que está em tendência →", href: "/explorar", variant: "outline" },
            ]}
          />
        ) : (
          <InfiniteScroll onLoadMore={() => {}} hasMore={hasMore}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item) => item.type === "stream" ? (
                <FeedCardStream key={item.id} {...item} />
              ) : (
                <FeedCardVideo key={item.id} {...item} uploadedAt={item.uploadedAt || new Date().toISOString()} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}
