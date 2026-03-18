"use client"

import { useState } from "react"
import Link from "next/link"
import { Hash, Eye } from "lucide-react"
import { ChannelCard, ContentGrid, EmptyContent } from "@/components/public/content-card"
import { TabPills } from "@/components/public/content-filters"
import { WhatsAppShareButton } from "@/components/public/whatsapp-share-button"

export function TagPageClient({ slug, tagName }: { slug: string; tagName: string }) {
  const [activeTab, setActiveTab] = useState("streams")

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span>Tags</span>
          <span>/</span><span className="text-foreground">{tagName}</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Hash className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">#{tagName}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Tag criada por streamers</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />12k views</span>
            </div>
          </div>
        </div>
        <WhatsAppShareButton url={`/tags/${slug}`} text={`#${tagName} — Kwanza Stream`} variant="outline" size="sm" className="mt-2 gap-1.5 text-xs" />
      </div>

      <div className="mb-6">
        <TabPills
          tabs={[{ value: "streams", label: "Streams" }, { value: "canais", label: "Canais" }]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {activeTab === "streams" && (
        <EmptyContent emoji="📺" title={`Nenhum stream com a tag #${tagName}`} description="Streams com esta tag aparecerão aqui quando forem ao vivo" />
      )}

      {activeTab === "canais" && (
        <ContentGrid cols={5}>
          {Array.from({ length: 6 }, (_, i) => (
            <ChannelCard key={i} username={`tag-creator${i}`} displayName={`Creator ${i + 1}`} category={tagName} followers={Math.floor(Math.random() * 3000)} />
          ))}
        </ContentGrid>
      )}
    </div>
  )
}
