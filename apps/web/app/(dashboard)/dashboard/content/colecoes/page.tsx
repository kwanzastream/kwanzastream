"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
const COLECOES = [{id:"1",name:"Melhores momentos FIFA",videos:8,views:4500},{id:"2",name:"Tutoriais OBS",videos:3,views:1200},{id:"3",name:"Música ao vivo",videos:5,views:2300}]
export default function ColecoesPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Colecções</h1><Link href="/dashboard/content/colecoes/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar colecção</Button></Link></div>
      <div className="space-y-1.5">{COLECOES.map(c => <Link key={c.id} href={`/dashboard/content/colecoes/${c.id}`}><div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><div className="w-16 h-10 rounded bg-primary/10 flex items-center justify-center text-xs">📁</div><div className="flex-1"><p className="text-xs font-bold">{c.name}</p><p className="text-[8px] text-muted-foreground">{c.videos} vídeos · {c.views.toLocaleString()} views</p></div></div></Link>)}</div>
    </div>
  )
}
