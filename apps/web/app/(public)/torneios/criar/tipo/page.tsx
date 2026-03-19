"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

const FORMATS = [
  { id: "single", title: "Eliminação Simples", desc: "Perdes 1 jogo = fora. O formato mais rápido." },
  { id: "double", title: "Eliminação Dupla", desc: "2 derrotas para sair. Mais justo, mais longo." },
  { id: "round-robin", title: "Round Robin", desc: "Todos jogam contra todos. Ideal para grupos pequenos." },
  { id: "swiss", title: "Sistema Suíço", desc: "Emparelhamento por ranking. Eficiente para muitos participantes." },
]

export default function TorneioCriarTipoPage() {
  const router = useRouter()
  const [selected, setSelected] = useState("")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/torneios/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">1/7 — Formato</h1></div>
      <div className="space-y-3">
        {FORMATS.map(f => (
          <button key={f.id} onClick={() => setSelected(f.id)} className={`w-full text-left p-4 rounded-xl border transition-all ${selected === f.id ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"}`}>
            <p className="text-sm font-bold">{f.title}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{f.desc}</p>
          </button>
        ))}
      </div>
      <Button className="w-full gap-2" disabled={!selected} onClick={() => router.push("/torneios/criar/detalhes")}>Seguinte <ArrowRight className="w-4 h-4" /></Button>
    </div>
  )
}
