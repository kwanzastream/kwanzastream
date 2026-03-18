"use client"

import { useState } from "react"
import { ChannelCard, ContentGrid, GridSkeleton, EmptyContent } from "@/components/public/content-card"
import { ContentFilters } from "@/components/public/content-filters"
import Link from "next/link"
import { getProvinceOptions } from "@/lib/angola-provinces"

const MOCK_CHANNELS = Array.from({ length: 18 }, (_, i) => ({
  username: `creator${i}`, displayName: `Criador Angolano ${i + 1}`, avatarUrl: undefined,
  bio: "Conteúdo angolano de qualidade", category: ["Gaming", "Música", "Futebol", "IRL"][i % 4],
  followers: Math.floor(Math.random() * 10000), verified: i < 3,
  isLive: i < 4, badge: i < 2 ? "Partner" : i < 5 ? "Afiliado" : undefined,
}))

export default function ExplorarCanaisPage() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Canais</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Todos os Canais</h1>
        <p className="text-sm text-muted-foreground">Directório de canais públicos da plataforma</p>
      </div>

      <div className="mb-6">
        <ContentFilters
          categories={[
            { value: "gaming", label: "🎮 Gaming" }, { value: "musica", label: "🎵 Música" },
            { value: "futebol", label: "⚽ Futebol" }, { value: "irl", label: "📍 IRL" },
          ]}
          sortOptions={[
            { value: "followers", label: "Seguidores" },
            { value: "live", label: "Ao vivo agora" },
            { value: "recent", label: "Mais recente" },
            { value: "oldest", label: "Mais antigo" },
          ]}
          showLiveToggle
          onFilterChange={setFilters}
        />
      </div>

      <ContentGrid cols={5}>
        {MOCK_CHANNELS.map((channel) => (
          <ChannelCard key={channel.username} {...channel} />
        ))}
      </ContentGrid>
    </div>
  )
}
