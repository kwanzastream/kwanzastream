"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

interface UserSuggestionCardProps {
  username: string
  displayName: string
  avatarUrl?: string
  reason: string
  followers?: number
  onFollow?: () => void
}

export function UserSuggestionCard({ username, displayName, avatarUrl, reason, followers, onFollow }: UserSuggestionCardProps) {
  return (
    <div className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all flex items-center gap-3">
      <Link href={`/${username}`}>
        <Avatar className="w-10 h-10"><AvatarImage src={avatarUrl} /><AvatarFallback className="text-xs bg-primary/20 text-primary">{displayName?.slice(0, 2)}</AvatarFallback></Avatar>
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/${username}`}><p className="text-sm font-bold truncate hover:underline">{displayName}</p></Link>
        <p className="text-[10px] text-muted-foreground">{reason}</p>
        {followers !== undefined && <p className="text-[10px] text-muted-foreground">{followers > 999 ? `${(followers / 1000).toFixed(1)}k` : followers} seguidores</p>}
      </div>
      <Button size="sm" variant="outline" className="text-xs shrink-0" onClick={() => { onFollow?.(); toast.success(`Agora segues @${username}`) }}>Seguir</Button>
    </div>
  )
}
