"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ContratoVersaoPage() {
  const { versao } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-partner/contrato"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5" />Contrato Partner — {versao}</h1></div>
      <div className="p-4 rounded-xl border border-white/10 space-y-3 text-xs text-muted-foreground"><p className="font-bold text-foreground">CONTRATO DE PARCERIA KWANZA STREAM</p><p>Versão: {versao} · Data: 1 Janeiro 2026</p><p>Este contrato estabelece os termos e condições do Programa Partner da Kwanza Stream entre a plataforma e o criador de conteúdo.</p><p className="font-bold text-foreground">1. DEFINIÇÕES</p><p>1.1 &quot;Partner&quot; refere-se ao criador de conteúdo aceite no Programa Partner.</p><p>1.2 &quot;Plataforma&quot; refere-se à Kwanza Stream, operada por [Entidade Legal].</p><p className="font-bold text-foreground">2. OBRIGAÇÕES DO PARTNER</p><p>2.1 Transmitir no mínimo 8 sessões por mês.</p><p>2.2 Cumprir as Directrizes de Conteúdo da plataforma.</p><p className="font-bold text-foreground">3. REMUNERAÇÃO</p><p>3.1 Revenue share de 70% (Partner) / 30% (Plataforma) sobre receitas de publicidade.</p></div>
      <Button variant="outline" className="w-full gap-1 text-xs"><Download className="w-3 h-3" />Descarregar PDF</Button>
    </div>
  )
}
