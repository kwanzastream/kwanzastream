"use client"
import { useState } from "react"
import { ArrowLeft, Save, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarHighlightPage() {
  const [title, setTitle] = useState("")
  const [vod, setVod] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/highlights"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Highlight</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">VOD de origem</p><select value={vod} onChange={e => setVod(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option value="">Seleccionar VOD...</option><option>FIFA 26 — Torneio Angola</option><option>Just Talking — 18 Mar</option></select></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Título do highlight</p><Input value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5" /></div>
        <div className="grid grid-cols-2 gap-2"><div className="space-y-1"><p className="text-[10px] font-bold">Início</p><Input type="text" placeholder="HH:MM:SS" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Fim</p><Input type="text" placeholder="HH:MM:SS" className="bg-white/5" /></div></div>
        <Button className="w-full font-bold gap-1" disabled={!title || !vod} onClick={() => toast.success("Highlight criado!")}><Scissors className="w-3 h-3" />Criar Highlight</Button>
      </div>
    </div>
  )
}
