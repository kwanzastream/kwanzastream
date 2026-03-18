"use client"

import { useEffect, useState, useCallback } from "react"
import { api } from "@/lib/api"
import { StreamCard, ContentGrid, GridSkeleton, EmptyContent, SectionHeader } from "@/components/public/content-card"
import { ContentFilters } from "@/components/public/content-filters"
import Link from "next/link"

const CATEGORIES = [
  { value: "gaming", label: "🎮 Gaming" }, { value: "musica", label: "🎵 Música" },
  { value: "futebol", label: "⚽ Futebol" }, { value: "just-talking", label: "💬 Just Talking" },
  { value: "irl", label: "📍 IRL" }, { value: "criatividade", label: "🎨 Criatividade" },
  { value: "radio", label: "📻 Rádio" }, { value: "negocios", label: "💼 Negócios" },
]

export default function ExplorarStreamsPage() {
  const [streams, setStreams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Record<string, string>>({})

  const fetchStreams = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get("/api/streams/live")
      setStreams(res.data?.streams || res.data || [])
    } catch { setStreams([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchStreams() }, [fetchStreams])

  const filtered = streams.filter((s: any) => {
    if (filters.category && s.category?.toLowerCase() !== filters.category) return false
    return true
  })

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Streams</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Streams ao Vivo</h1>
        <p className="text-sm text-muted-foreground">Todos os canais actualmente ao vivo na plataforma</p>
      </div>

      <div className="mb-6">
        <ContentFilters categories={CATEGORIES} showLiveToggle onFilterChange={setFilters} />
      </div>

      {loading ? <GridSkeleton /> : filtered.length === 0 ? (
        <EmptyContent emoji="📺" title="Nenhum stream ao vivo" description="Nenhum canal está a transmitir de momento. Volta mais tarde!" />
      ) : (
        <ContentGrid cols={3}>
          {filtered.map((stream: any) => (
            <StreamCard
              key={stream.id}
              id={stream.id}
              title={stream.title}
              category={stream.category}
              viewerCount={stream.viewerCount}
              thumbnailUrl={stream.thumbnailUrl}
              streamer={stream.streamer || { username: stream.id, displayName: "Streamer" }}
            />
          ))}
        </ContentGrid>
      )}
    </div>
  )
}
