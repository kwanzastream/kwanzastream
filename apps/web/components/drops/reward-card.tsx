"use client"

import { Coins, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface RewardData {
  id: string
  name: string
  description?: string
  cost: number
  channel: string
  channelDisplayName: string
  available: boolean
  cooldownMinutes?: number
}

export function RewardCard({ reward, userPoints }: { reward: RewardData; userPoints?: number }) {
  const canAfford = userPoints != null && userPoints >= reward.cost
  return (
    <Link href={`/rewards/${reward.id}`} className="block">
      <div className="p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all bg-card space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">{reward.name}</p>
          <Badge className="text-[9px] bg-yellow-500/10 text-yellow-400 gap-0.5"><Coins className="w-3 h-3" />{reward.cost.toLocaleString()}</Badge>
        </div>
        {reward.description && <p className="text-[10px] text-muted-foreground">{reward.description}</p>}
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-muted-foreground">@{reward.channel}</p>
          {!reward.available && reward.cooldownMinutes && <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Clock className="w-3 h-3" />{reward.cooldownMinutes}min cooldown</span>}
          {reward.available && <Button size="sm" className="h-6 px-2 text-[10px]" disabled={!canAfford}>Resgatar</Button>}
        </div>
      </div>
    </Link>
  )
}
