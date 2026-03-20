"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Plus, ChevronUp, ChevronDown, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ColecaoVideosPage() {
  const { id } = useParams()
  const [videos, setVideos] = useState([{title:"FIFA 26 — Torneio Angola"},{title:"FIFA 26 — Ranked"},{title:"FIFA 26 — Draft"}])
  const move = (i: number, dir: number) => { const n = [...videos]; const t = n[i]; n[i] = n[i+dir]; n[i+dir] = t; setVideos(n) }
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/colecoes/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Gerir Vídeos</h1></div>
      <div className="space-y-1">{videos.map((v, i) => <div key={i} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><span className="text-[9px] font-bold text-muted-foreground w-4">{i+1}</span><div className="w-12 h-7 rounded bg-primary/10 flex items-center justify-center text-[8px]">🎬</div><span className="text-xs flex-1 truncate">{v.title}</span><Button size="icon" variant="ghost" disabled={i === 0} onClick={() => move(i, -1)}><ChevronUp className="w-3 h-3" /></Button><Button size="icon" variant="ghost" disabled={i === videos.length-1} onClick={() => move(i, 1)}><ChevronDown className="w-3 h-3" /></Button><Button size="icon" variant="ghost" onClick={() => setVideos(videos.filter((_, j) => j !== i))}><X className="w-3 h-3 text-red-400" /></Button></div>)}</div>
      <div className="flex gap-1"><Input placeholder="Pesquisar nos meus VODs..." className="bg-white/5 text-xs" /><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Adicionar</Button></div>
    </div>
  )
}
