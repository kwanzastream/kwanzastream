"use client"
import Link from "next/link"
interface HistoryItemStreamProps { id: string; title: string; channel: string; type: string; watchedSecs: number; watchedAt: string; progress?: number; onRemove?: (id: string) => void }
export function HistoryItemStream({ id, title, channel, type, watchedSecs, watchedAt, progress, onRemove }: HistoryItemStreamProps) {
  const mins = Math.floor(watchedSecs / 60)
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group">
      <div className="w-24 h-14 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">{type === "vod" ? "📹" : type === "clip" ? "✂️" : type === "short" ? "📱" : "📺"}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate">{title}</p>
        <p className="text-[10px] text-muted-foreground">@{channel} · {mins > 0 ? `${mins}min` : `${watchedSecs}s`} · {watchedAt}</p>
        {progress !== undefined && progress > 0 && progress < 1 && (
          <div className="flex items-center gap-2 mt-1"><div className="flex-1 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.round(progress * 100)}%` }} /></div><span className="text-[9px] text-muted-foreground">{Math.round(progress * 100)}%</span></div>
        )}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {progress !== undefined && progress > 0 && progress < 1 && <Link href="#" className="text-[9px] text-primary hover:underline">Continuar →</Link>}
        {onRemove && <button onClick={() => onRemove(id)} className="text-[9px] text-muted-foreground hover:text-red-400">✕</button>}
      </div>
    </div>
  )
}
