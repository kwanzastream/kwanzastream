"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StreamCard, CategoryCard, ChannelCard, ContentGrid, GridSkeleton, EmptyContent, SectionHeader } from "@/components/public/content-card"

const EXPLORE_TABS = [
  { value: "tudo", label: "Tudo" },
  { value: "streams", label: "Streams", href: "/explorar/streams" },
  { value: "videos", label: "Vídeos", href: "/explorar/videos" },
  { value: "clips", label: "Clips", href: "/explorar/clips" },
  { value: "shorts", label: "Shorts", href: "/explorar/shorts" },
  { value: "categorias", label: "Categorias", href: "/explorar/categorias" },
  { value: "canais", label: "Canais", href: "/explorar/canais" },
  { value: "eventos", label: "Eventos", href: "/explorar/eventos" },
  { value: "torneios", label: "Torneios", href: "/explorar/torneios" },
  { value: "tribos", label: "Tribos", href: "/explorar/tribos" },
  { value: "radio", label: "Rádio", href: "/explorar/radio" },
]

const ANGOLA_CATEGORIES = [
  { slug: "gaming", name: "Gaming Angola", emoji: "🎮", angolaFirst: true },
  { slug: "musica", name: "Música ao Vivo", emoji: "🎵", angolaFirst: true },
  { slug: "futebol", name: "Futebol Angola", emoji: "⚽", angolaFirst: true },
  { slug: "just-talking", name: "Just Talking PT-AO", emoji: "🎤", angolaFirst: true },
  { slug: "irl", name: "IRL Angola", emoji: "📍", angolaFirst: true },
  { slug: "radio", name: "Modo Rádio", emoji: "📻", angolaFirst: true },
  { slug: "negocios", name: "Negócios & Empreendedorismo", emoji: "💼", angolaFirst: true },
  { slug: "criatividade", name: "Criatividade & Arte", emoji: "🎨", angolaFirst: true },
  { slug: "tech", name: "Tech & Dev", emoji: "💻", angolaFirst: false },
  { slug: "comedia", name: "Comédia", emoji: "😂", angolaFirst: false },
  { slug: "educacao", name: "Educação", emoji: "📚", angolaFirst: false },
  { slug: "culinaria", name: "Culinária", emoji: "🍳", angolaFirst: false },
]

export default function ExplorarPage() {
  const [search, setSearch] = useState("")
  const [streams, setStreams] = useState<any[]>([])
  const [creators, setCreators] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get("/api/streams/live").catch(() => ({ data: [] })),
      api.get("/api/recommendations/creators").catch(() => ({ data: [] })),
    ]).then(([streamsRes, creatorsRes]) => {
      setStreams(streamsRes.data?.streams || streamsRes.data || [])
      setCreators(creatorsRes.data?.creators || creatorsRes.data || [])
    }).finally(() => setLoading(false))
  }, [])

  const filteredStreams = streams.filter((s: any) =>
    search ? s.title?.toLowerCase().includes(search.toLowerCase()) || s.streamer?.displayName?.toLowerCase().includes(search.toLowerCase()) : true
  )

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Explorar</h1>
        <p className="text-sm text-muted-foreground mb-4">Descobre conteúdo, criadores e comunidades angolanas</p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Pesquisar streams, canais, categorias..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="scroll-tabs gap-2 mb-6">
        {EXPLORE_TABS.map((tab) => (
          tab.href ? (
            <Link key={tab.value} href={tab.href} className="px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground">
              {tab.label}
            </Link>
          ) : (
            <span key={tab.value} className="px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border border-primary bg-primary/10 text-primary font-medium">
              {tab.label}
            </span>
          )
        ))}
      </div>

      {/* Content */}
      {loading ? <GridSkeleton count={8} /> : (
        <div className="space-y-12">
          {/* Live Streams */}
          <section>
            <SectionHeader title="Ao Vivo Agora" href="/ao-vivo" badge={`${filteredStreams.length}`} live />
            {filteredStreams.length === 0 ? (
              <EmptyContent emoji="📺" title="Nenhum stream ao vivo" description="Volta mais tarde ou sê o primeiro a transmitir!" />
            ) : (
              <ContentGrid>
                {filteredStreams.slice(0, 8).map((stream: any) => (
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
          </section>

          {/* Angola-First Categories */}
          <section>
            <SectionHeader title="Categorias Angola-First 🇦🇴" href="/explorar/categorias" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ANGOLA_CATEGORIES.filter(c => c.angolaFirst).map((cat) => (
                <CategoryCard key={cat.slug} slug={cat.slug} name={cat.name} emoji={cat.emoji} angolaFirst />
              ))}
            </div>
          </section>

          {/* Global Categories */}
          <section>
            <SectionHeader title="Outras Categorias" href="/explorar/categorias" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ANGOLA_CATEGORIES.filter(c => !c.angolaFirst).map((cat) => (
                <CategoryCard key={cat.slug} slug={cat.slug} name={cat.name} emoji={cat.emoji} />
              ))}
            </div>
          </section>

          {/* Featured Creators */}
          <section>
            <SectionHeader title="Criadores em Destaque" href="/explorar/canais" />
            {creators.length === 0 ? (
              <EmptyContent emoji="👥" title="Nenhum criador disponível" description="Os criadores aparecerão aqui quando estiverem registados" />
            ) : (
              <ContentGrid cols={6}>
                {creators.slice(0, 12).map((creator: any) => (
                  <ChannelCard
                    key={creator.id}
                    username={creator.username}
                    displayName={creator.displayName}
                    avatarUrl={creator.avatarUrl}
                    followers={creator.followersCount}
                    verified={creator.verified}
                    isLive={creator.isLive}
                  />
                ))}
              </ContentGrid>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
