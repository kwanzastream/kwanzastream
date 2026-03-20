"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarColecaoPage() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [vis, setVis] = useState("public")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/colecoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Colecção</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Nome (máx 100)</p><Input value={name} onChange={e => setName(e.target.value.slice(0,100))} className="bg-white/5" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Descrição (máx 500)</p><textarea value={desc} onChange={e => setDesc(e.target.value.slice(0,500))} rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Visibilidade</p><div className="flex gap-3">{[{id:"public",l:"Pública"},{id:"private",l:"Privada"}].map(v => <label key={v.id} className="flex items-center gap-1 text-xs"><input type="radio" name="vis" checked={vis === v.id} onChange={() => setVis(v.id)} />{v.l}</label>)}</div></div>
        <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Colecção criada!")}><Save className="w-3 h-3" />Criar</Button>
      </div>
    </div>
  )
}
