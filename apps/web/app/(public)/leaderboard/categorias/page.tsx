"use client"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { RankChangeBadge } from "@/components/leaderboard/rank-change-badge"
import { Radio, Eye, TrendingUp, Folder } from "lucide-react"
import Link from "next/link"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]

const CATS = [
  { rank: 1, name: "Kuduro", emoji: "🎵", live: 12, viewers: 4500, growth: 25, change: 0 as number | "NEW" },
  { rank: 2, name: "Gaming", emoji: "🎮", live: 18, viewers: 3800, growth: 15, change: 1 as number | "NEW" },
  { rank: 3, name: "Futebol", emoji: "⚽", live: 5, viewers: 3200, growth: 40, change: -1 as number | "NEW" },
  { rank: 4, name: "Semba", emoji: "🎶", live: 6, viewers: 1200, growth: 10, change: 2 as number | "NEW" },
  { rank: 5, name: "Just Chatting", emoji: "💬", live: 8, viewers: 980, growth: -5, change: -2 as number | "NEW" },
  { rank: 6, name: "Culinária", emoji: "🍳", live: 3, viewers: 650, growth: 30, change: "NEW" as number | "NEW" },
]

export default function LeaderboardCategoriasPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Folder className="w-5 h-5" />Ranking — Categorias</h1>
      <LeaderboardTabs tabs={NAV} active="categorias" />
      <div className="space-y-1.5">{CATS.map(c => (
        <Link key={c.name} href={`/explorar/${c.name.toLowerCase().replace(/ /g, "-")}`} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${c.rank <= 3 ? "border-primary/20 bg-primary/5" : "border-white/10"}`}>
          <span className={`w-8 text-center text-sm font-black ${c.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>{c.rank <= 3 ? ["🥇","🥈","🥉"][c.rank-1] : c.rank}</span>
          <span className="text-xl">{c.emoji}</span>
          <div className="flex-1"><p className="text-sm font-bold">{c.name}</p><p className="text-[9px] text-muted-foreground flex items-center gap-2"><span className="flex items-center gap-0.5"><Radio className="w-3 h-3 text-red-400" />{c.live} ao vivo</span><span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{c.viewers.toLocaleString()} viewers</span></p></div>
          <span className={`text-[10px] font-bold flex items-center gap-0.5 ${c.growth > 0 ? "text-green-400" : "text-red-400"}`}><TrendingUp className="w-3 h-3" />{c.growth > 0 ? "+" : ""}{c.growth}%</span>
          <RankChangeBadge change={c.change} />
        </Link>
      ))}</div>
    </div>
  )
}
