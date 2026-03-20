"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, ArrowUpRight, Smartphone, Building2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
export default function PayoutsPage() {
  const [method, setMethod] = useState("multicaixa")
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/pagamentos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><ArrowUpRight className="w-5 h-5" />Configurar Payouts</h1></div>
      <p className="text-[10px] text-muted-foreground">Como recebes os ganhos de streamer (Salos, subscrições, loja).</p>
      <div className="space-y-1">{[{id:"multicaixa",label:"Multicaixa Express",icon:Smartphone},{id:"banco",label:"Transferência bancária",icon:Building2},{id:"unitel",label:"Unitel Money",icon:Phone}].map(m => <button key={m.id} onClick={() => { setMethod(m.id); setDirty(true) }} className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${method === m.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><m.icon className="w-4 h-4 text-primary" /><span className="text-xs font-bold">{m.label}</span></button>)}</div>
      {method === "banco" && <div className="space-y-3 p-3 rounded-xl border border-white/10"><div className="space-y-1"><p className="text-[10px] font-bold">IBAN</p><Input placeholder="AO06..." className="bg-white/5 font-mono" onChange={() => setDirty(true)} /></div><div className="space-y-1"><p className="text-[10px] font-bold">Titular</p><Input className="bg-white/5" onChange={() => setDirty(true)} /></div></div>}
      {method === "unitel" && <div className="space-y-1 p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Número Unitel</p><Input placeholder="9XX XXX XXX" className="bg-white/5" onChange={() => setDirty(true)} /></div>}
      <div className="space-y-1"><p className="text-[10px] font-bold">Payout automático quando saldo ≥</p><Input placeholder="5000" defaultValue="5000" className="bg-white/5" onChange={() => setDirty(true)} /><p className="text-[8px] text-muted-foreground">Kz (mínimo 5.000 Kz)</p></div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
