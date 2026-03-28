import type { Metadata } from "next"
export const metadata: Metadata = { title: "Radio ao Vivo | Kwanza Stream", description: "Modo radio ao vivo — DJs, podcasters e musicos no Kwanza Stream." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoRádioPage() {
  return <LiveCategoryPage category="radio" title="Rádio" emoji="📻" description="Modo rádio — áudio only para DJs, podcasters e músicos." />
}
