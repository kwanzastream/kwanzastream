"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"
import Link from "next/link"

export default function TorneioCriarStreamsPage() {
  const router = useRouter()
  const [channels, setChannels] = useState([""])
  const addChannel = () => setChannels([...channels, ""])
  const updateChannel = (i: number, v: string) => { const c = [...channels]; c[i] = v; setChannels(c) }
  const removeChannel = (i: number) => setChannels(channels.filter((_, j) => j !== i))

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/torneios/criar/inscricoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">6/7 — Streams</h1></div>
      <p className="text-xs text-muted-foreground">Associa canais que vão transmitir o torneio. O teu canal é adicionado automaticamente como principal.</p>
      <div className="space-y-2">
        {channels.map((c, i) => (<div key={i} className="flex gap-2"><Input value={c} onChange={e => updateChannel(i, e.target.value)} placeholder={`@canal${i + 1}`} className="flex-1 h-9 bg-white/5" />{channels.length > 1 && <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => removeChannel(i)}><X className="w-3 h-3" /></Button>}</div>))}
        <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={addChannel}><Plus className="w-3 h-3" />Adicionar canal</Button>
      </div>
      <Button className="w-full gap-2" onClick={() => router.push("/torneios/criar/publicar")}>Seguinte <ArrowRight className="w-4 h-4" /></Button>
    </div>
  )
}
