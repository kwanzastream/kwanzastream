"use client"
import { useParams } from "next/navigation"
import { Shield, Star, Crown, Gem } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_BADGES = [
  { id: "b1", name: "Subscritor Tier 1", icon: "⭐", tier: 1, requirement: "Subscrever Tier 1", unlocked: false },
  { id: "b2", name: "Subscritor Tier 2", icon: "👑", tier: 2, requirement: "Subscrever Tier 2", unlocked: false },
  { id: "b3", name: "Subscritor Tier 3", icon: "💎", tier: 3, requirement: "Subscrever Tier 3", unlocked: false },
  { id: "b4", name: "Veterano 6 meses", icon: "🏅", tier: 0, requirement: "6 meses de subscrição", unlocked: false },
  { id: "b5", name: "Veterano 1 ano", icon: "🎖️", tier: 0, requirement: "12 meses de subscrição", unlocked: false },
  { id: "b6", name: "Raider", icon: "⚡", tier: 0, requirement: "Fazer raid para este canal", unlocked: false },
  { id: "b7", name: "Fundador", icon: "🛡️", tier: 0, requirement: "Badge especial — não disponível", unlocked: false },
]

export default function ChannelBadgesPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Badges</h2>
      <p className="text-sm text-muted-foreground">Badges disponíveis no canal de @{username}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {MOCK_BADGES.map((b) => (
          <div key={b.id} className={`rounded-xl border p-4 text-center space-y-2 transition-all ${b.unlocked ? "border-primary/50 bg-primary/5" : "border-border/50 opacity-70"}`}>
            <span className="text-3xl block">{b.icon}</span>
            <p className="text-sm font-medium">{b.name}</p>
            <p className="text-[10px] text-muted-foreground">{b.requirement}</p>
            {b.unlocked && <Badge className="text-[9px]">Desbloqueado</Badge>}
          </div>
        ))}
      </div>
    </div>
  )
}
