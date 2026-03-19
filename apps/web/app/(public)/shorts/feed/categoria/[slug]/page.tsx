"use client"
import { ShortFeed } from "@/components/shorts/short-feed"
import type { ShortData } from "@/components/shorts/short-card"
import { useParams } from "next/navigation"
import Link from "next/link"

const CATS = ["kuduro", "futebol", "comedia", "musica", "danca"]
const TABS = [
  { id: "feed", label: "Todos", href: "/shorts/feed" },
  ...CATS.map(c => ({ id: c, label: c.charAt(0).toUpperCase() + c.slice(1), href: `/shorts/feed/categoria/${c}` })),
]

const MOCK: ShortData[] = [
  { id: "s8", title: "Short da categoria!", duration: 30, viewCount: 67000, likes: 4500, createdAt: new Date(Date.now() - 3600000).toISOString(), creator: { username: "cat_creator", displayName: "Cat Creator" } },
]

export default function ShortsFeedCategoriaPage() {
  const { slug } = useParams()
  return (
    <div className="relative">
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${t.id === slug ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>{t.label}</Link>)}
      </div>
      <ShortFeed shorts={MOCK} />
    </div>
  )
}
