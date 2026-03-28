import type { Metadata } from "next"
export const metadata: Metadata = { title: "IRL Angola ao Vivo | Kwanza Stream", description: "Aventuras nas ruas de Angola ao vivo no Kwanza Stream." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoIRLAngolaPage() {
  return <LiveCategoryPage category="irl" title="IRL Angola" emoji="📍" description="Aventuras nas ruas de Angola — eventos, viagens e dia-a-dia." />
}
