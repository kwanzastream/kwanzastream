"use client"
import { useState } from "react"
import { ArrowLeft, Save, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ConfigurarCoStreamPage() {
  const [layout, setLayout] = useState("side")
  const [chat, setChat] = useState("shared")
  const [who, setWho] = useState("any")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/colaboracoes/stream-together"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Configurar Co-stream</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Convidar canal</p><div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar por username..." className="bg-white/5 pl-8" /></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Layout</p>{[{id:"side",l:"Side-by-side"},{id:"pip",l:"Picture-in-picture"},{id:"mine",l:"Só o meu stream"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="layout" checked={layout === o.id} onChange={() => setLayout(o.id)} /><span className="text-xs">{o.l}</span></label>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Chat</p>{[{id:"shared",l:"Partilhado"},{id:"separate",l:"Separado"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="chat" checked={chat === o.id} onChange={() => setChat(o.id)} /><span className="text-xs">{o.l}</span></label>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Quem pode convidar</p>{[{id:"me",l:"Só eu"},{id:"any",l:"Qualquer participante"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="who" checked={who === o.id} onChange={() => setWho(o.id)} /><span className="text-xs">{o.l}</span></label>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Máximo participantes</p><select className="h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>2</option><option>3</option><option>4</option></select></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Convite enviado!")}><Save className="w-3 h-3" />Enviar convite</Button>
    </div>
  )
}
