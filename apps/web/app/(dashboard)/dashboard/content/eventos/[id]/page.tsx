"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit2, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function EventoDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/eventos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Torneio FIFA Angola</h1></div>
      <div className="grid grid-cols-2 gap-3">{[{l:"Data",v:"25 Mar 2026"},{l:"Streams",v:"3"},{l:"Inscritos",v:"45"},{l:"Estado",v:"🟢 Próximo"}].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <Link href={`/dashboard/content/eventos/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar evento</Button></Link>
      <Link href={`/dashboard/content/eventos/${id}/streams`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Film className="w-3 h-3" />Gerir streams</Button></Link>
    </div>
  )
}
