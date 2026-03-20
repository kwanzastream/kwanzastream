"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CampanhaDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/campanhas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Campanha — Unitel</h1></div>
      <div className="grid grid-cols-2 gap-3">{[{l:"Marca",v:"Unitel"},{l:"Receita estimada",v:"15.000 Kz"},{l:"Período",v:"1-31 Mar 2026"},{l:"Participantes",v:"120 viewers"},{l:"Obrigações",v:"1 menção/stream"},{l:"Estado",v:"🟢 Activa"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
    </div>
  )
}
