"use client"

import { Lock, Unlock } from "lucide-react"
import Link from "next/link"

export interface AchievementData {
  id: string
  name: string
  description: string
  emoji?: string
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  target?: number
  totalUnlocked?: number
}

export function AchievementCard({ achievement }: { achievement: AchievementData }) {
  const pct = achievement.progress != null && achievement.target ? Math.round((achievement.progress / achievement.target) * 100) : 0
  return (
    <Link href={`/conquistas/${achievement.id}`} className="block">
      <div className={`p-4 rounded-2xl border transition-all ${achievement.unlocked ? "border-primary/30 bg-primary/5" : "border-white/10 bg-white/[0.02] opacity-60"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${achievement.unlocked ? "bg-primary/20" : "bg-white/5"}`}>
            {achievement.unlocked ? (achievement.emoji || "🏆") : <Lock className="w-5 h-5 text-muted-foreground/40" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{achievement.name}</p>
            <p className="text-[10px] text-muted-foreground">{achievement.description}</p>
            {achievement.unlocked && achievement.unlockedAt && <p className="text-[9px] text-primary">{new Date(achievement.unlockedAt).toLocaleDateString("pt-AO")}</p>}
          </div>
        </div>
        {!achievement.unlocked && achievement.progress != null && achievement.target && (
          <div className="mt-2 space-y-1">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-primary/50 transition-all" style={{ width: `${pct}%` }} /></div>
            <p className="text-[9px] text-muted-foreground text-right">{achievement.progress}/{achievement.target}</p>
          </div>
        )}
      </div>
    </Link>
  )
}

export function AchievementBadge({ achievement }: { achievement: AchievementData }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
      <span className="text-sm">{achievement.emoji || "🏆"}</span>
      <span className="text-[10px] font-bold text-primary">{achievement.name}</span>
    </div>
  )
}
