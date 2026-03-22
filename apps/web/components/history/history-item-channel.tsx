"use client"
import Link from "next/link"
interface HistoryItemChannelProps { channelId: string; channelName: string; category?: string; visitedAt: string; isLive?: boolean; onRemove?: (id: string) => void }
export function HistoryItemChannel({ channelId, channelName, category, visitedAt, isLive, onRemove }: HistoryItemChannelProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">👤</div>
        <div><Link href={`/canal/${channelName}`} className="text-xs font-semibold hover:text-primary">@{channelName}</Link>{category && <span className="text-[9px] text-muted-foreground ml-1">· {category}</span>}<p className="text-[9px] text-muted-foreground">{visitedAt}</p></div>
      </div>
      <div className="flex items-center gap-2">
        {isLive && <span className="text-[9px] text-red-400 animate-pulse">● AO VIVO</span>}
        <Link href={`/canal/${channelName}`} className="text-[9px] text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Ir ao canal</Link>
        {onRemove && <button onClick={() => onRemove(channelId)} className="text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>}
      </div>
    </div>
  )
}
