"use client"
import { useState } from "react"
import { SmPanel } from "@/components/stream-manager/sm-components"
import { ArrowLeft, Trash2, Pin, Ban, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MESSAGES = [
  { id: "1", user: "@viewer1", msg: "Boa stream!", time: "14:23", role: "viewer" },
  { id: "2", user: "@moderador", msg: "🔥🔥🔥", time: "14:24", role: "mod" },
  { id: "3", user: "@fan", msg: "quando é o próximo torneio?", time: "14:25", role: "sub" },
  { id: "4", user: "@sub_tier2", msg: "Tier 2 ativado! 💎", time: "14:25", role: "sub" },
  { id: "5", user: "@viewer2", msg: "Angola represent 🇦🇴", time: "14:26", role: "viewer" },
  { id: "6", user: "@salos_fan", msg: "500 Salos! Continua assim 💛", time: "14:27", role: "salos" },
]

export default function ChatManagerPage() {
  const [filter, setFilter] = useState("all")
  const [slowMode, setSlowMode] = useState(false)
  const FILTERS = [{ id: "all", l: "Todas" }, { id: "mentions", l: "Menções" }, { id: "salos", l: "Salos" }, { id: "mod", l: "Moderação" }]
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Chat em Tempo Real</h1></div>
      <div className="flex gap-1">{FILTERS.map(f => <button key={f.id} onClick={() => setFilter(f.id)} className={`px-2 py-1 rounded-full text-[9px] font-bold ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f.l}</button>)}</div>
      <div className="flex gap-2">{[{l:"Slow Mode",a:slowMode,fn:() => setSlowMode(!slowMode)},{l:"Só Seguidores",a:false},{l:"Só Subs",a:false},{l:"Chat Off",a:false}].map(m => <button key={m.l} onClick={m.fn} className={`px-2 py-1 rounded-full text-[8px] border ${m.a ? "border-primary/30 bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{m.l}</button>)}</div>
      <div className="space-y-0.5">{MESSAGES.map(m => <div key={m.id} className="group flex items-start gap-2 p-1.5 rounded hover:bg-white/5"><span className="text-[8px] text-muted-foreground font-mono shrink-0">{m.time}</span><span className={`text-[10px] font-bold shrink-0 ${m.role === "mod" ? "text-green-400" : m.role === "sub" ? "text-primary" : m.role === "salos" ? "text-yellow-400" : ""}`}>{m.user}</span><span className="text-[10px] text-muted-foreground flex-1">{m.msg}</span><div className="hidden group-hover:flex gap-0.5 shrink-0"><button className="p-0.5 rounded hover:bg-white/10" title="Timeout"><Clock className="w-3 h-3 text-muted-foreground" /></button><button className="p-0.5 rounded hover:bg-white/10" title="Ban"><Ban className="w-3 h-3 text-muted-foreground" /></button><button className="p-0.5 rounded hover:bg-white/10" title="Apagar"><Trash2 className="w-3 h-3 text-muted-foreground" /></button><button className="p-0.5 rounded hover:bg-white/10" title="Pin"><Pin className="w-3 h-3 text-muted-foreground" /></button></div></div>)}</div>
      <div className="flex gap-1"><input placeholder="Enviar como streamer..." className="flex-1 h-8 rounded-md bg-white/5 border border-white/10 px-2 text-xs" /><Button size="sm" className="h-8">Enviar</Button></div>
      <p className="text-[8px] text-muted-foreground text-center">6 msgs/min · Mensagens do streamer são destacadas</p>
    </div>
  )
}
