"use client"
import Link from "next/link"
interface SavedItemCardProps { id: string; title: string; channel?: string; type: string; savedAt: string; isLive?: boolean; progress?: number; onRemove?: (id: string) => void }
export function SavedItemCard({ id, title, channel, type, savedAt, isLive, progress, onRemove }: SavedItemCardProps) {
  const icons: Record<string, string> = { stream: "📺", video: "📹", clip: "✂️", short: "📱", channel: "👤", category: "🏷️" }
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group">
      <div className="w-24 h-14 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">{icons[type] || "📄"}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate">{title}</p>
        {channel && <p className="text-[10px] text-muted-foreground">@{channel}</p>}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] text-muted-foreground">Guardado {savedAt}</span>
          {isLive && <span className="text-[9px] text-red-400 animate-pulse">● AO VIVO</span>}
        </div>
        {progress !== undefined && progress > 0 && progress < 1 && <div className="flex items-center gap-2 mt-1"><div className="flex-1 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.round(progress * 100)}%` }} /></div><span className="text-[9px] text-muted-foreground">{Math.round(progress * 100)}%</span></div>}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        {onRemove && <button onClick={() => onRemove(id)} className="text-[9px] text-muted-foreground hover:text-red-400">✕</button>}
      </div>
    </div>
  )
}
