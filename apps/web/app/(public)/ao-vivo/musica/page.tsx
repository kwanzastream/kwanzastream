import type { Metadata } from "next"
export const metadata: Metadata = { title: "Musica ao Vivo | Kwanza Stream", description: "Performances musicais ao vivo — kuduro, semba, kizomba e mais." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoMúsicaPage() {
  return <LiveCategoryPage category="musica" title="Música" emoji="🎵" description="Performances ao vivo — kuduro, semba, kizomba, hip-hop e mais." />
}
