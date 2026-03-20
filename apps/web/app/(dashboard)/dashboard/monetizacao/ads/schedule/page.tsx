"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
import { useState } from "react"
export default function AdsSchedulePage() {
  const [freq, setFreq] = useState("manual")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/ads"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Frequência de Ads</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Frequência</p>{[{id:"30",l:"A cada 30 min"},{id:"45",l:"A cada 45 min"},{id:"60",l:"A cada 60 min"},{id:"manual",l:"Manual (tu decides)"}].map(f => <label key={f.id} className="flex items-center gap-2 py-1"><input type="radio" name="freq" checked={freq === f.id} onChange={() => setFreq(f.id)} /><span className="text-xs">{f.l}</span></label>)}</div>
      <p className="text-[8px] text-muted-foreground">Ads desactivados por padrão — activa manualmente durante o stream.</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Frequência guardada!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
