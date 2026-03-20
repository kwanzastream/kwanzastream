"use client"
import { ArrowLeft, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function DepositarAgentePage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Users className="w-5 h-5" />Agente</h1></div>
      <div className="py-16 text-center space-y-3"><Clock className="w-12 h-12 text-muted-foreground/30 mx-auto" /><h2 className="text-lg font-bold">Em breve</h2><p className="text-xs text-muted-foreground">Rede de agentes autorizados em construção. Disponível em breve nas principais cidades angolanas.</p></div>
    </div>
  )
}
