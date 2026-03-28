import type { Metadata } from "next"
export const metadata: Metadata = { title: "Futebol ao Vivo | Kwanza Stream", description: "Streams de futebol angolano ao vivo — Girabola, selecao nacional e mais." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoFutebolPage() {
  return <LiveCategoryPage category="futebol" title="Futebol" emoji="⚽" description="Girabola, seleção nacional e análises de futebol angolano." />
}
