"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function NivelPage() {
  const [level, setLevel] = useState(2)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Nível AutoMod</h1></div>
      {[{n:0,l:"Desactivado",d:"Sem filtragem automática"},{n:1,l:"Mínimo",d:"Só conteúdo muito ofensivo"},{n:2,l:"Moderado ← recomendado",d:"Palavrões, ódio, spam"},{n:3,l:"Elevado",d:"Linguagem suave incluída"},{n:4,l:"Máximo",d:"Muito restritivo — pode ter falsos positivos"}].map(o => <button key={o.n} onClick={() => setLevel(o.n)} className={`w-full p-3 rounded-xl border text-left ${level === o.n ? "border-primary bg-primary/5" : "border-white/10"}`}><p className="text-xs font-bold">Nível {o.n} — {o.l}</p><p className="text-[8px] text-muted-foreground">{o.d}</p></button>)}
      <p className="text-[10px] font-bold">Acção do AutoMod:</p>
      {["Bloquear silenciosamente","Enviar para revisão","Timeout 60s"].map((a,i) => <label key={a} className="flex items-center gap-2 py-1"><input type="radio" name="action" defaultChecked={i === 0} /><span className="text-xs">{a}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Nível guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
