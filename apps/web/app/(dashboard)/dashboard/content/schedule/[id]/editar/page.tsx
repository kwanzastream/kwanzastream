"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function EditSchedulePage() {
  const { id } = useParams()
  const [title, setTitle] = useState("Gaming Friday")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/schedule"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Evento</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Título</p><Input value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5" /></div>
      <div className="grid grid-cols-2 gap-2"><div className="space-y-1"><p className="text-[10px] font-bold">Data</p><Input type="date" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Hora</p><Input type="time" className="bg-white/5" defaultValue="20:00" /></div></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Evento actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
