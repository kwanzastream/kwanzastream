"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit2, Image, Trash2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ClipDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/clips"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Golo incrível no FIFA</h1></div>
      <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center"><p className="text-sm text-muted-foreground">Clip preview</p></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Duração",v:"30s"},{l:"Views",v:"1.234"},{l:"Criado por",v:"@viewer1"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <div className="space-y-1">
        <Link href={`/dashboard/content/clips/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar</Button></Link>
        <Link href={`/dashboard/content/clips/${id}/thumbnail`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Image className="w-3 h-3" />Thumbnail</Button></Link>
        <Button variant="outline" size="sm" className="w-full text-xs gap-1"><Share2 className="w-3 h-3" />Partilhar</Button>
        <Button variant="outline" size="sm" className="w-full text-xs gap-1 text-red-400 border-red-500/20"><Trash2 className="w-3 h-3" />Eliminar</Button>
      </div>
    </div>
  )
}
