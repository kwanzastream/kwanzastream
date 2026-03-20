"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ComponentePosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/extensoes/posicoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Componente</h1></div>
      <p className="text-xs text-muted-foreground">Extensão ao lado do chat.</p>
      <p className="text-[10px] font-bold">Extensão</p>
      {["📊 Viewer Stats","🎯 Goals Bar","Nenhuma"].map((e,i) => <label key={e} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><input type="radio" name="comp" defaultChecked={i===0} /><span className="text-xs">{e}</span></label>)}
      <div className="space-y-1"><p className="text-[10px] font-bold">Largura</p><Input type="number" defaultValue={320} className="bg-white/5 w-24" /><p className="text-[8px] text-muted-foreground">px</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Componente guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
