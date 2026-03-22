"use client"
interface Participant { id: string; username: string; isOnline: boolean; isHost: boolean }
interface WatchPartyParticipantsProps { participants: Participant[]; isHost: boolean; onRemove?: (userId: string) => void }
export function WatchPartyParticipants({ participants, isHost, onRemove }: WatchPartyParticipantsProps) {
  return (
    <div className="space-y-2">
      {participants.map(p => (
        <div key={p.id} className="flex items-center justify-between py-1.5 group">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${p.isOnline ? "bg-green-400" : "bg-muted-foreground"}`} />
            <span className="text-xs">{p.isHost && "👑 "}@{p.username}</span>
            {p.isHost && <span className="text-[9px] text-muted-foreground">(host)</span>}
          </div>
          {isHost && !p.isHost && onRemove && <button onClick={() => onRemove(p.id)} className="text-[9px] text-red-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Remover</button>}
        </div>
      ))}
    </div>
  )
}
