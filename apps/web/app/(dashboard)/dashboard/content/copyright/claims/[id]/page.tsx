"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Flag, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ClaimDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/copyright/claims"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Detalhe do Claim</h1></div>
      <div className="space-y-3 p-4 rounded-xl border border-white/10">
        <div className="flex items-center justify-between"><p className="text-xs font-bold">Claim #{id}</p><span className="px-2 py-0.5 rounded-full text-[8px] font-bold text-green-400 bg-green-500/10">Resolvido</span></div>
        {[{l:"Conteúdo",v:"VOD: Kuduro DJ Set — 01:23:45"},{l:"Reclamante",v:"Universal Music Group"},{l:"Tipo",v:"Monetização bloqueada"},{l:"Data",v:"10 Mar 2026"},{l:"Resolução",v:"Música removida do VOD"}].map(m => <div key={m.l}><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs">{m.v}</p></div>)}
      </div>
      <div className="space-y-1">
        <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => toast.info("Formulário de contestação aberto")}><Flag className="w-3 h-3" />Contestar claim</Button>
        <Button variant="outline" size="sm" className="w-full text-xs gap-1"><MessageSquare className="w-3 h-3" />Contactar suporte</Button>
      </div>
    </div>
  )
}
