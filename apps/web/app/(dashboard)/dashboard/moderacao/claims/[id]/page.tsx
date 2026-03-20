"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ClaimDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/claims/pendentes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Claim #{id}</h1></div>
      <div className="space-y-1">{[{l:"Clip",v:"Momento incrível"},{l:"Reclamado por",v:"@utilizador3"},{l:"Motivo",v:"Conteúdo da minha stream usado sem permissão"},{l:"Data do clip",v:"12 Mar 2026"},{l:"Visualizações",v:"234"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <div className="flex gap-2"><Button className="flex-1 gap-1" onClick={() => toast.success("Claim aprovado — clip removido")}><Check className="w-3 h-3" />Aprovar (remover clip)</Button><Button variant="outline" className="flex-1 gap-1" onClick={() => toast.info("Claim rejeitado")}><X className="w-3 h-3" />Rejeitar</Button></div>
    </div>
  )
}
