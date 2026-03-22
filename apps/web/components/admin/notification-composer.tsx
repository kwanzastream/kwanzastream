"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
interface NotificationComposerProps { onSend: (data: { audience: string; channels: string[]; title: string; message: string }) => void }
export function NotificationComposer({ onSend }: NotificationComposerProps) {
  const [audience, setAudience] = useState("all")
  const [channels, setChannels] = useState(["push", "email"])
  const [title, setTitle] = useState(""); const [message, setMessage] = useState("")
  const toggleChannel = (c: string) => setChannels(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  return (
    <div className="space-y-3 p-4 rounded-xl border border-white/10">
      <div className="space-y-1"><label className="text-[10px] text-muted-foreground">Audiência</label>
        <div className="flex gap-2">{[{ k: "all", l: "Todos" }, { k: "segment", l: "Segmento" }, { k: "individual", l: "Individual" }].map(a => <button key={a.k} onClick={() => setAudience(a.k)} className={`px-3 py-1 rounded-lg text-[10px] border ${audience === a.k ? "border-primary bg-primary/5" : "border-white/10"}`}>{a.l}</button>)}</div>
      </div>
      <div className="space-y-1"><label className="text-[10px] text-muted-foreground">Canal</label>
        <div className="flex gap-2">{[{ k: "push", l: "📱 Push" }, { k: "email", l: "📧 Email" }, { k: "whatsapp", l: "💬 WhatsApp (~0.5Kz/msg)" }].map(c => <button key={c.k} onClick={() => toggleChannel(c.k)} className={`px-3 py-1 rounded-lg text-[10px] border ${channels.includes(c.k) ? "border-primary bg-primary/5" : "border-white/10"}`}>{c.l}</button>)}</div>
      </div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-transparent text-xs focus:outline-none focus:border-primary" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensagem..." className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[60px] focus:outline-none focus:border-primary" />
      <Button onClick={() => onSend({ audience, channels, title, message })} disabled={!title || !message} className="text-xs">Enviar notificação</Button>
    </div>
  )
}
