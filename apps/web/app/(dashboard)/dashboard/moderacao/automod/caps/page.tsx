"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CapsPage() {
  const [mode, setMode] = useState("80")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">CAPS</h1></div>
      {[{id:"off",l:"Permitir todas"},{id:"80",l:"Bloquear se > 80% em CAPS ← padrão"},{id:"50",l:"Bloquear se > 50% em CAPS"},{id:"all",l:"Bloquear todas em CAPS"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="caps" checked={mode === o.id} onChange={() => setMode(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      <div className="space-y-1"><p className="text-[10px] font-bold">Mínimo de caracteres</p><Input type="number" defaultValue={10} className="bg-white/5 w-24" /><p className="text-[8px] text-muted-foreground">Mensagens mais curtas que isto são ignoradas</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("CAPS guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
