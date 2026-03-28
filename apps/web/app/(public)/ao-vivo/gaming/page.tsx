import type { Metadata } from "next"
export const metadata: Metadata = { title: "Gaming ao Vivo | Kwanza Stream", description: "Streams de gaming ao vivo — CS2, FIFA, Free Fire e mais no Kwanza Stream." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoGamingPage() {
  return <LiveCategoryPage category="gaming" title="Gaming" emoji="🎮" description="Streams de gaming ao vivo — CS2, FIFA, Free Fire e mais." />
}
