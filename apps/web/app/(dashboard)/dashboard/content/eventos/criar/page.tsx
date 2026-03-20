"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CriarEventoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/eventos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Evento</h1></div>
      <div className="p-5 rounded-2xl border border-white/10 text-center space-y-3"><p className="text-sm font-bold">Criar eventos completos</p><p className="text-xs text-muted-foreground">Usa o criador de eventos completo para definir regras, inscrições e prémios.</p><Link href="/eventos/criar"><Button>Ir para criador de eventos →</Button></Link></div>
    </div>
  )
}
