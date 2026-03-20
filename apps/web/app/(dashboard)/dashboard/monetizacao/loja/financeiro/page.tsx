"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function FinanceiroPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Financeiro da Loja</h1></div>
      <div className="space-y-1">{[{product:"Overlay OBS Angola",type:"Digital",sales:8,gross:"4.000 Kz",fee:"15%",net:"3.400 Kz"},{product:"T-Shirt Kwanza",type:"Físico",sales:3,gross:"9.000 Kz",fee:"10%",net:"8.100 Kz"},{product:"Shoutout ao vivo",type:"Experiência",sales:1,gross:"2.000 Kz",fee:"20%",net:"1.600 Kz"}].map(p => <div key={p.product} className="p-3 rounded-xl border border-white/10"><div className="flex justify-between"><p className="text-xs font-bold">{p.product}</p><span className="text-xs font-black text-primary">{p.net}</span></div><p className="text-[8px] text-muted-foreground">{p.type} · {p.sales} vendas · Bruto {p.gross} · Comissão {p.fee}</p></div>)}</div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><div className="flex justify-between"><span className="text-xs">Total líquido</span><span className="text-sm font-black text-primary">13.100 Kz</span></div></div>
    </div>
  )
}
