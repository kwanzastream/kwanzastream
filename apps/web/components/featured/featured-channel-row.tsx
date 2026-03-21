"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, X } from "lucide-react"

export interface FeaturedChannel {
  id: string
  username: string
  displayName: string
  avatarUrl?: string | null
  isLive?: boolean
  category?: string
}

interface FeaturedChannelRowProps {
  channel: FeaturedChannel
  index: number
  total: number
  onMoveUp?: () => void
  onMoveDown?: () => void
  onRemove?: () => void
  showReorder?: boolean
}

export function FeaturedChannelRow({
  channel,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  showReorder = true,
}: FeaturedChannelRowProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group">
      <span className="text-xs text-muted-foreground w-5 text-center font-mono">{index + 1}</span>
      <Avatar className="w-9 h-9">
        <AvatarImage src={channel.avatarUrl || undefined} />
        <AvatarFallback className="bg-primary/20 text-primary text-xs">
          {channel.displayName?.slice(0, 2).toUpperCase() || "KS"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">@{channel.username}</p>
          {channel.isLive && (
            <Badge variant="destructive" className="text-[9px] px-1.5 py-0 h-4 animate-pulse">
              AO VIVO
            </Badge>
          )}
        </div>
        {channel.category && (
          <p className="text-[10px] text-muted-foreground">{channel.category}</p>
        )}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {showReorder && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onMoveUp}
              disabled={index === 0}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onMoveDown}
              disabled={index === total - 1}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={onRemove}
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  )
}
