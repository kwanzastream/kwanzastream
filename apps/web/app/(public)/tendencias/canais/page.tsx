import { TrendingSubPage } from "@/components/public/trending-sub-page"
const ITEMS = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1, title: `Creator ${i + 1}`, subtitle: `@creator${i} · ${["Gaming", "Música", "Futebol", "IRL"][i % 4]} · ${Math.floor(Math.random() * 5000) + 200} seguidores`,
  change: Math.floor(Math.random() * 150) - 10, metric: `+${Math.floor(Math.random() * 500) + 50} seg`, href: `/creator${i}`,
}))
export default function TrendingCanaisPage() {
  return <TrendingSubPage type="canais" title="Trending Canais" description="Canais com maior crescimento" items={ITEMS} />
}
