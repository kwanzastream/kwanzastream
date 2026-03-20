"use client"
import { ReportCard } from "@/components/moderation/moderation-components"
import { Button } from "@/components/ui/button"
import { Ban, Clock, X } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function ReportsPendentesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🚨 Reports Pendentes</h1>
      <div className="flex gap-1"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Pendentes</button><Link href="/dashboard/moderacao/reports/resolvidos"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Resolvidos</button></Link></div>
      <p className="text-xs font-bold text-yellow-400">3 reports pendentes</p>
      {[{reporter:"@viewer1",reported:"@user2",reason:"Spam no chat",message:"compra salos aqui bit.ly/xxx",id:"1"},{reporter:"@viewer4",reported:"@user5",reason:"Linguagem ofensiva",message:"[conteúdo ofensivo removido]",id:"2"},{reporter:"@viewer6",reported:"@user7",reason:"Auto-promoção",message:"Sigam o meu canal!",id:"3"}].map(r => <Link key={r.id} href={`/dashboard/moderacao/reports/${r.id}`}><ReportCard {...r} actions={<><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.success("Banido!") }}><Ban className="w-2.5 h-2.5" />Banir</Button><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.success("Timeout 10min") }}><Clock className="w-2.5 h-2.5" />Timeout</Button><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.info("Ignorado") }}><X className="w-2.5 h-2.5" />Ignorar</Button></>} /></Link>)}
    </div>
  )
}
