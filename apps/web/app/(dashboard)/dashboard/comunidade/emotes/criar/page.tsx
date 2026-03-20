"use client"
import { useState } from "react"
import { ArrowLeft, Upload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarEmotePage() {
  const [name, setName] = useState("")
  const [tier, setTier] = useState("all")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/emotes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Emote</h1></div>
      <div className="p-6 border-2 border-dashed border-white/20 rounded-xl text-center"><Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" /><p className="text-xs text-muted-foreground">PNG ou GIF animado</p><p className="text-[8px] text-muted-foreground">28×28, 56×56, 112×112px (redimensiona auto)</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome (:nome:)</p><Input value={name} onChange={e => setName(e.target.value.replace(/[^a-zA-Z0-9]/g,"").slice(0,25))} placeholder="hype" className="bg-white/5" /><p className="text-[8px] text-muted-foreground">:{name || "nome"}: · Máx 25 chars, letras e números</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Tier necessário</p><div className="flex gap-2">{[{id:"all",l:"Todos"},{id:"t1",l:"Tier 1+"},{id:"t2",l:"Tier 2+"},{id:"t3",l:"Tier 3"}].map(t => <button key={t.id} onClick={() => setTier(t.id)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${tier === t.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button>)}</div></div>
      <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Emote criado!")}><Save className="w-3 h-3" />Carregar e criar emote</Button>
    </div>
  )
}
