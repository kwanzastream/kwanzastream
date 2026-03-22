"use client"
interface TicketMsg { content: string; isAdmin: boolean; createdAt: string }
interface TicketThreadProps { messages: TicketMsg[]; reference: string; status: string }
export function TicketThread({ messages, reference, status }: TicketThreadProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2"><span className="text-xs font-mono text-muted-foreground">{reference}</span><span className={`text-[9px] px-1.5 py-0.5 rounded-full ${status === "open" ? "bg-green-500/10 text-green-400" : status === "resolved" ? "bg-blue-500/10 text-blue-400" : "bg-yellow-500/10 text-yellow-400"}`}>{status}</span></div>
      {messages.map((m, i) => (
        <div key={i} className={`p-3 rounded-xl text-xs ${m.isAdmin ? "bg-primary/5 border border-primary/20 ml-4" : "bg-white/5 border border-white/10 mr-4"}`}>
          <div className="flex items-center justify-between mb-1"><span className="text-[9px] font-semibold">{m.isAdmin ? "🛡 Suporte" : "👤 Tu"}</span><span className="text-[9px] text-muted-foreground">{m.createdAt}</span></div>
          <p className="text-muted-foreground whitespace-pre-wrap">{m.content}</p>
        </div>
      ))}
    </div>
  )
}
