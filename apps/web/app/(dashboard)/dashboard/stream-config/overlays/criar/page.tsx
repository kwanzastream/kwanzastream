"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarOverlayPage() {
  const [type, setType] = useState("alert")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-config/overlays"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Overlay</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input placeholder="Meu overlay" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Tipo</p>{[{id:"alert",l:"Alerta"},{id:"info",l:"Informação"},{id:"chat",l:"Chat"},{id:"ticker",l:"Ticker"}].map(t => <label key={t.id} className="flex items-center gap-2 py-1"><input type="radio" name="type" checked={type === t.id} onChange={() => setType(t.id)} /><span className="text-xs">{t.l}</span></label>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Posição</p><div className="grid grid-cols-3 gap-1 w-32">{["TL","TC","TR","ML","MC","MR","BL","BC","BR"].map(p => <button key={p} className="w-10 h-8 rounded border border-white/10 text-[8px] hover:bg-primary/20">{p}</button>)}</div></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Largura (px)</p><Input type="number" defaultValue={400} className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Altura (px)</p><Input type="number" defaultValue={200} className="bg-white/5" /></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Background</p>{["Transparente","Cor sólida","Blur"].map(b => <label key={b} className="flex items-center gap-2 py-1"><input type="radio" name="bg" defaultChecked={b === "Transparente"} /><span className="text-xs">{b}</span></label>)}</div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Overlay criado!")}><Save className="w-3 h-3" />Criar overlay</Button>
    </div>
  )
}
