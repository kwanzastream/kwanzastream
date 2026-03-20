"use client"
import { ArrowLeft, Search, UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
export default function ColaboracoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Co-stream</h1></div>
      <div className="p-4 rounded-xl border border-white/10 text-center space-y-2"><p className="text-sm text-muted-foreground">Nenhum co-stream activo</p><p className="text-[9px] text-muted-foreground">Convida outro criador para transmitir em conjunto</p></div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Convidar canal</p><div className="flex gap-1"><Input placeholder="Pesquisar username..." className="bg-white/5" /><Button size="sm" className="gap-1"><Search className="w-3 h-3" />Procurar</Button></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Sugestões</p>{[{n:"@gamer_ao",v:"234 viewers",cat:"Gaming"},{n:"@dj_luanda",v:"89 viewers",cat:"Música"},{n:"@comedia_ao",v:"156 viewers",cat:"Comédia"}].map(s => <div key={s.n} className="flex items-center gap-3 p-2 rounded-xl border border-white/10"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">🎬</div><div className="flex-1"><p className="text-xs font-bold">{s.n}</p><p className="text-[8px] text-muted-foreground">{s.cat} · {s.v}</p></div><Button size="sm" variant="outline" className="text-[9px] gap-1"><UserPlus className="w-3 h-3" />Convidar</Button></div>)}</div>
    </div>
  )
}
