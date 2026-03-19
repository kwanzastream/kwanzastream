"use client"

import Link from "next/link"

export interface LeaderboardTab {
  id: string
  label: string
  emoji: string
  href: string
}

export function LeaderboardTabs({ tabs, active }: { tabs: LeaderboardTab[]; active: string }) {
  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
      {tabs.map(t => (
        <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${active === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.emoji} {t.label}</Link>
      ))}
    </div>
  )
}

export function LeaderboardPeriodSelector({ periods, active, onChange }: { periods: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1">
      {periods.map(p => (
        <button key={p.id} onClick={() => onChange(p.id)} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${active === p.id ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}>{p.label}</button>
      ))}
    </div>
  )
}
