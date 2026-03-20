"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, MessageSquare, Gift, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function MemberProfilePage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/membros/activos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">@{id}</h1></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Tier",v:"3"},{l:"Meses",v:"8"},{l:"Total pago",v:"24.000 Kz"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Histórico</p>{[{t:"Upgrade T2 → T3",d:"Mar 2026"},{t:"Upgrade T1 → T2",d:"Nov 2025"},{t:"Subscreveu T1",d:"Jul 2025"}].map(h => <div key={h.d} className="flex justify-between p-1.5 border-b border-white/5"><span className="text-[9px]">{h.t}</span><span className="text-[8px] text-muted-foreground">{h.d}</span></div>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Actividade</p>{[{l:"Streams assistidos",v:"45"},{l:"Salos enviados",v:"15.000 Kz"},{l:"Clips criados",v:"8"}].map(a => <div key={a.l} className="flex justify-between p-1.5 border-b border-white/5"><span className="text-[9px] text-muted-foreground">{a.l}</span><span className="text-xs font-bold">{a.v}</span></div>)}</div>
      <div className="flex gap-1"><Button size="sm" variant="outline" className="flex-1 text-[9px] gap-1" onClick={() => toast.success("DM aberta!")}><MessageSquare className="w-3 h-3" />DM</Button><Button size="sm" variant="outline" className="flex-1 text-[9px] gap-1" onClick={() => toast.success("Mês grátis!")}><Gift className="w-3 h-3" />Mês grátis</Button><Button size="sm" variant="outline" className="text-[9px] text-red-400 gap-1"><Ban className="w-3 h-3" />Remover</Button></div>
    </div>
  )
}
