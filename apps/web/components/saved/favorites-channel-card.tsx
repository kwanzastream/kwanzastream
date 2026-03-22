"use client"
import Link from "next/link"
interface FavoritesChannelCardProps { id: string; channelName: string; category?: string; isLive?: boolean; viewers?: number; onRemove?: (id: string) => void }
export function FavoritesChannelCard({ id, channelName, category, isLive, viewers, onRemove }: FavoritesChannelCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-base">👤</div>
        <div><Link href={`/canal/${channelName}`} className="text-xs font-semibold hover:text-primary">@{channelName}</Link>{category && <span className="text-[9px] text-muted-foreground ml-1">· {category}</span>}{isLive && <span className="text-[9px] text-red-400 ml-1 animate-pulse">● AO VIVO</span>}{viewers && <span className="text-[9px] text-muted-foreground ml-1">· {viewers} viewers</span>}</div>
      </div>
      {onRemove && <button onClick={() => onRemove(id)} className="text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">Remover</button>}
    </div>
  )
}
