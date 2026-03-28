import type { Metadata } from "next"
export const metadata: Metadata = { title: "Categorias em Tendencia | Kwanza Stream", description: "As categorias mais populares no Kwanza Stream." }

import { TrendingSubPage } from "@/components/public/trending-sub-page"
const ITEMS = [
  { rank: 1, title: "🎮 Gaming Angola", subtitle: "15 streams ao vivo", change: 45, metric: "62k views", href: "/categoria/gaming" },
  { rank: 2, title: "🎵 Música ao Vivo", subtitle: "8 streams ao vivo", change: 32, metric: "38k views", href: "/categoria/musica" },
  { rank: 3, title: "⚽ Futebol Angola", subtitle: "5 streams ao vivo", change: 120, metric: "85k views", href: "/categoria/futebol" },
  { rank: 4, title: "💬 Just Talking", subtitle: "12 streams ao vivo", change: 18, metric: "28k views", href: "/categoria/just-talking" },
  { rank: 5, title: "📍 IRL Angola", subtitle: "4 streams ao vivo", change: 65, metric: "12k views", href: "/categoria/irl" },
  { rank: 6, title: "📻 Modo Rádio", subtitle: "6 streams ao vivo", change: -5, metric: "22k views", href: "/categoria/radio" },
  { rank: 7, title: "💼 Negócios", subtitle: "3 streams ao vivo", change: 80, metric: "8k views", href: "/categoria/negocios" },
  { rank: 8, title: "🎨 Criatividade", subtitle: "2 streams ao vivo", change: 10, metric: "6k views", href: "/categoria/criatividade" },
  { rank: 9, title: "😂 Comédia", subtitle: "3 streams ao vivo", change: 25, metric: "14k views", href: "/categoria/comedia" },
  { rank: 10, title: "💻 Tech & Dev", subtitle: "1 stream ao vivo", change: -12, metric: "5k views", href: "/categoria/tech" },
]
export default function TrendingCategoriasPage() {
  return <TrendingSubPage type="categorias" title="Trending Categorias" description="Categorias com mais crescimento de audiência" items={ITEMS} />
}
