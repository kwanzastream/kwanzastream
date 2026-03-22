"use client"
import { Button } from "@/components/ui/button"
interface AwardsNomineeCardProps { id: string; channelId: string; category: string; votes: number; onVote?: () => void; voted?: boolean }
export function AwardsNomineeCard({ id, channelId, category, votes, onVote, voted }: AwardsNomineeCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">{channelId[0].toUpperCase()}</div>
      <div className="flex-1"><p className="text-sm font-semibold">@{channelId}</p><p className="text-[10px] text-muted-foreground">{votes} votos</p></div>
      {onVote && <Button size="sm" variant={voted ? "outline" : "default"} disabled={voted} onClick={onVote} className="text-[10px] h-7">{voted ? "✓ Votado" : "Votar"}</Button>}
    </div>
  )
}
