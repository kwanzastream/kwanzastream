"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function HypeTrainHistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/hype-train"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Histórico Frenesi</h1></div>
      {[{date:"20 Mar, 21:30",stream:"FIFA 26",level:4,contributors:12,revenue:"8.500 Kz"},{date:"15 Mar, 20:15",stream:"Kuduro DJ Set",level:5,contributors:18,revenue:"15.000 Kz"},{date:"10 Mar, 21:00",stream:"Just Talking",level:2,contributors:6,revenue:"3.000 Kz"}].map((h,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><div className="flex justify-between"><p className="text-xs font-bold">{h.stream}</p><span className="text-xs font-black text-primary">{h.revenue}</span></div><p className="text-[8px] text-muted-foreground">{h.date}</p><div className="flex gap-2 mt-1"><span className="px-2 py-0.5 rounded-full bg-primary/10 text-[8px] text-primary">Nível {h.level}</span><span className="px-2 py-0.5 rounded-full bg-white/5 text-[8px] text-muted-foreground">{h.contributors} contribuidores</span></div></div>)}
    </div>
  )
}
