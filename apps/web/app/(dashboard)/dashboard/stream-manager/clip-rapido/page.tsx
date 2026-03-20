"use client"
import { useState } from "react"
import { ArrowLeft, Scissors, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ClipRapidoPage() {
  const [duration, setDuration] = useState("60")
  const [title, setTitle] = useState("Gaming ao vivo — 14:23")
  const [creating, setCreating] = useState(false)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">✂️ Clip Rápido</h1></div>
      <div className="space-y-3 p-4 rounded-xl border border-white/10">
        <div className="space-y-1"><p className="text-[10px] font-bold">Clip dos últimos:</p><div className="flex gap-2">{["30","60","90"].map(d => <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-xl text-sm font-bold ${duration === d ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{d}s</button>)}</div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Título</p><Input value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5" /></div>
        <Button className="w-full h-12 gap-2 font-bold" disabled={creating} onClick={() => { setCreating(true); setTimeout(() => { setCreating(false); toast.success("Clip criado! Link disponível em breve.") }, 3000) }}>{creating ? <><Loader2 className="w-4 h-4 animate-spin" />A criar clip...</> : <><Scissors className="w-4 h-4" />Criar Clip Agora</>}</Button>
      </div>
      <p className="text-[8px] text-muted-foreground text-center">Processamento assíncrono — o clip ficará disponível em ~1 minuto.</p>
    </div>
  )
}
