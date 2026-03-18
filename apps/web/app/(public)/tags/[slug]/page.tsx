import type { Metadata } from "next"
import { TagPageClient } from "@/components/public/tag-page-client"

function formatTagName(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tagName = formatTagName(slug)
  return {
    title: `#${tagName} — Kwanza Stream`,
    description: `Descobre streams e canais com a tag #${tagName} no Kwanza Stream. Conteúdo angolano ao vivo.`,
    openGraph: {
      title: `#${tagName} — Kwanza Stream`,
      description: `Conteúdo com a tag #${tagName} no Kwanza Stream.`,
      type: "website",
      locale: "pt_AO",
    },
  }
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tagName = formatTagName(slug)
  return <TagPageClient slug={slug} tagName={tagName} />
}
