import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface ChannelCardProps {
  username: string
  displayName: string
  avatarUrl?: string | null
  followersCount?: number
  isLive?: boolean
  isVerified?: boolean
  category?: string
  className?: string
}

export function ChannelCard({
  username, displayName, avatarUrl, followersCount = 0,
  isLive, isVerified, category, className,
}: ChannelCardProps) {
  return (
    <Link
      href={`/${username}`}
      className={`flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:bg-muted/30 hover:border-primary/30 transition-all group ${className || ""}`}
    >
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl || undefined} alt={displayName} />
          <AvatarFallback className="text-sm bg-primary/20 text-primary font-bold">
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {isLive && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#CE1126] border-2 border-background rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">{displayName}</span>
          {isVerified && <Badge variant="secondary" className="text-[8px] px-1 py-0">✓</Badge>}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          {category && <span>{category}</span>}
          <span className="flex items-center gap-0.5">
            <Users className="w-3 h-3" />
            {followersCount >= 1000 ? `${(followersCount / 1000).toFixed(1)}k` : followersCount}
          </span>
        </div>
      </div>

      {isLive && (
        <Badge className="bg-[#CE1126] text-white text-[9px] shrink-0">AO VIVO</Badge>
      )}
    </Link>
  )
}
