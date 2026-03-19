"use client"

import { RankChangeBadge } from "./rank-change-badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface LeaderboardEntry {
  rank: number
  username: string
  displayName: string
  value: number
  valueLabel: string
  change: number | "NEW"
  badge?: string
}

function getMedal(rank: number) {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  return null
}

export function LeaderboardRow({ entry, metric }: { entry: LeaderboardEntry; metric?: string }) {
  const medal = getMedal(entry.rank)
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${entry.rank <= 3 ? "border-primary/20 bg-primary/5" : "border-white/10"}`}>
      <span className={`w-8 text-center text-sm font-black ${entry.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>{medal || entry.rank}</span>
      <Link href={`/${entry.username}`} className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">{entry.displayName[0]}</div>
        <div className="min-w-0"><p className="text-sm font-bold truncate">{entry.badge && <span className="mr-1">{entry.badge}</span>}@{entry.username}</p></div>
      </Link>
      <div className="text-right shrink-0"><p className="text-sm font-bold">{entry.value.toLocaleString()}</p><p className="text-[8px] text-muted-foreground">{entry.valueLabel}</p></div>
      <RankChangeBadge change={entry.change} />
    </div>
  )
}

export function LeaderboardTable({ entries, metric }: { entries: LeaderboardEntry[]; metric?: string }) {
  return <div className="space-y-1.5">{entries.map(e => <LeaderboardRow key={e.rank} entry={e} metric={metric} />)}</div>
}
