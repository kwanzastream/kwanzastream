"use client"
import { useState } from "react"
import { ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function MarcadoresPage() {
  const [markers, setMarkers] = useState([{ ts: "00:00", label: "Início" }, { ts: "23:45", label: "Primeira vitória" }])
  const [editing, setEditing] = useState<number | null>(null)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">📌 Marcadores</h1></div>
      <Button className="w-full gap-1 font-bold" onClick={() => { setMarkers([...markers, { ts: "1:02:30", label: "" }]); toast.success("Marcador criado!") }}><Plus className="w-3 h-3" />Criar marcador agora</Button>
      <div className="space-y-1">{markers.map((m, i) => <div key={i} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><span className="text-xs font-mono text-primary shrink-0">{m.ts}</span>{editing === i ? <Input value={m.label} onChange={e => { const n = [...markers]; n[i].label = e.target.value; setMarkers(n) }} onBlur={() => setEditing(null)} autoFocus className="bg-white/5 h-7 text-xs" /> : <span className="text-xs text-muted-foreground flex-1">{m.label || <em className="text-muted-foreground/50">sem label</em>}</span>}<Button size="icon" variant="ghost" onClick={() => setEditing(i)}><Edit2 className="w-3 h-3" /></Button><Button size="icon" variant="ghost" onClick={() => setMarkers(markers.filter((_, j) => j !== i))}><Trash2 className="w-3 h-3 text-red-400" /></Button></div>)}</div>
      <p className="text-[8px] text-muted-foreground text-center">Marcadores aparecem como capítulos no VOD.</p>
    </div>
  )
}
