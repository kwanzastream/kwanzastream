"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarOfertaPage() {
  const [type, setType] = useState("discount")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/ofertas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Oferta</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Tipo</p>{[{id:"discount",l:"Desconto no 1º mês",d:"Ex: 50% no Tier 1"},{id:"trial",l:"Trial gratuito",d:"3 ou 7 dias grátis"},{id:"upgrade",l:"Upgrade temporário",d:"T1 com benefícios do T2 por 1 mês"}].map(t => <button key={t.id} onClick={() => setType(t.id)} className={`w-full p-3 rounded-xl border text-left ${type === t.id ? "border-primary bg-primary/5" : "border-white/10"}`}><p className="text-xs font-bold">{t.l}</p><p className="text-[8px] text-muted-foreground">{t.d}</p></button>)}</div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Início</p><Input type="date" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Fim</p><Input type="date" className="bg-white/5" /></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Código (opcional)</p><Input placeholder="ANGOLA50" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Máximo de utilizações</p><Input type="number" defaultValue={100} className="bg-white/5" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Oferta criada!")}><Save className="w-3 h-3" />Criar oferta</Button>
    </div>
  )
}
