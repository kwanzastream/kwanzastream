"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function StockPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/monetizacao/loja/produtos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Gestão de Stock</h1></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Actual",v:"23"},{l:"Reservado",v:"3"},{l:"Disponível",v:"20"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-sm font-bold">{m.v}</p></div>)}</div>
      <div className="flex gap-2"><Input type="number" placeholder="Quantidade" className="bg-white/5" /><Button size="sm" className="gap-1 text-xs" onClick={() => toast.success("Stock adicionado!")}><Plus className="w-3 h-3" />Adicionar</Button></div>
      <p className="text-[10px] font-bold">Movimentos</p>
      {[{date:"20 Mar",type:"+10",note:"Restock"},{date:"18 Mar",type:"-1",note:"Pedido #234"},{date:"15 Mar",type:"-1",note:"Pedido #201"}].map((m,i) => <div key={i} className="flex justify-between p-2 rounded border border-white/10"><span className="text-xs">{m.date} — {m.note}</span><span className={`text-xs font-bold ${m.type.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{m.type}</span></div>)}
    </div>
  )
}
