"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function QualidadePage() {
  const [quality, setQuality] = useState("720")
  const [bitrate, setBitrate] = useState("2500")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📺 Qualidade</h1>
      <p className="text-[10px] font-bold">Qualidade máxima</p>
      {[{id:"360",l:"360p (economiza dados — recomendado AO)"},{id:"480",l:"480p"},{id:"720",l:"720p ← padrão"},{id:"1080",l:"1080p (Partner apenas)"}].map(q => <label key={q.id} className="flex items-center gap-2 py-1"><input type="radio" name="quality" checked={quality === q.id} onChange={() => setQuality(q.id)} /><span className="text-xs">{q.l}</span></label>)}
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Transcodificação automática</span></label>
      <p className="text-[8px] text-muted-foreground">Gera versões 360p/480p para viewers com dados limitados</p>
      <p className="text-[10px] font-bold">Bitrate máximo</p>
      {[{id:"1500",l:"1.500 kbps"},{id:"2500",l:"2.500 kbps ← recomendado"},{id:"4000",l:"4.000 kbps (Partner)"},{id:"6000",l:"6.000 kbps (Partner)"}].map(b => <label key={b.id} className="flex items-center gap-2 py-1"><input type="radio" name="bitrate" checked={bitrate === b.id} onChange={() => setBitrate(b.id)} /><span className="text-xs">{b.l}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Qualidade guardada!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
