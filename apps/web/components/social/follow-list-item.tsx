"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserMinus, MessageSquare, Radio } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface FollowListItemProps {
  username: string
  displayName: string
  avatarUrl?: string
  isOnline?: boolean
  isLive?: boolean
  category?: string
  lastActive?: string
  followedBack?: boolean
  showUnfollow?: boolean
  showFollowBack?: boolean
  showMessage?: boolean
  onUnfollow?: () => void
  onFollowBack?: () => void
}

export function FollowListItem({
  username, displayName, avatarUrl, isOnline, isLive, category, lastActive,
  followedBack, showUnfollow, showFollowBack, showMessage, onUnfollow, onFollowBack,
}: FollowListItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
      <Link href={`/${username}`} className="shrink-0">
        <div className="relative">
          <Avatar className="w-10 h-10"><AvatarImage src={avatarUrl} /><AvatarFallback className="text-xs bg-primary/20 text-primary">{displayName?.slice(0, 2)}</AvatarFallback></Avatar>
          {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
        </div>
      </Link>
      <Link href={`/${username}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-bold truncate">{displayName}</p>
          {isLive && <Badge className="bg-[#CE1126] text-white text-[8px] px-1 py-0 border-none h-4">LIVE</Badge>}
        </div>
        <p className="text-[10px] text-muted-foreground">@{username}{category ? ` · ${category}` : ""}{lastActive ? ` · ${lastActive}` : ""}</p>
      </Link>
      <div className="flex items-center gap-1.5 shrink-0">
        {showMessage && <Link href={`/mensagens/nova?to=${username}`}><Button variant="ghost" size="icon" className="w-8 h-8"><MessageSquare className="w-3.5 h-3.5" /></Button></Link>}
        {showFollowBack && !followedBack && <Button size="sm" variant="outline" className="text-xs h-7" onClick={onFollowBack}>Seguir</Button>}
        {showUnfollow && <Button size="sm" variant="ghost" className="text-xs h-7 text-muted-foreground" onClick={() => { if (onUnfollow) { onUnfollow(); toast.success(`Deixaste de seguir @${username}`) } }}>
          <UserMinus className="w-3 h-3" />
        </Button>}
      </div>
    </div>
  )
}
