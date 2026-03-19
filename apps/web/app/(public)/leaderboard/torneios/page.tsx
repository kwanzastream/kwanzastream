"use client"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { RankChangeBadge } from "@/components/leaderboard/rank-change-badge"
import { Trophy } from "lucide-react"
import Link from "next/link"

const NAV = [{ id: "streamers", label: "Streamers", emoji: "🎬", href: "/leaderboard/streamers" }, { id: "viewers", label: "Viewers", emoji: "👁", href: "/leaderboard/viewers" }, { id: "categorias", label: "Categorias", emoji: "📂", href: "/leaderboard/categorias" }, { id: "tribos", label: "Tribos", emoji: "🏛️", href: "/leaderboard/tribos" }, { id: "torneios", label: "Torneios", emoji: "🏆", href: "/leaderboard/torneios" }, { id: "global", label: "Global", emoji: "🌍", href: "/leaderboard/global" }, { id: "angola", label: "Angola", emoji: "🇦🇴", href: "/leaderboard/angola" }]

const TOP = [
  { rank: 1, username: "esports-ao", displayName: "eSports AO", wins: 12, participations: 15, prizes: 250000, change: 0 as number | "NEW" },
  { rank: 2, username: "gamer-angola", displayName: "Gamer Angola", wins: 8, participations: 12, prizes: 180000, change: 1 as number | "NEW" },
  { rank: 3, username: "pro-fifa-ao", displayName: "Pro FIFA AO", wins: 6, participations: 10, prizes: 120000, change: -1 as number | "NEW" },
]

export default function LeaderboardTorneiosPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" />Ranking — Torneios</h1>
      <LeaderboardTabs tabs={NAV} active="torneios" />
      <div className="space-y-1.5">{TOP.map(t => (
        <Link key={t.username} href={`/${t.username}`} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${t.rank <= 3 ? "border-primary/20 bg-primary/5" : "border-white/10"}`}>
          <span className={`w-8 text-center text-sm font-black ${t.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>{t.rank <= 3 ? ["🥇","🥈","🥉"][t.rank-1] : t.rank}</span>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">{t.displayName[0]}</div>
          <div className="flex-1"><p className="text-sm font-bold">@{t.username}</p><p className="text-[9px] text-muted-foreground">{t.wins}V · {t.participations}P · {(t.prizes/1000).toFixed(0)}K Kz</p></div>
          <RankChangeBadge change={t.change} />
        </Link>
      ))}</div>
    </div>
  )
}
