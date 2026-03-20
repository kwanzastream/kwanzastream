"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarRewardPage() {
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("1000")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/channel-points"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Reward</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Título (máx 45)</p><Input value={title} onChange={e => setTitle(e.target.value.slice(0,45))} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição (máx 200)</p><textarea rows={2} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Custo em pontos</p><Input type="number" value={cost} onChange={e => setCost(e.target.value)} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Máximo por stream</p><div className="flex gap-2">{["Ilimitado","1","5","10"].map(m => <button key={m} className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">{m}</button>)}</div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Cooldown</p><div className="flex gap-2">{["Sem","5min","1h","Por stream"].map(c => <button key={c} className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">{c}</button>)}</div></div>
      <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Requer aprovação manual</label>
      <Button className="w-full font-bold gap-1" disabled={!title} onClick={() => toast.success("Reward criado!")}><Save className="w-3 h-3" />Criar reward</Button>
    </div>
  )
}
