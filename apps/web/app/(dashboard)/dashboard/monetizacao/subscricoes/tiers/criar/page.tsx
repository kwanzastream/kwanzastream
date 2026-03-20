"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarTierPage() {
  const [tier, setTier] = useState("1")
  const [name, setName] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/subscricoes/tiers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Tier</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Seleccionar Tier</p><div className="flex gap-2">{["1","2","3"].map(t => <button key={t} onClick={() => setTier(t)} className={`px-4 py-2 rounded-xl text-xs font-bold ${tier === t ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>Tier {t} ({t === "1" ? "500" : t === "2" ? "1.500" : "3.000"} Kz)</button>)}</div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome personalizado</p><Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Fã, Super Fã..." className="bg-white/5" /></div>
      <p className="text-[10px] text-muted-foreground">Benefícios automáticos: Badge, Emote, Chat colorido</p>
      <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Tier criado!")}><Save className="w-3 h-3" />Confirmar</Button>
    </div>
  )
}
