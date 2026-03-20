"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit2, Package, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ProdutoDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja/produtos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Overlay OBS Angola</h1></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Vendas",v:"8"},{l:"Receita",v:"4.000 Kz"},{l:"Avaliação",v:"⭐ 4.8"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <div className="space-y-1">{[{l:"Tipo",v:"💾 Digital"},{l:"Preço",v:"500 Kz"},{l:"Downloads máx",v:"5"},{l:"Estado",v:"🟢 Activo"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <div className="space-y-1"><Link href={`/dashboard/monetizacao/loja/produtos/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar</Button></Link><Link href={`/dashboard/monetizacao/loja/produtos/${id}/stock`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Package className="w-3 h-3" />Gerir stock</Button></Link></div>
    </div>
  )
}
