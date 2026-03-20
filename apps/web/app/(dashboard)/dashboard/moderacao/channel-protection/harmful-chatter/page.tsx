"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function HarmfulChatterPage() {
  const [action, setAction] = useState("timeout")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/channel-protection"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">⚠️ Harmful Chatter</h1></div>
      <p className="text-[10px] font-bold">Detectar:</p>
      {["Discurso de ódio","Ameaças","Assédio","Conteúdo sexual não solicitado","Doxxing (info pessoal de terceiros)"].map(c => <label key={c} className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">{c}</span></label>)}
      <p className="text-[10px] font-bold">Acção:</p>
      {[{id:"review",l:"Enviar para revisão"},{id:"timeout",l:"Timeout 10 minutos ← padrão"},{id:"ban",l:"Ban imediato"}].map(a => <label key={a.id} className="flex items-center gap-2 py-1"><input type="radio" name="action" checked={action === a.id} onChange={() => setAction(a.id)} /><span className="text-xs">{a.l}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
