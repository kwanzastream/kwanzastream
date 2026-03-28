import type { Metadata } from "next"
export const metadata: Metadata = { title: "Clips em Tendencia | Kwanza Stream", description: "Os clips mais vistos e partilhados no Kwanza Stream." }

import { TrendingSubPage } from "@/components/public/trending-sub-page"
const ITEMS = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1, title: `Clip Trending #${i + 1}`, subtitle: `Criador ${i + 1} · Gaming`,
  change: Math.floor(Math.random() * 300) - 50, metric: `${Math.floor(Math.random() * 50) + 5}k views`, href: `/clips/clip-${i}`,
}))
export default function TrendingClipsPage() {
  return <TrendingSubPage type="clips" title="Trending Clips" description="Os clips mais virais da plataforma" items={ITEMS} />
}
