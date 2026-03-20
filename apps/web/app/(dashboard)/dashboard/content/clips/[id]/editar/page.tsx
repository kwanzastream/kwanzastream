"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ClipEditPage() {
  const { id } = useParams()
  const [title, setTitle] = useState("Golo incrível no FIFA")
  const [vis, setVis] = useState("public")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/clips/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Clip</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Título</p><Input value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Visibilidade</p><div className="flex gap-3">{[{id:"public",l:"Público"},{id:"private",l:"Privado"}].map(v => <label key={v.id} className="flex items-center gap-1 text-xs"><input type="radio" name="vis" checked={vis === v.id} onChange={() => setVis(v.id)} />{v.l}</label>)}</div></div>
        <Button className="w-full font-bold gap-1" onClick={() => toast.success("Clip actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
      </div>
    </div>
  )
}
