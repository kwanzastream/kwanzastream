"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarExperienciaPage() {
  const [name, setName] = useState("")
  const [days, setDays] = useState({seg:true,ter:true,qua:true,qui:true,sex:true,sab:false,dom:false})
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja/produtos/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎤 Experiência</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Shoutout ao vivo" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea rows={2} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Preço (Kz)</p><Input type="number" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Duração (min)</p><Input type="number" className="bg-white/5" /></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Disponibilidade</p><div className="flex gap-1">{Object.entries(days).map(([d,v]) => <button key={d} onClick={() => setDays({...days,[d]:!v})} className={`px-2 py-1 rounded text-[8px] font-bold ${v ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{d.charAt(0).toUpperCase() + d.slice(1)}</button>)}</div></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">De (WAT)</p><Input type="time" defaultValue="18:00" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Até (WAT)</p><Input type="time" defaultValue="22:00" className="bg-white/5" /></div></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Máx/semana</p><Input type="number" defaultValue={3} className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Confirmação</p><p className="text-[9px] text-muted-foreground">Via WhatsApp</p></div></div>
      <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Experiência criada!")}><Save className="w-3 h-3" />Criar experiência</Button>
    </div>
  )
}
