"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { StreamCard, VideoCard, ClipCard, ChannelCard, ContentGrid, EmptyContent } from "@/components/public/content-card"
import { WhatsAppShareButton } from "@/components/public/whatsapp-share-button"

const CATEGORY_TABS = [
  { value: "streams", label: "Streams ao Vivo" },
  { value: "videos", label: "Vídeos" },
  { value: "clips", label: "Clips" },
  { value: "shorts", label: "Shorts" },
  { value: "canais", label: "Canais" },
  { value: "torneios", label: "Torneios" },
]

interface CategoryMeta { emoji: string; name: string; angolaFirst: boolean; description?: string }

export function CategoryPageClient({ slug, meta }: { slug: string; meta: CategoryMeta }) {
  const [activeTab, setActiveTab] = useState("streams")

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <section className={`relative overflow-hidden ${meta.angolaFirst ? "bg-gradient-to-br from-[#CE1126]/10 via-background to-[#F9D616]/5" : "bg-muted/20"}`}>
        <div className="max-w-screen-xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/explorar/categorias" className="hover:text-foreground">Categorias</Link>
            <span>/</span><span className="text-foreground">{meta.name}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{meta.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{meta.name}</h1>
                {meta.angolaFirst && <Badge className="bg-[#F9D616] text-black text-[9px] font-bold">🇦🇴 ANGOLA-FIRST</Badge>}
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full animate-pulse" />8 ao vivo</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />45k views esta semana</span>
              </div>
            </div>
          </div>
          {meta.description && <p className="text-muted-foreground max-w-2xl leading-relaxed">{meta.description}</p>}
          <div className="mt-4">
            <WhatsAppShareButton url={`/categoria/${slug}`} text={`${meta.emoji} ${meta.name} — Kwanza Stream`} variant="outline" size="sm" className="gap-1.5 text-xs" />
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-4 py-2">
          <div className="scroll-tabs gap-2">
            {CATEGORY_TABS.map((tab) => (
              <button key={tab.value} onClick={() => setActiveTab(tab.value)} className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${activeTab === tab.value ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {activeTab === "streams" && (
          <EmptyContent emoji="📺" title={`Nenhum stream de ${meta.name} ao vivo`} description="Volta mais tarde ou explora outras categorias" />
        )}
        {activeTab === "videos" && (
          <ContentGrid cols={3}>
            {Array.from({ length: 6 }, (_, i) => (
              <VideoCard key={i} id={`${slug}-video-${i}`} title={`${meta.name} - Vídeo #${i + 1}`} duration={`${Math.floor(Math.random() * 90) + 10}:00`} views={Math.floor(Math.random() * 5000)} publishedAt={`${i + 1} dias atrás`} streamer={{ username: `creator${i}`, displayName: `Criador ${i + 1}` }} />
            ))}
          </ContentGrid>
        )}
        {activeTab === "clips" && (
          <ContentGrid cols={4}>
            {Array.from({ length: 8 }, (_, i) => (
              <ClipCard key={i} id={`${slug}-clip-${i}`} title={`${meta.name} - Clip #${i + 1}`} duration={`0:${String(Math.floor(Math.random() * 60) + 10).padStart(2, "0")}`} views={Math.floor(Math.random() * 10000)} streamer={{ username: `creator${i}`, displayName: `Criador ${i + 1}` }} />
            ))}
          </ContentGrid>
        )}
        {activeTab === "shorts" && (
          <EmptyContent emoji="📱" title="Sem shorts nesta categoria" description="Shorts aparecerão aqui quando os criadores começarem a publicar" />
        )}
        {activeTab === "canais" && (
          <ContentGrid cols={5}>
            {Array.from({ length: 10 }, (_, i) => (
              <ChannelCard key={i} username={`${slug}-creator${i}`} displayName={`${meta.name} Creator ${i + 1}`} category={meta.name} followers={Math.floor(Math.random() * 5000)} verified={i < 2} isLive={i < 3} />
            ))}
          </ContentGrid>
        )}
        {activeTab === "torneios" && (
          <EmptyContent emoji="🏆" title="Sem torneios nesta categoria" description="Os torneios aparecerão aqui quando forem criados" />
        )}
      </div>
    </div>
  )
}
