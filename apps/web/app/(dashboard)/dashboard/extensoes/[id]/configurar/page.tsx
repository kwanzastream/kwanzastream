"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ConfigurarPage() {
  const { id } = useParams()
  const isGoals = id === "goals-bar" || !id
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/extensoes/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Configurar {isGoals ? "Goals Bar" : "Extensão"}</h1></div>
      {isGoals ? <>
        <p className="text-[10px] font-bold">Objectivo activo</p>
        {[{id:"followers",l:"Seguidores",meta:"1.000",actual:"567"},{id:"salos",l:"Salos",meta:"50.000 Kz",actual:"28.000 Kz"},{id:"hours",l:"Horas transmitidas",meta:"100h",actual:"42h"},{id:"custom",l:"Custom"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="goal" defaultChecked={o.id === "followers"} /><span className="text-xs">{o.l}{o.meta ? ` — Meta: ${o.meta} · Actual: ${o.actual}` : ""}</span></label>)}
        <p className="text-[10px] font-bold">Estilo</p>
        <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[9px]">Cor da barra</p><input type="color" defaultValue="#E30613" className="w-8 h-8 rounded" /></div><div className="space-y-1"><p className="text-[9px]">Cor de fundo</p><input type="color" defaultValue="#1a1a2e" className="w-8 h-8 rounded" /></div></div>
        <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Mostrar percentagem</span></label>
        <div className="space-y-1"><p className="text-[9px]">Texto</p><Input defaultValue="Ajuda-me a chegar aos {meta} {unidade}!" className="bg-white/5" /></div>
      </> : <>
        <div className="space-y-1"><p className="text-[10px] font-bold">Valor mínimo</p><Input type="number" defaultValue={200} className="bg-white/5 w-24" /><p className="text-[8px] text-muted-foreground">Kz</p></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Duração</p><select className="h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>3s</option><option>5s</option><option>10s</option></select></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Animação</p><select className="h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>Slide in</option><option>Fade in</option><option>Pop</option></select></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Som</p><select className="h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>Angola 1</option><option>Angola 2</option><option>Festivo</option><option>Sem som</option></select></div>
      </>}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Configuração guardada!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
