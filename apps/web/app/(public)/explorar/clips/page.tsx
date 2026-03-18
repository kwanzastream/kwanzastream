"use client"

import { useState } from "react"
import { ClipCard, ContentGrid, EmptyContent } from "@/components/public/content-card"
import { ContentFilters } from "@/components/public/content-filters"
import { WhatsAppShareButton } from "@/components/public/whatsapp-share-button"
import Link from "next/link"

const MOCK_CLIPS = Array.from({ length: 16 }, (_, i) => ({
  id: `clip-${i}`, title: `Clip incrível #${i + 1} — Momento épico`,
  thumbnailUrl: undefined,
  duration: `0:${String(Math.floor(Math.random() * 80) + 10).padStart(2, "0")}`,
  views: Math.floor(Math.random() * 10000),
  streamer: { username: `creator${i}`, displayName: `Criador ${i + 1}`, avatarUrl: undefined }
}))

export default function ExplorarClipsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Clips</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Clips</h1>
        <p className="text-sm text-muted-foreground">Melhores momentos de 10 a 90 segundos, prontos a partilhar no WhatsApp</p>
      </div>

      <div className="mb-6">
        <ContentFilters
          categories={[
            { value: "gaming", label: "🎮 Gaming" }, { value: "musica", label: "🎵 Música" },
            { value: "futebol", label: "⚽ Futebol" }, { value: "comedia", label: "😂 Comédia" },
          ]}
          durations={[
            { value: "", label: "Qualquer duração" },
            { value: "10-30", label: "10–30 seg" },
            { value: "30-60", label: "30–60 seg" },
            { value: "60-90", label: "60–90 seg" },
          ]}
          onFilterChange={setFilters}
        />
      </div>

      <ContentGrid cols={4}>
        {MOCK_CLIPS.map((clip) => (
          <ClipCard key={clip.id} {...clip} />
        ))}
      </ContentGrid>
    </div>
  )
}
