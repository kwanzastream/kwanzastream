"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit2, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ColecaoDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/colecoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Melhores momentos FIFA</h1></div>
      <div className="grid grid-cols-2 gap-3">{[{l:"Vídeos",v:"8"},{l:"Views totais",v:"4.500"}].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-sm font-bold">{m.v}</p></div>)}</div>
      <div className="space-y-1">
        <Link href={`/dashboard/content/colecoes/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar info</Button></Link>
        <Link href={`/dashboard/content/colecoes/${id}/videos`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Film className="w-3 h-3" />Gerir vídeos</Button></Link>
      </div>
    </div>
  )
}
