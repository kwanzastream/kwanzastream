import type { Metadata } from "next"
export const metadata: Metadata = { title: "Criatividade ao Vivo | Kwanza Stream", description: "Streams de arte, design e criatividade ao vivo no Kwanza Stream." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoCriatividadePage() {
  return <LiveCategoryPage category="criatividade" title="Criatividade" emoji="🎨" description="Arte, design, música e criação de conteúdo ao vivo." />
}
