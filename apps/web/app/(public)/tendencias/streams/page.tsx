import { TrendingSubPage } from "@/components/public/trending-sub-page"
const ITEMS = Array.from({ length: 15 }, (_, i) => ({
  rank: i + 1, title: `Stream de pico #${i + 1}`, subtitle: `@streamer${i} · ${["Gaming", "Música", "Futebol", "Just Talking"][i % 4]}`,
  change: Math.floor(Math.random() * 200) - 20, metric: `${Math.floor(Math.random() * 5) + 1}k viewers`, href: `/stream/streamer${i}`,
}))
export default function TrendingStreamsPage() {
  return <TrendingSubPage type="streams" title="Trending Streams" description="Streams com mais pico de audiência" items={ITEMS} />
}
