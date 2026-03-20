"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function EmotesPage() {
  const [limit, setLimit] = useState("5")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Emotes</h1></div>
      {[{id:"off",l:"Sem limite"},{id:"5",l:"Máximo 5 ← padrão"},{id:"3",l:"Máximo 3"},{id:"1",l:"Máximo 1"},{id:"block",l:"Bloquear mensagens só com emotes"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="emotes" checked={limit === o.id} onChange={() => setLimit(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Emotes guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
