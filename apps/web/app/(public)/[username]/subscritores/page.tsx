"use client"

import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Lock } from "lucide-react"

const MOCK_SUBS = [
  { username: "sub1", displayName: "Subscriber One", tier: 1, months: 3, avatarUrl: null },
  { username: "sub2", displayName: "Subscriber Two", tier: 2, months: 8, avatarUrl: null },
  { username: "sub3", displayName: "Subscriber Three", tier: 3, months: 14, avatarUrl: null },
]

const TIER_COLORS: Record<number, string> = { 1: "text-blue-400", 2: "text-purple-400", 3: "text-amber-400" }

export default function ChannelSubscritoresPage() {
  const { username } = useParams()
  const { isAuthenticated } = useAuth()

  // Visitors only see count
  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Lista restrita</p>
        <p className="text-sm text-muted-foreground mt-1">
          Entra na tua conta para ver a lista de subscritores
        </p>
        <p className="text-lg font-bold mt-4">{MOCK_SUBS.length} subscritores activos</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Subscritores</h2>
        <span className="text-sm text-muted-foreground">{MOCK_SUBS.length} activos</span>
      </div>
      <div className="space-y-2">
        {MOCK_SUBS.map((sub) => (
          <div key={sub.username} className="flex items-center gap-3 p-3 rounded-xl border border-border/50">
            <Avatar className="w-10 h-10">
              <AvatarImage src={sub.avatarUrl || undefined} />
              <AvatarFallback className="text-sm bg-primary/20 text-primary">{sub.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{sub.displayName}</p>
              <p className="text-[10px] text-muted-foreground">Subscritor há {sub.months} {sub.months === 1 ? "mês" : "meses"}</p>
            </div>
            <Badge className={`text-[10px] ${TIER_COLORS[sub.tier] || ""}`}>
              <Star className="w-3 h-3 mr-0.5" /> Tier {sub.tier}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
