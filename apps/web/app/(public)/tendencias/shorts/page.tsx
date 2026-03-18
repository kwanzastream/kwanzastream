import { TrendingSubPage } from "@/components/public/trending-sub-page"
const ITEMS = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1, title: `Short Viral #${i + 1}`, subtitle: `@creator${i} · Trending`,
  change: Math.floor(Math.random() * 400) - 30, metric: `${Math.floor(Math.random() * 100) + 10}k views`, href: `/shorts/short-${i}`,
}))
export default function TrendingShortsPage() {
  return <TrendingSubPage type="shorts" title="Trending Shorts" description="Os shorts com mais visualizações" items={ITEMS} />
}
