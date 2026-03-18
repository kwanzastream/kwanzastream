import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Eye, Clock } from "lucide-react"

export interface ChannelData {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  bannerUrl?: string
  bio?: string
  role: string
  isVerified: boolean
  createdAt: string
  followersCount: number
  followingCount: number
  streamsCount: number
  totalViews?: number
  status?: string
  settings?: {
    publicFollowerList?: boolean
    shopEnabled?: boolean
    radioEnabled?: boolean
    membershipEnabled?: boolean
    monetizationActive?: boolean
  }
}

interface ChannelHeaderStaticProps {
  channel: ChannelData
}

export function ChannelHeaderStatic({ channel }: ChannelHeaderStaticProps) {
  return (
    <div>
      {/* Banner */}
      <div className="relative h-40 md:h-56 bg-gradient-to-br from-primary/30 via-muted to-muted overflow-hidden">
        {channel.bannerUrl ? (
          <img src={channel.bannerUrl} alt={`Banner de ${channel.displayName}`} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#CE1126]/20 via-black/40 to-[#F9D616]/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Profile info */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-16 mb-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-xl">
              <AvatarImage src={channel.avatarUrl} alt={channel.displayName} />
              <AvatarFallback className="text-2xl bg-primary/20 text-primary font-bold">
                {channel.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name + stats */}
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold">{channel.displayName}</h1>
              {channel.isVerified && <CheckCircle className="w-5 h-5 text-primary shrink-0" />}
              {channel.role === "PARTNER" && (
                <Badge variant="secondary" className="text-[10px] px-1.5 bg-primary/10 text-primary border-primary/20">
                  Partner
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">@{channel.username}</p>
            {channel.bio && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{channel.bio}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <strong className="text-foreground">{channel.followersCount.toLocaleString("pt-AO")}</strong> seguidores
              </span>
              {channel.totalViews !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <strong className="text-foreground">{channel.totalViews.toLocaleString("pt-AO")}</strong> visualizações
                </span>
              )}
              <span className="hidden sm:flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <strong className="text-foreground">{(channel.streamsCount || 0).toLocaleString("pt-AO")}</strong> streams
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
