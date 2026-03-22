"use client"
import { useState, useEffect, useRef } from "react"
interface WatchPartyChatProps { partyId: string; username: string }
export function WatchPartyChat({ partyId, username }: WatchPartyChatProps) {
  const [msgs, setMsgs] = useState([{ user: "sistema", text: "Bem-vindo à Watch Party! 🎉", time: "agora" }])
  const [input, setInput] = useState("")
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [msgs])
  const send = () => { if (!input.trim()) return; setMsgs([...msgs, { user: username, text: input, time: "agora" }]); setInput("") }
  return (
    <div className="flex flex-col h-full border-l border-white/10">
      <div className="p-2 border-b border-white/10"><p className="text-[10px] font-semibold">Chat da Party</p></div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {msgs.map((m, i) => <div key={i} className={`${m.user === "sistema" ? "text-center" : ""}`}>{m.user === "sistema" ? <p className="text-[9px] text-muted-foreground italic">{m.text}</p> : <div><p className="text-[9px]"><span className="font-semibold text-primary">@{m.user}</span> <span className="text-muted-foreground">{m.time}</span></p><p className="text-xs">{m.text}</p></div>}</div>)}
        <div ref={endRef} />
      </div>
      <div className="p-2 border-t border-white/10 flex gap-1">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Escreve..." className="flex-1 px-2 py-1.5 rounded-lg border border-white/10 bg-transparent text-[10px]" />
        <button onClick={send} className="px-3 py-1.5 rounded-lg bg-primary text-white text-[9px]">→</button>
      </div>
    </div>
  )
}
