"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarRolePage() {
  const [name, setName] = useState("")
  const [color, setColor] = useState("#FFD700")
  const [emoji, setEmoji] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/roles"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Role</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input value={name} onChange={e => setName(e.target.value)} className="bg-white/5" /></div>
      <div className="flex gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Cor</p><input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded" /></div><div className="space-y-1 flex-1"><p className="text-[10px] font-bold">Emoji</p><Input value={emoji} onChange={e => setEmoji(e.target.value)} placeholder="🏆" className="bg-white/5" /></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Permissões no chat</p>{["Ignorar slow mode","Usar emotes sem subscrição","Prioridade nos channel points"].map(p => <label key={p} className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">{p}</span></label>)}</div>
      <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Role criado!")}><Save className="w-3 h-3" />Criar role</Button>
    </div>
  )
}
