"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function SpamPage() {
  const [action, setAction] = useState("timeout5")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Spam</h1></div>
      <p className="text-[10px] font-bold">Detecção:</p>
      {["Mensagens repetidas (3× seguidas)","Flood de caracteres (aaaaaaa)","Padrões de bot (msgs muito rápidas)","ASCII art"].map(d => <label key={d} className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">{d}</span></label>)}
      <p className="text-[10px] font-bold">Acção:</p>
      {[{id:"delete",l:"Eliminar mensagem"},{id:"timeout5",l:"Timeout 5 minutos ← padrão"},{id:"timeout30",l:"Timeout 30 minutos"}].map(a => <label key={a.id} className="flex items-center gap-2 py-1"><input type="radio" name="spam" checked={action === a.id} onChange={() => setAction(a.id)} /><span className="text-xs">{a.l}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Spam guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
