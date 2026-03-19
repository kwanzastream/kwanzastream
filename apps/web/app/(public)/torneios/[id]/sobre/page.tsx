"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TorneioSobrePage() {
  const { id } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Info className="w-5 h-5" />Sobre o Torneio</h1></div>
      <div className="prose prose-invert prose-sm max-w-none space-y-4">
        <p>O maior torneio de FIFA 25 de Angola. 32 jogadores, eliminação simples, prémios em dinheiro. Transmissão ao vivo com comentário em PT-AO.</p>
        <h3>Patrocinadores</h3>
        <div className="flex gap-4">{["Unitel", "BAI", "TAAG"].map(s => <div key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">{s}</div>)}</div>
        <h3>Edições Anteriores</h3>
        <p className="text-muted-foreground">Luanda Cup 2025 — Vencedor: @fifa_master_ao</p>
      </div>
    </div>
  )
}
