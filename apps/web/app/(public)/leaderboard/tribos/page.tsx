"use client"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { RankChangeBadge } from "@/components/leaderboard/rank-change-badge"
import { Users, Radio, Heart } from "lucide-react"
import Link from "next/link"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]

const TRIBOS = [
  { rank: 1, slug: "kuduro-kings", name: "Kuduro Kings", members: 12500, streams: 45, salos: 120000, change: 0 as number | "NEW" },
  { rank: 2, slug: "gamers-angola", name: "Gamers Angola", members: 8900, streams: 62, salos: 95000, change: 1 as number | "NEW" },
  { rank: 3, slug: "semba-lovers", name: "Semba Lovers", members: 5400, streams: 18, salos: 45000, change: -1 as number | "NEW" },
  { rank: 4, slug: "futebol-ao", name: "Futebol AO", members: 4200, streams: 12, salos: 38000, change: "NEW" as number | "NEW" },
]

export default function LeaderboardTribosPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2">🏛️ Ranking — Tribos</h1>
      <LeaderboardTabs tabs={NAV} active="tribos" />
      <div className="space-y-1.5">{TRIBOS.map(t => (
        <Link key={t.slug} href={`/tribos/${t.slug}`} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${t.rank <= 3 ? "border-primary/20 bg-primary/5" : "border-white/10"}`}>
          <span className={`w-8 text-center text-sm font-black ${t.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>{t.rank <= 3 ? ["🥇","🥈","🥉"][t.rank-1] : t.rank}</span>
          <div className="flex-1"><p className="text-sm font-bold">{t.name}</p><p className="text-[9px] text-muted-foreground flex items-center gap-3"><span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{t.members.toLocaleString()}</span><span className="flex items-center gap-0.5"><Radio className="w-3 h-3" />{t.streams} streams</span><span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{(t.salos/1000).toFixed(0)}K Salos</span></p></div>
          <RankChangeBadge change={t.change} />
        </Link>
      ))}</div>
    </div>
  )
}
