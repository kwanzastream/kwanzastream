'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function NavItem({
  icon,
  label,
  active = false,
  badge,
  className,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: string
  className?: string
}) {
  return (
    <button
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left font-medium text-sm',
        active
          ? 'bg-primary text-white shadow-lg shadow-primary/20'
          : 'text-muted-foreground hover:bg-white/10 hover:text-foreground',
        className,
      )}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && <Badge className="bg-white/10 text-white border-none text-[9px] ml-auto">{badge}</Badge>}
    </button>
  )
}

export function LivePreviewItem({
  name,
  viewers,
  title,
  image,
}: {
  name: string
  viewers: string
  title: string
  image: string
}) {
  return (
    <div className="flex gap-3 group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
      <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0 border border-white/10">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-white/50">{image}</span>
        </div>
        <div className="absolute top-1 left-1">
          <Badge className="bg-red-600 border-none text-[8px] h-4 px-1">LIVE</Badge>
        </div>
        <div className="absolute bottom-1 right-1">
          <Badge className="bg-black/60 text-[8px] h-4 px-1 border-none">{viewers}</Badge>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="text-xs font-bold truncate group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-[10px] text-muted-foreground truncate">{name}</p>
      </div>
    </div>
  )
}

export function SuggestionItem({ name, handle }: { name: string; handle: string }) {
  return (
    <div className="flex items-center justify-between gap-3 p-1">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold">
            {name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h4 className="text-xs font-bold truncate">{name}</h4>
          <p className="text-[10px] text-muted-foreground truncate">{handle}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs font-bold border-white/10 hover:bg-white/10 bg-transparent"
      >
        Seguir
      </Button>
    </div>
  )
}

export function TrendingItem({ tag, posts }: { tag: string; posts: string }) {
  return (
    <div className="group cursor-pointer">
      <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{tag}</p>
      <p className="text-[10px] text-muted-foreground">{posts} posts esta semana</p>
    </div>
  )
}

export function PostCard({
  post,
}: {
  post: {
    id: string
    author: string
    avatar: string
    handle: string
    timestamp: string
    content: string
    likes: number
    comments: number
    shares: number
  }
}) {
  const [liked, setLiked] = React.useState(false)

  return (
    <div className="border-b border-white/10 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{post.author}</h4>
            <p className="text-xs text-muted-foreground">{post.handle}</p>
            <p className="text-xs text-muted-foreground">· {post.timestamp}</p>
          </div>
          <p className="text-sm text-foreground mb-3">{post.content}</p>
          <div className="flex justify-between text-muted-foreground text-xs max-w-xs">
            <button className="flex items-center gap-2 group/btn hover:text-blue-500 transition-colors">
              <div className="rounded-full p-2 group-hover/btn:bg-blue-500/10">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span>{post.comments}</span>
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2 group/btn hover:text-red-500 transition-colors"
            >
              <div className="rounded-full p-2 group-hover/btn:bg-red-500/10">
                <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
              </div>
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-2 group/btn hover:text-green-500 transition-colors">
              <div className="rounded-full p-2 group-hover/btn:bg-green-500/10">
                <Share2 className="h-4 w-4" />
              </div>
              <span>{post.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
