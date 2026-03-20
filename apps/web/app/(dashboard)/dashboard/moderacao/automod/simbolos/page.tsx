"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function SimbolosPage() {
  const [limit, setLimit] = useState("20")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Símbolos</h1></div>
      {[{id:"off",l:"Sem limite"},{id:"20",l:"Máximo 20% ← padrão"},{id:"10",l:"Máximo 10%"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="sym" checked={limit === o.id} onChange={() => setLimit(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      <p className="text-[8px] text-muted-foreground">!, @, #, $, %, ^, &amp;, *, (), etc. Emojis não contam.</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Símbolos guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
