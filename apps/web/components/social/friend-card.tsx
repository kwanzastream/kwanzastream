"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

interface FriendCardProps {
  username: string
  displayName: string
  avatarUrl?: string
  isOnline?: boolean
  category?: string
}

export function FriendCard({ username, displayName, avatarUrl, isOnline, category }: FriendCardProps) {
  return (
    <div className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all flex items-center gap-3">
      <Link href={`/${username}`}>
        <div className="relative">
          <Avatar className="w-11 h-11"><AvatarImage src={avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary text-sm">{displayName?.slice(0, 2)}</AvatarFallback></Avatar>
          {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/${username}`}><p className="text-sm font-bold truncate hover:underline">{displayName}</p></Link>
        <p className="text-[10px] text-muted-foreground">@{username}{category ? ` · ${category}` : ""}{isOnline ? " · 🟢 Online" : ""}</p>
      </div>
      <Link href={`/mensagens/nova?to=${username}`}><Button variant="outline" size="sm" className="text-xs gap-1"><MessageSquare className="w-3 h-3" />Mensagem</Button></Link>
    </div>
  )
}
