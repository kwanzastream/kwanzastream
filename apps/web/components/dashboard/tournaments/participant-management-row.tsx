"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface ParticipantManagementRowProps {
  participant: {
    id: string
    username: string
    displayName: string
    avatarUrl?: string | null
    seed?: number | null
    status: string
  }
  onApprove?: () => void
  onReject?: () => void
}

export function ParticipantManagementRow({ participant, onApprove, onReject }: ParticipantManagementRowProps) {
  const p = participant

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
      <Avatar className="w-8 h-8">
        <AvatarImage src={p.avatarUrl || undefined} />
        <AvatarFallback className="bg-primary/20 text-primary text-xs">{p.displayName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">@{p.username}</p>
          {p.seed && (
            <Badge variant="outline" className="text-[9px] px-1">Semente #{p.seed}</Badge>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground">{p.displayName}</p>
      </div>
      <div className="flex items-center gap-1">
        {p.status === "pending" ? (
          <>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-green-400 hover:text-green-300 hover:bg-green-500/10" onClick={onApprove}>
              <Check className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={onReject}>
              <X className="w-3.5 h-3.5" />
            </Button>
          </>
        ) : (
          <Badge className={`text-[9px] ${p.status === "confirmed" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
            {p.status === "confirmed" ? "Confirmado" : "Eliminado"}
          </Badge>
        )}
      </div>
    </div>
  )
}
