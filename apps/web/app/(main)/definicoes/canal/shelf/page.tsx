"use client"
import { useState } from "react"
import { ArrowLeft, Plus, X, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
export default function ShelfPage() {
  const [channels, setChannels] = useState(["@kuduro_master","@esports_ao","@semba_dj"])
  const [newCh, setNewCh] = useState("")
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Prateleira de Canais</h1></div>
      <p className="text-[10px] text-muted-foreground">Canais recomendados por ti ({channels.length}/10)</p>
      <div className="space-y-1">{channels.map((ch, i) => <div key={ch} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><GripVertical className="w-3 h-3 text-muted-foreground cursor-grab" /><span className="text-xs font-bold flex-1">{ch}</span><button onClick={() => setChannels(channels.filter((_,j) => j !== i))}><X className="w-3 h-3 text-red-400" /></button></div>)}</div>
      {channels.length < 10 && <div className="flex gap-2"><Input value={newCh} onChange={e => setNewCh(e.target.value)} placeholder="@username" className="bg-white/5 flex-1" /><Button size="sm" disabled={!newCh} onClick={() => { setChannels([...channels, newCh]); setNewCh("") }} className="gap-1"><Plus className="w-3 h-3" />Adicionar</Button></div>}
    </div>
  )
}
