"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"
import Link from "next/link"

export default function TorneioCriarPremiosPage() {
  const router = useRouter()
  const [prizes, setPrizes] = useState([{ position: "1º Lugar", amount: "" }])
  const addPrize = () => setPrizes([...prizes, { position: `${prizes.length + 1}º Lugar`, amount: "" }])
  const updatePrize = (i: number, field: string, v: string) => { const p = [...prizes]; (p[i] as any)[field] = v; setPrizes(p) }
  const removePrize = (i: number) => setPrizes(prizes.filter((_, j) => j !== i))

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/torneios/criar/regras"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">4/7 — Prémios</h1></div>
      <div className="space-y-3">
        {prizes.map((p, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input value={p.position} onChange={e => updatePrize(i, "position", e.target.value)} className="flex-1 h-9 bg-white/5" placeholder="Posição" />
            <Input value={p.amount} onChange={e => updatePrize(i, "amount", e.target.value)} className="w-32 h-9 bg-white/5" placeholder="Valor (Kz)" />
            {prizes.length > 1 && <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => removePrize(i)}><X className="w-3 h-3" /></Button>}
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={addPrize}><Plus className="w-3 h-3" />Adicionar prémio</Button>
      <Button className="w-full gap-2" onClick={() => router.push("/torneios/criar/inscricoes")}>Seguinte <ArrowRight className="w-4 h-4" /></Button>
    </div>
  )
}
