"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, Crown, User } from "lucide-react"
import Link from "next/link"

export interface TribeMember {
  username: string
  displayName: string
  role: "founder" | "moderator" | "member"
  joinedAt: string
}

const ROLE_BADGE: Record<string, { label: string; color: string; icon: any }> = {
  founder: { label: "Fundador", color: "bg-yellow-500/10 text-yellow-400", icon: Crown },
  moderator: { label: "Moderador", color: "bg-blue-500/10 text-blue-400", icon: Shield },
  member: { label: "Membro", color: "bg-white/5 text-muted-foreground", icon: User },
}

export function TribeMemberCard({ member }: { member: TribeMember }) {
  const role = ROLE_BADGE[member.role]
  return (
    <Link href={`/${member.username}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
      <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary text-xs">{member.displayName.slice(0, 2)}</AvatarFallback></Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{member.displayName}</p>
        <p className="text-[10px] text-muted-foreground">@{member.username} · {new Date(member.joinedAt).toLocaleDateString("pt-AO", { month: "short", year: "numeric" })}</p>
      </div>
      <Badge className={`text-[9px] gap-0.5 ${role.color}`}><role.icon className="w-3 h-3" />{role.label}</Badge>
    </Link>
  )
}
