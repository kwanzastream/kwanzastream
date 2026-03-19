"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TorneioCriarRegrasPage() {
  const router = useRouter()
  const [rules, setRules] = useState("")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/torneios/criar/detalhes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">3/7 — Regulamento</h1></div>
      <textarea value={rules} onChange={e => setRules(e.target.value)} rows={12} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Escreve o regulamento completo em PT-AO..." />
      <p className="text-[9px] text-muted-foreground">Inclui: formato, regras de jogo, código de conduta, penalizações, resolução de disputas</p>
      <Button className="w-full gap-2" onClick={() => router.push("/torneios/criar/premios")}>Seguinte <ArrowRight className="w-4 h-4" /></Button>
    </div>
  )
}
