"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContentStatusBadge } from "@/components/content-manager/content-components"
import Link from "next/link"
export default function ShortDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/shorts"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Top 5 momentos da semana</h1></div>
      <div className="aspect-[9/16] max-h-96 bg-black/50 rounded-xl flex items-center justify-center mx-auto"><p className="text-sm text-muted-foreground">Short preview</p></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Views",v:"3.400"},{l:"Conclusão",v:"78%"},{l:"Seguidores",v:"+18"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <Link href={`/dashboard/content/shorts/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar</Button></Link>
    </div>
  )
}
