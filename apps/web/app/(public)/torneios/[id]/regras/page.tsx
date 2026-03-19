"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TorneioRegrasPage() {
  const { id } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><FileText className="w-5 h-5" />Regras do Torneio</h1></div>
      <div className="prose prose-invert prose-sm max-w-none space-y-4">
        <h3>1. Formato</h3>
        <p>Eliminação simples (Single Elimination). Cada jogo é best-of-3. Final é best-of-5.</p>
        <h3>2. Regras de Jogo</h3>
        <ul><li>Duração do jogo: 6 minutos por período</li><li>Equipas: aleatórias (sem selecção de plantel)</li><li>Dificuldade: Lendário</li><li>Assistência: Sem (manual)</li></ul>
        <h3>3. Código de Conduta</h3>
        <ul><li>Respeito por todos os participantes</li><li>Proibido linguagem ofensiva no chat</li><li>Trolling = desqualificação imediata</li></ul>
        <h3>4. Penalizações</h3>
        <ul><li>Atraso &gt; 10 min = derrota por WO</li><li>Desconexão: 5 min para reconectar</li><li>Trapaça: banimento permanente</li></ul>
        <h3>5. Resolução de Disputas</h3>
        <p>Decisão do árbitro (@esports_ao) é final. Contestações via DM até 1 hora após o jogo.</p>
      </div>
    </div>
  )
}
