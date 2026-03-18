"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Clock, Play, Share2 } from "lucide-react"
import { WhatsAppShareButton } from "./whatsapp-share-button"

/* ============ STREAM CARD ============ */
interface StreamCardProps {
  id: string
  title: string
  category?: string
  viewerCount?: number
  thumbnailUrl?: string
  streamer: { username: string; displayName: string; avatarUrl?: string; verified?: boolean }
}

export function StreamCard({ id, title, category, viewerCount = 0, thumbnailUrl, streamer }: StreamCardProps) {
  return (
    <Link href={`/stream/${streamer.username || id}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all bg-card card-hover">
        <div className="relative aspect-video bg-muted">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
              <Play className="w-8 h-8 text-muted-foreground/50" />
            </div>
          )}
          <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px] px-1.5 py-0.5 font-bold animate-pulse-glow">AO VIVO</Badge>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
            <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px] font-medium">{viewerCount > 999 ? `${(viewerCount / 1000).toFixed(1)}k` : viewerCount}</span>
          </div>
          {category && <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white border-0">{category}</Badge>}
        </div>
        <div className="p-3 flex gap-2.5">
          <Avatar className="w-8 h-8 shrink-0 mt-0.5">
            <AvatarImage src={streamer.avatarUrl} />
            <AvatarFallback className="text-xs bg-primary/20 text-primary">{streamer.displayName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{title}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-xs text-muted-foreground truncate">{streamer.displayName}</p>
              {streamer.verified && <span className="text-primary text-[10px]">✓</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ============ VIDEO CARD ============ */
interface VideoCardProps {
  id: string
  title: string
  thumbnailUrl?: string
  duration?: string
  views?: number
  publishedAt?: string
  streamer: { username: string; displayName: string; avatarUrl?: string }
}

export function VideoCard({ id, title, thumbnailUrl, duration, views = 0, publishedAt, streamer }: VideoCardProps) {
  return (
    <Link href={`/videos/${id}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all bg-card card-hover">
        <div className="relative aspect-video bg-muted">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted">
              <Play className="w-8 h-8 text-muted-foreground/50" />
            </div>
          )}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 rounded px-1.5 py-0.5">
              <span className="text-white text-[10px] font-medium">{duration}</span>
            </div>
          )}
        </div>
        <div className="p-3 flex gap-2.5">
          <Avatar className="w-8 h-8 shrink-0 mt-0.5">
            <AvatarImage src={streamer.avatarUrl} />
            <AvatarFallback className="text-xs bg-primary/20 text-primary">{streamer.displayName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{title}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{streamer.displayName}</p>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
              {views > 0 && <span>{views > 999 ? `${(views / 1000).toFixed(1)}k` : views} views</span>}
              {publishedAt && <span>· {publishedAt}</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ============ CLIP CARD ============ */
interface ClipCardProps {
  id: string
  title: string
  thumbnailUrl?: string
  duration?: string
  views?: number
  streamer: { username: string; displayName: string; avatarUrl?: string }
}

export function ClipCard({ id, title, thumbnailUrl, duration, views = 0, streamer }: ClipCardProps) {
  return (
    <div className="group relative">
      <Link href={`/clips/${id}`} className="block">
        <div className="rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all bg-card card-hover">
          <div className="relative aspect-video bg-muted">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:brightness-110 transition-all" loading="lazy" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-muted">
                <Play className="w-6 h-6 text-muted-foreground/50" />
              </div>
            )}
            <Badge variant="secondary" className="absolute top-2 left-2 text-[10px]">CLIP</Badge>
            {duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 rounded px-1.5 py-0.5">
                <span className="text-white text-[10px] font-medium">{duration}</span>
              </div>
            )}
          </div>
          <div className="p-2.5">
            <p className="text-sm font-medium truncate">{title}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground truncate">{streamer.displayName}</p>
              <span className="text-[10px] text-muted-foreground">{views > 0 && `${views > 999 ? `${(views / 1000).toFixed(1)}k` : views} views`}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <WhatsAppShareButton url={`/clips/${id}`} text={`${title} — Clip no Kwanza Stream`} variant="ghost" size="icon" className="w-7 h-7 bg-black/60 text-white hover:bg-black/80" />
      </div>
    </div>
  )
}

/* ============ CATEGORY CARD ============ */
interface CategoryCardProps {
  slug: string
  name: string
  emoji?: string
  liveCount?: number
  weeklyViews?: number
  coverUrl?: string
  angolaFirst?: boolean
}

export function CategoryCard({ slug, name, emoji, liveCount = 0, weeklyViews = 0, coverUrl, angolaFirst }: CategoryCardProps) {
  return (
    <Link href={`/categoria/${slug}`} className="group block">
      <div className={`relative rounded-xl overflow-hidden border transition-all card-hover ${angolaFirst ? "border-primary/30 hover:border-primary" : "border-border/50 hover:border-primary/40"}`}>
        <div className="aspect-[4/3] bg-muted relative">
          {coverUrl ? (
            <img src={coverUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${angolaFirst ? "bg-gradient-to-br from-[#CE1126]/20 via-[#000]/40 to-[#F9D616]/20" : "bg-gradient-to-br from-muted to-[var(--surface-2)]"}`}>
              <span className="text-4xl">{emoji || "📺"}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="font-semibold text-white text-sm">{emoji && `${emoji} `}{name}</p>
            <div className="flex items-center gap-3 mt-1 text-[10px] text-white/70">
              {liveCount > 0 && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full animate-pulse" />{liveCount} ao vivo</span>}
              {weeklyViews > 0 && <span>{weeklyViews > 999 ? `${(weeklyViews / 1000).toFixed(1)}k` : weeklyViews} views/semana</span>}
            </div>
          </div>
          {angolaFirst && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-[#F9D616] text-black text-[9px] font-bold px-1.5">🇦🇴 ANGOLA</Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

/* ============ CHANNEL CARD ============ */
interface ChannelCardProps {
  username: string
  displayName: string
  avatarUrl?: string
  bio?: string
  category?: string
  followers?: number
  verified?: boolean
  isLive?: boolean
  badge?: string
}

export function ChannelCard({ username, displayName, avatarUrl, bio, category, followers = 0, verified, isLive, badge }: ChannelCardProps) {
  return (
    <Link href={`/${username}`} className="group block">
      <div className="rounded-xl border border-border/50 hover:border-primary/40 transition-all p-4 text-center bg-card card-hover relative">
        {isLive && <span className="absolute top-2 right-2 w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />}
        <Avatar className="w-14 h-14 mx-auto mb-2.5 ring-2 ring-border group-hover:ring-primary/40 transition-all">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-primary/20 text-primary font-bold">{displayName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center gap-1">
          <p className="text-sm font-medium truncate">{displayName}</p>
          {verified && <span className="text-primary text-xs">✓</span>}
        </div>
        <p className="text-xs text-muted-foreground truncate">@{username}</p>
        {bio && <p className="text-[11px] text-muted-foreground truncate mt-1.5">{bio}</p>}
        <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-muted-foreground">
          {category && <Badge variant="outline" className="text-[9px] px-1.5">{category}</Badge>}
          {badge && <Badge variant="secondary" className="text-[9px] px-1.5">{badge}</Badge>}
        </div>
        {followers > 0 && <p className="text-[10px] text-muted-foreground mt-1.5">{followers > 999 ? `${(followers / 1000).toFixed(1)}k` : followers} seguidores</p>}
      </div>
    </Link>
  )
}

/* ============ SECTION HEADER ============ */
interface SectionHeaderProps {
  title: string
  href?: string
  badge?: string
  live?: boolean
}

export function SectionHeader({ title, href, badge, live }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        {live && <span className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />}
        <h2 className="text-lg font-bold">{title}</h2>
        {badge && <Badge variant="secondary" className="text-[10px]">{badge}</Badge>}
      </div>
      {href && (
        <Link href={href} className="text-sm text-primary hover:underline flex items-center gap-1">
          Ver todos<span className="text-xs">→</span>
        </Link>
      )}
    </div>
  )
}

/* ============ EMPTY STATE ============ */
interface EmptyContentProps {
  emoji?: string
  title: string
  description?: string
}

export function EmptyContent({ emoji = "📺", title, description }: EmptyContentProps) {
  return (
    <div className="text-center py-16">
      <p className="text-4xl mb-3">{emoji}</p>
      <p className="font-medium text-lg mb-1">{title}</p>
      {description && <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>}
    </div>
  )
}

/* ============ CONTENT GRID ============ */
export function ContentGrid({ children, cols = 4 }: { children: React.ReactNode; cols?: 2 | 3 | 4 | 5 | 6 }) {
  const colClasses: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  }
  return <div className={`grid ${colClasses[cols]} gap-4`}>{children}</div>
}

/* ============ GRID SKELETON ============ */
export function GridSkeleton({ count = 8, aspect = "video" }: { count?: number; aspect?: "video" | "square" }) {
  return (
    <ContentGrid>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
          <div className={`${aspect === "video" ? "aspect-video" : "aspect-square"} bg-muted skeleton-shimmer`} />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-muted rounded w-3/4 skeleton-shimmer" />
            <div className="h-3 bg-muted rounded w-1/2 skeleton-shimmer" />
          </div>
        </div>
      ))}
    </ContentGrid>
  )
}
