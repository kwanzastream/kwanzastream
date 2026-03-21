"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight, Plus } from "lucide-react"

export default function ConfirmacaoPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
      <h1 className="text-2xl font-bold">Campanha submetida!</h1>
      <p className="text-sm text-muted-foreground">A tua campanha foi submetida com sucesso</p>

      <div className="p-4 rounded-xl border border-white/10 space-y-2 text-left">
        <p className="text-xs font-semibold">Próximos passos:</p>
        {["A nossa equipa revê o criativo (24-48h)", "Recebes email de aprovação/rejeição", "Após aprovação, campanha entra live na data definida"].map((s, i) => (
          <p key={i} className="text-xs text-muted-foreground">{i + 1}. {s}</p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Link href="/ads/gerir"><Button className="w-full gap-1.5">Ver campanha <ArrowRight className="w-3 h-3" /></Button></Link>
        <Link href="/ads/criar-campanha"><Button variant="outline" className="w-full gap-1.5"><Plus className="w-3 h-3" /> Criar nova campanha</Button></Link>
      </div>
    </div>
  )
}
