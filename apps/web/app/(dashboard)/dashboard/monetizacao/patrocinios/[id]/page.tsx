"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PatrocinioDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/patrocinios"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Patrocínio — TAAG</h1></div>
      <div className="space-y-1">{[{l:"Marca",v:"TAAG — Linhas Aéreas de Angola"},{l:"Valor proposto",v:"50.000 Kz/mês"},{l:"Duração",v:"3 meses"},{l:"Estado",v:"⏳ Pendente"},{l:"Obrigações",v:"2 menções por stream, banner no perfil"},{l:"Início proposto",v:"1 Abr 2026"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
    </div>
  )
}
