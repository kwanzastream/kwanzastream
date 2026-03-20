"use client"
import { ArrowLeft, Clock, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function LevantarStatusPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/saldo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Estado do Levantamento</h1></div>
      <div className="p-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 text-center space-y-3"><Clock className="w-10 h-10 text-yellow-400 mx-auto" /><Badge className="bg-yellow-500/10 text-yellow-400">Pendente</Badge><p className="text-sm font-bold">5.000 Kz — Multicaixa Express</p><p className="text-[10px] text-muted-foreground">Submetido há 2 minutos · Prazo: 1–3 dias úteis</p></div>
      <div className="space-y-1 text-[10px] text-muted-foreground"><p><span className="font-bold">Pendente:</span> O pedido foi recebido</p><p><span className="font-bold">Em processamento:</span> A processar pagamento</p><p><span className="font-bold">Concluído:</span> Valor transferido para a conta</p></div>
      <Link href="/suporte" className="block"><Button variant="outline" className="w-full gap-1 text-xs"><MessageCircle className="w-3 h-3" />Contactar suporte</Button></Link>
    </div>
  )
}
