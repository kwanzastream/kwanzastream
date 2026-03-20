"use client"
import { useState } from "react"
import { ArrowLeft, Pin, X, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const CATS = ["Gaming","Música","Comédia","FIFA 26","Mobile Legends","Kuduro","Afrobeats","Política","Culinária","CS2"]
export default function CategoriasRecentesPage() {
  const [cats, setCats] = useState(CATS)
  const [pinned, setPinned] = useState(["Gaming","FIFA 26"])
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><List className="w-5 h-5" />Categorias Recentes</h1></div>
      {pinned.length > 0 && <div className="space-y-1"><p className="text-[10px] font-bold text-yellow-400">📌 Fixadas (topo ao iniciar stream)</p>{pinned.map(c => <div key={c} className="flex items-center justify-between p-2 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><span className="text-xs font-bold">{c}</span><button onClick={() => setPinned(pinned.filter(p => p !== c))}><Pin className="w-3 h-3 text-yellow-400" /></button></div>)}</div>}
      <div className="space-y-1"><p className="text-[10px] font-bold">Recentes</p>{cats.filter(c => !pinned.includes(c)).map(c => <div key={c} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><span className="text-xs">{c}</span><div className="flex gap-1"><button onClick={() => setPinned([...pinned, c])} className="text-[8px] text-primary">Fixar</button><button onClick={() => setCats(cats.filter(x => x !== c))}><X className="w-3 h-3 text-red-400" /></button></div></div>)}</div>
    </div>
  )
}
