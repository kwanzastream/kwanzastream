"use client"

import { Badge } from "@/components/ui/badge"

interface ChangelogEntryProps { version: string; date: string; changes: string[] }

export function ChangelogEntry({ version, date, changes }: ChangelogEntryProps) {
  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-2">
      <div className="flex items-center gap-2">
        <Badge className="bg-primary/10 text-primary text-[10px]">{version}</Badge>
        <span className="text-[10px] text-muted-foreground">{date}</span>
      </div>
      <ul className="space-y-1">
        {changes.map((c, i) => <li key={i} className="text-xs text-muted-foreground">→ {c}</li>)}
      </ul>
    </div>
  )
}
