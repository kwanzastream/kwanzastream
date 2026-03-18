"use client"

import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Lock } from "lucide-react"

const MOCK_MEMBROS = [
  { username: "membro1", displayName: "Membro VIP", tier: "Gold", months: 6, avatarUrl: null },
  { username: "membro2", displayName: "Membro Pro", tier: "Silver", months: 2, avatarUrl: null },
]

export default function ChannelMembrosPage() {
  const { username } = useParams()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Lista restrita</p>
        <p className="text-sm text-muted-foreground mt-1">Entra na tua conta para ver os membros</p>
        <p className="text-lg font-bold mt-4">{MOCK_MEMBROS.length} membros activos</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Membros</h2>
        <span className="text-sm text-muted-foreground">{MOCK_MEMBROS.length} activos</span>
      </div>
      <div className="space-y-2">
        {MOCK_MEMBROS.map((m) => (
          <div key={m.username} className="flex items-center gap-3 p-3 rounded-xl border border-border/50">
            <Avatar className="w-10 h-10">
              <AvatarImage src={m.avatarUrl || undefined} />
              <AvatarFallback className="text-sm bg-primary/20 text-primary">{m.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.displayName}</p>
              <p className="text-[10px] text-muted-foreground">Membro há {m.months} {m.months === 1 ? "mês" : "meses"}</p>
            </div>
            <Badge variant="secondary" className="text-[10px]"><Crown className="w-3 h-3 mr-0.5" />{m.tier}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
