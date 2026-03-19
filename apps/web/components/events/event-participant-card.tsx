"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Trophy } from "lucide-react"
import Link from "next/link"

export interface Participant {
  username: string
  displayName: string
  avatarUrl?: string
  role: "participant" | "commentator" | "organizer"
  country?: string
  result?: string // "1st place", "Winner", etc.
}

export function EventParticipantCard({ p }: { p: Participant }) {
  const roleLabel = { participant: "Participante", commentator: "Comentador", organizer: "Organizador" }
  const roleColor = { participant: "bg-blue-500/10 text-blue-400", commentator: "bg-yellow-500/10 text-yellow-400", organizer: "bg-primary/10 text-primary" }

  return (
    <Link href={`/${p.username}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
      <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary text-xs">{p.displayName.slice(0, 2)}</AvatarFallback></Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{p.displayName}</p>
        <p className="text-[10px] text-muted-foreground">@{p.username}</p>
      </div>
      <div className="flex items-center gap-1.5">
        {p.country && <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><MapPin className="w-3 h-3" />{p.country}</span>}
        <Badge className={`text-[9px] ${roleColor[p.role]}`}>{roleLabel[p.role]}</Badge>
        {p.result && <Badge className="text-[9px] bg-yellow-500/10 text-yellow-400 gap-0.5"><Trophy className="w-3 h-3" />{p.result}</Badge>}
      </div>
    </Link>
  )
}
