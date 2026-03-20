"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function OfertaDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/ofertas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Oferta #{id}</h1></div>
      <div className="space-y-1">{[{l:"Tipo",v:"Desconto no 1º mês"},{l:"Desconto",v:"50% no Tier 1 (250 Kz em vez de 500 Kz)"},{l:"Período",v:"1 Abr — 30 Abr 2026"},{l:"Código",v:"ANGOLA50"},{l:"Utilizações",v:"34/100"},{l:"Conversões",v:"28 mantiveram após mês 1 (82%)"},{l:"Receita gerada",v:"14.000 Kz (28 × 500 Kz)"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
    </div>
  )
}
