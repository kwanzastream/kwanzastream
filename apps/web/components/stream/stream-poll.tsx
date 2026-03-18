"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { BarChart3, Clock, Check, Lock } from "lucide-react"
import Link from "next/link"

interface PollOption {
  id: string
  label: string
  votes: number
}

interface StreamPollProps {
  question: string
  options: PollOption[]
  totalVotes: number
  endsAt: string // ISO timestamp
  hasVoted?: string // option ID user voted for
  username: string
}

export function StreamPoll({ question, options, totalVotes, endsAt, hasVoted, username }: StreamPollProps) {
  const { isAuthenticated } = useAuth()
  const [voted, setVoted] = useState(hasVoted || "")
  const [localOptions, setLocalOptions] = useState(options)
  const [localTotal, setLocalTotal] = useState(totalVotes)

  const timeLeft = (() => {
    const diff = new Date(endsAt).getTime() - Date.now()
    if (diff <= 0) return "Encerrada"
    const m = Math.floor(diff / 60000); const s = Math.floor((diff % 60000) / 1000)
    return `${m}:${String(s).padStart(2, "0")}`
  })()

  const isEnded = new Date(endsAt).getTime() <= Date.now()

  const handleVote = (optionId: string) => {
    if (voted || !isAuthenticated || isEnded) return
    setVoted(optionId)
    setLocalOptions(prev => prev.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o))
    setLocalTotal(t => t + 1)
    // TODO: emit socket event
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary shrink-0" />
          <h3 className="text-sm font-bold">{question}</h3>
        </div>
        <Badge variant="secondary" className="text-[10px] shrink-0">
          <Clock className="w-3 h-3 mr-0.5" /> {timeLeft}
        </Badge>
      </div>

      <div className="space-y-2">
        {localOptions.map((opt) => {
          const pct = localTotal > 0 ? Math.round((opt.votes / localTotal) * 100) : 0
          const isSelected = voted === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={!!voted || !isAuthenticated || isEnded}
              className={`w-full relative rounded-lg overflow-hidden border transition-all text-left ${
                isSelected ? "border-primary" : "border-white/10 hover:border-white/30"
              } ${(!voted && isAuthenticated && !isEnded) ? "cursor-pointer" : "cursor-default"}`}
            >
              {/* Progress bar */}
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-500 ${isSelected ? "bg-primary/20" : "bg-white/5"}`}
                style={{ width: `${(voted || isEnded) ? pct : 0}%` }}
              />
              <div className="relative flex items-center justify-between px-3 py-2.5">
                <span className="text-sm font-medium flex items-center gap-1.5">
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  {opt.label}
                </span>
                {(voted || isEnded) && (
                  <span className="text-xs font-bold">{pct}%</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{localTotal.toLocaleString("pt-AO")} votos</span>
        {!isAuthenticated && !isEnded && (
          <Link href={`/entrar?redirectTo=/stream/${username}/poll`} className="text-primary hover:underline flex items-center gap-0.5">
            <Lock className="w-2.5 h-2.5" /> Entra para votar
          </Link>
        )}
      </div>
    </div>
  )
}
