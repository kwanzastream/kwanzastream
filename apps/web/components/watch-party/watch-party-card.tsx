"use client"
import Link from "next/link"
interface WatchPartyCardProps { id: string; name?: string; streamId?: string; code: string; status: string; participantCount: number; maxParticipants: number; createdAt: string; isHost?: boolean; onEnd?: (id: string) => void }
export function WatchPartyCard({ id, name, streamId, code, status, participantCount, maxParticipants, createdAt, isHost, onEnd }: WatchPartyCardProps) {
  const active = status === "active"
  return (
    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between">
        <div><p className="text-xs font-semibold">{name || "Watch Party"}</p><p className="text-[9px] text-muted-foreground">{streamId ? `Stream: ${streamId}` : "Sem stream"} · Código: {code}</p></div>
        {active && <span className="text-[9px] text-green-400 animate-pulse">● Activa</span>}
        {!active && <span className="text-[9px] text-muted-foreground">Terminada</span>}
      </div>
      <p className="text-[9px] text-muted-foreground mt-1">{participantCount}/{maxParticipants} participantes · {createdAt}</p>
      <div className="flex items-center gap-2 mt-2">
        {active && <Link href={`/assistir-junto/${id}`} className="px-3 py-1 rounded-lg bg-primary text-white text-[9px]">Entrar</Link>}
        {active && isHost && onEnd && <button onClick={() => onEnd(id)} className="px-3 py-1 rounded-lg border border-white/10 text-[9px] text-red-400 hover:bg-red-500/10">Encerrar</button>}
      </div>
    </div>
  )
}
