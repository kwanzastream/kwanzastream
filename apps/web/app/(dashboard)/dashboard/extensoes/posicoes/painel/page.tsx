"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function PainelPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/extensoes/posicoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Painel</h1></div>
      <p className="text-xs text-muted-foreground">Extensão abaixo do player. Só 1 extensão por posição.</p>
      {["🎯 Goals Bar","💛 Salos Alert","📊 Viewer Stats","🗳️ Live Poll"].map((e,i) => <label key={e} className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10"><input type="radio" name="panel" defaultChecked={i===0} /><span className="text-xs">{e}</span></label>)}
      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-dashed border-white/20"><input type="radio" name="panel" /><span className="text-xs text-muted-foreground">Nenhuma</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Painel guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
