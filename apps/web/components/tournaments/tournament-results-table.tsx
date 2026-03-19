"use client"

import { Trophy, Medal } from "lucide-react"

interface ResultRow {
  position: number
  username: string
  displayName: string
  prize?: string
}

interface TournamentResultsTableProps {
  results: ResultRow[]
  title?: string
}

const MEDAL = ["🥇", "🥈", "🥉"]

export function TournamentResultsTable({ results, title = "Classificação" }: TournamentResultsTableProps) {
  return (
    <div className="space-y-2">
      {title && <h3 className="text-sm font-bold flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" />{title}</h3>}
      <div className="space-y-1">
        {results.map(r => (
          <div key={r.position} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${r.position <= 3 ? "border-yellow-500/20 bg-yellow-500/5" : "border-white/10"}`}>
            <span className="text-lg w-8 text-center">{MEDAL[r.position - 1] || `${r.position}º`}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold">@{r.username}</p>
              <p className="text-[10px] text-muted-foreground">{r.displayName}</p>
            </div>
            {r.prize && <span className="text-xs font-bold text-yellow-400">{r.prize}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
