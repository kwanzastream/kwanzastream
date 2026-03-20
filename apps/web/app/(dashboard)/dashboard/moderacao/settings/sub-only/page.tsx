"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function SubOnlyPage() {
  const [mode, setMode] = useState("off")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/settings"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Sub-only Mode</h1></div>
      {[{id:"off",l:"Desactivado"},{id:"any",l:"Qualquer subscritor"},{id:"t2",l:"Tier 2 ou superior"},{id:"t3",l:"Tier 3 apenas"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="sub" checked={mode === o.id} onChange={() => setMode(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Sub-only guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
