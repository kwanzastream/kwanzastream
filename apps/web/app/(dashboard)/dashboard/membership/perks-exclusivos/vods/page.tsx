"use client"
import { ArrowLeft, Eye, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ExclusiveVODsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎬 VODs Exclusivos</h1>
      <div className="flex gap-1"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">VODs</button><Link href="/dashboard/membership/perks-exclusivos/streams-privados"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Streams</button></Link><Link href="/dashboard/membership/perks-exclusivos/discord"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Discord</button></Link></div>
      {[{title:"Q&A com membros — Mar 2026",tier:"Tier 2+",views:156},{title:"Behind the scenes — Setup tour",tier:"Tier 1+",views:312}].map(v => <div key={v.title} className="p-3 rounded-xl border border-white/10"><div className="flex justify-between"><p className="text-xs font-bold">{v.title}</p></div><p className="text-[8px] text-muted-foreground">{v.tier} · {v.views} visualizações</p><div className="flex gap-1 mt-1"><Button size="sm" variant="outline" className="text-[8px] h-6" onClick={() => toast.info("Tornado público!")}><Eye className="w-2.5 h-2.5 mr-0.5" />Tornar público</Button><Button size="sm" variant="outline" className="text-[8px] h-6" onClick={() => toast.info("Editando tier...")}><Edit2 className="w-2.5 h-2.5 mr-0.5" />Editar tier</Button></div></div>)}
      <Button variant="outline" size="sm" className="w-full text-xs">+ Marcar VOD como exclusivo</Button>
    </div>
  )
}
