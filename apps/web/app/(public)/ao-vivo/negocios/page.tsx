import type { Metadata } from "next"
export const metadata: Metadata = { title: "Negocios ao Vivo | Kwanza Stream", description: "Streams de empreendedorismo e negocios angolanos ao vivo." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoNegóciosPage() {
  return <LiveCategoryPage category="negocios" title="Negócios" emoji="💼" description="Empreendedorismo, startups e negócios em Angola." />
}
