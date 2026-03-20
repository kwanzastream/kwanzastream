"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function OverlayPosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/extensoes/posicoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Overlay</h1></div>
      <p className="text-xs text-muted-foreground">Extensão sobre o vídeo.</p>
      <p className="text-[10px] font-bold">Extensão</p>
      {["💛 Salos Alert","🎯 Goals Bar","📊 Viewer Stats"].map((e,i) => <label key={e} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><input type="radio" name="overlay" defaultChecked={i===0} /><span className="text-xs">{e}</span></label>)}
      <p className="text-[10px] font-bold">Posição (3×3)</p>
      <div className="grid grid-cols-3 gap-1 w-36">{["TL","TC","TR","ML","MC","MR","BL","BC","BR"].map((p,i) => <button key={p} className={`w-11 h-8 rounded border text-[8px] ${i === 2 ? "border-primary bg-primary/10" : "border-white/10"}`}>{p}</button>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Opacidade</p><input type="range" min={0} max={100} defaultValue={100} className="w-full" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Overlay guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
