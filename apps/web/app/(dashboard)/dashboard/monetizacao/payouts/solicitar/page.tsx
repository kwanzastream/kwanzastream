"use client"
import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function SolicitarPayoutPage() {
  const [method, setMethod] = useState("multicaixa")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/payouts"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Solicitar Payout</h1></div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-[10px] text-muted-foreground">Saldo disponível</p><p className="text-lg font-black text-primary">38.500 Kz</p><p className="text-[8px] text-muted-foreground">Mínimo: 5.000 Kz</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Valor (Kz)</p><Input type="number" placeholder="5.000 — 500.000" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Método</p>{[{id:"multicaixa",l:"Multicaixa"},{id:"banco",l:"Banco"},{id:"unitel",l:"Unitel Money"}].map(m => <label key={m.id} className="flex items-center gap-2 py-1"><input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} /><span className="text-xs">{m.l}</span></label>)}</div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Payout solicitado!")}><Send className="w-3 h-3" />Solicitar payout</Button>
    </div>
  )
}
