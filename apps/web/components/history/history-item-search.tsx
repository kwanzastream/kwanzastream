"use client"
interface HistoryItemSearchProps { id: string; query: string; searchedAt: string; onRepeat?: (q: string) => void; onRemove?: (id: string) => void }
export function HistoryItemSearch({ id, query, searchedAt, onRepeat, onRemove }: HistoryItemSearchProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 group">
      <div className="flex items-center gap-2 min-w-0"><span className="text-muted-foreground text-sm">🔍</span><span className="text-xs truncate">"{query}"</span><span className="text-[9px] text-muted-foreground">{searchedAt}</span></div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onRepeat && <button onClick={() => onRepeat(query)} className="text-[9px] text-primary hover:underline">Pesquisar novamente</button>}
        {onRemove && <button onClick={() => onRemove(id)} className="text-[9px] text-muted-foreground hover:text-red-400">✕</button>}
      </div>
    </div>
  )
}
