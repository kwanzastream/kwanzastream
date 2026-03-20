"use client"
import { ArrowLeft, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const COMISSOES = [
  { mes: "Março 2026", referrals: 12, valor: 3500 },
  { mes: "Fevereiro 2026", referrals: 18, valor: 5200 },
  { mes: "Janeiro 2026", referrals: 15, valor: 3800 },
]
export default function ComissoesPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-embaixador/painel"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><DollarSign className="w-5 h-5" />Comissões</h1></div>
      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center"><p className="text-2xl font-black text-green-400">12.500 Kz</p><p className="text-[9px] text-muted-foreground">Total acumulado</p></div>
      <div className="space-y-1">{COMISSOES.map(c => <div key={c.mes} className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div><p className="text-xs font-bold">{c.mes}</p><p className="text-[9px] text-muted-foreground">{c.referrals} referrals</p></div><p className="text-sm font-bold text-green-400">+{c.valor.toLocaleString()} Kz</p></div>)}</div>
    </div>
  )
}
