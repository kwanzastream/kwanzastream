"use client"

import { useState } from "react"
import { VideoCard, ContentGrid, GridSkeleton, EmptyContent } from "@/components/public/content-card"
import { ContentFilters } from "@/components/public/content-filters"
import Link from "next/link"

const MOCK_VIDEOS = Array.from({ length: 12 }, (_, i) => ({
  id: `video-${i}`, title: `Vídeo ${i + 1} — Conteúdo angolano de qualidade`, thumbnailUrl: undefined,
  duration: `${Math.floor(Math.random() * 120) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  views: Math.floor(Math.random() * 5000), publishedAt: `${Math.floor(Math.random() * 7) + 1} dias atrás`,
  streamer: { username: `creator${i}`, displayName: `Criador ${i + 1}`, avatarUrl: undefined }
}))

export default function ExplorarVideosPage() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Vídeos</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Vídeos Gravados (VODs)</h1>
        <p className="text-sm text-muted-foreground">Revê os melhores momentos dos streams passados</p>
      </div>

      <div className="mb-6">
        <ContentFilters
          categories={[
            { value: "gaming", label: "🎮 Gaming" }, { value: "musica", label: "🎵 Música" },
            { value: "futebol", label: "⚽ Futebol" }, { value: "just-talking", label: "💬 Just Talking" },
          ]}
          onFilterChange={setFilters}
        />
      </div>

      <ContentGrid cols={3}>
        {MOCK_VIDEOS.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </ContentGrid>
    </div>
  )
}
