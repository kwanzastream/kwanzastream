"use client"
import { useParams } from "next/navigation"
import { ContentStatusBadge } from "@/components/content-manager/content-components"
import { ArrowLeft, Edit2, Image, BookOpen, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function VodDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/vods"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">FIFA 26 — Torneio Angola</h1></div>
      <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center"><p className="text-sm text-muted-foreground">VOD preview</p></div>
      <div className="grid grid-cols-2 gap-3">{[{l:"Duração",v:"2h 34min"},{l:"Views",v:"1.234"},{l:"Data",v:"20 Mar 2026"},{l:"Estado",v:<ContentStatusBadge status="public" />}].map((m,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-[9px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <div className="space-y-1">
        <Link href={`/dashboard/content/vods/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar título e descrição</Button></Link>
        <Link href={`/dashboard/content/vods/${id}/thumbnail`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Image className="w-3 h-3" />Alterar thumbnail</Button></Link>
        <Link href={`/dashboard/content/vods/${id}/capitulos`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><BookOpen className="w-3 h-3" />Gerir capítulos</Button></Link>
        <Button variant="outline" size="sm" className="w-full text-xs gap-1"><Download className="w-3 h-3" />Descarregar</Button>
        <Button variant="outline" size="sm" className="w-full text-xs gap-1 text-red-400 border-red-500/20"><Trash2 className="w-3 h-3" />Eliminar VOD</Button>
      </div>
    </div>
  )
}
