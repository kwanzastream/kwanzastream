"use client"
import { useState } from "react"
import { ArrowLeft, Save, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarTierPage() {
  const [step, setStep] = useState(1)
  const [tier, setTier] = useState("1")
  const [name, setName] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/tiers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Tier</h1></div>
      <div className="flex gap-2">{[1,2,3].map(s => <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-primary" : "bg-white/10"}`} />)}</div>
      {step === 1 && <><p className="text-xs font-bold">Passo 1: Escolher tier</p>{["1","2","3"].map(t => <button key={t} onClick={() => setTier(t)} className={`w-full p-3 rounded-xl border text-left ${tier === t ? "border-primary bg-primary/5" : "border-white/10"}`}><p className="text-xs font-bold">Tier {t}</p><p className="text-[8px] text-muted-foreground">{t === "1" ? "500 Kz/mês" : t === "2" ? "1.500 Kz/mês" : "3.000 Kz/mês"}</p></button>)}<Button className="w-full" onClick={() => setStep(2)}>Seguinte <ChevronRight className="w-3 h-3" /></Button></>}
      {step === 2 && <><p className="text-xs font-bold">Passo 2: Nome personalizado</p><Input value={name} onChange={e => setName(e.target.value.slice(0,30))} placeholder="Ex: Fã, Super Fã..." className="bg-white/5" /><p className="text-[8px] text-muted-foreground">{name.length}/30</p><Button className="w-full" onClick={() => setStep(3)} disabled={!name}>Seguinte <ChevronRight className="w-3 h-3" /></Button></>}
      {step === 3 && <><p className="text-xs font-bold">Passo 3: Benefícios base</p>{["Badge de subscritor","Emote do canal","Sem anúncios","Cor no chat"].map(b => <label key={b} className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">{b}</span></label>)}<Button className="w-full font-bold gap-1" onClick={() => toast.success("Tier criado!")}><Save className="w-3 h-3" />Criar tier</Button></>}
    </div>
  )
}
