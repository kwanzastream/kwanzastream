"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
export default function RewardDetailPage() {
  const { id } = useParams()
  const [active, setActive] = useState(true)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/channel-points"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Reward</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Título</p><Input defaultValue="Shoutout ao vivo" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Custo</p><Input type="number" defaultValue="1000" className="bg-white/5" /></div>
      <div className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-xs font-bold">Activo</span><button onClick={() => { setActive(!active); toast.info(active ? "Reward desactivado" : "Reward activado") }}>{active ? <ToggleRight className="w-6 h-6 text-green-400" /> : <ToggleLeft className="w-6 h-6 text-muted-foreground" />}</button></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Reward actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
