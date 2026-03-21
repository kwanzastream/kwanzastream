"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

interface ResultInputFormProps {
  matchId: string
  player1: { id: string; username: string; displayName: string; avatarUrl?: string | null }
  player2: { id: string; username: string; displayName: string; avatarUrl?: string | null }
  onSave: (matchId: string, winnerId: string, score1: number, score2: number) => Promise<void>
}

export function ResultInputForm({ matchId, player1, player2, onSave }: ResultInputFormProps) {
  const [score1, setScore1] = useState("")
  const [score2, setScore2] = useState("")
  const [winnerId, setWinnerId] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!winnerId || score1 === "" || score2 === "") return
    setSaving(true)
    await onSave(matchId, winnerId, parseInt(score1), parseInt(score2))
    setSaving(false)
  }

  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-4">
      <div className="flex items-center gap-4">
        {/* Player 1 */}
        <div className="flex-1 flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src={player1.avatarUrl || undefined} />
            <AvatarFallback className="text-[9px] bg-primary/20 text-primary">{player1.displayName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate">@{player1.username}</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={score1}
            onChange={(e) => setScore1(e.target.value)}
            className="w-14 text-center text-sm"
          />
          <span className="text-muted-foreground text-sm">-</span>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={score2}
            onChange={(e) => setScore2(e.target.value)}
            className="w-14 text-center text-sm"
          />
        </div>

        {/* Player 2 */}
        <div className="flex-1 flex items-center gap-2 justify-end">
          <span className="text-sm font-medium truncate">@{player2.username}</span>
          <Avatar className="w-7 h-7">
            <AvatarImage src={player2.avatarUrl || undefined} />
            <AvatarFallback className="text-[9px] bg-primary/20 text-primary">{player2.displayName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Winner selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Vencedor:</span>
        <button
          onClick={() => setWinnerId(player1.id)}
          className={`px-3 py-1 rounded-lg text-xs transition-all ${winnerId === player1.id ? "bg-primary/20 text-primary border border-primary/30" : "border border-white/10 text-muted-foreground hover:border-white/20"}`}
        >
          @{player1.username}
        </button>
        <button
          onClick={() => setWinnerId(player2.id)}
          className={`px-3 py-1 rounded-lg text-xs transition-all ${winnerId === player2.id ? "bg-primary/20 text-primary border border-primary/30" : "border border-white/10 text-muted-foreground hover:border-white/20"}`}
        >
          @{player2.username}
        </button>
      </div>

      <Button size="sm" onClick={handleSave} disabled={saving || !winnerId || score1 === "" || score2 === ""} className="gap-1.5">
        {saving && <Loader2 className="w-3 h-3 animate-spin" />}
        Guardar resultado
      </Button>
    </div>
  )
}
