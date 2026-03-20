"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function EventoEditPage() {
  const { id } = useParams()
  const [name, setName] = useState("Torneio FIFA Angola")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Evento</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input value={name} onChange={e => setName(e.target.value)} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Data</p><Input type="date" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Evento actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
