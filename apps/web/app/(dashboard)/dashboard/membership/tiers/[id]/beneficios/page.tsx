"use client"
import { useParams } from "next/navigation"
import { BenefitToggleRow } from "@/components/membership/membership-components"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function BeneficiosPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/membership/tiers/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Benefícios — Tier {id}</h1></div>
      <p className="text-[10px] font-bold text-muted-foreground">Automáticos (sempre activos)</p>
      {[{l:"Badge de subscritor",d:"Personalizado no Grupo 28"},{l:"Emote do canal",d:"Configurado no Grupo 28"},{l:"Sem anúncios",d:"O membro não vê ads"}].map(b => <BenefitToggleRow key={b.l} label={b.l} desc={b.d} active />)}
      <p className="text-[10px] font-bold">Configuráveis</p>
      {[{l:"Cor de nome no chat",d:"Cor personalizada no chat"},{l:"VODs exclusivos",d:"Acesso a VODs marcados como exclusivos"},{l:"Streams privados",d:"Só membros deste tier podem assistir"},{l:"Acesso antecipado",d:"Ver streams antes do público"},{l:"Discord role",d:"Atribuir role automaticamente"}].map(b => <BenefitToggleRow key={b.l} label={b.l} desc={b.d} active={b.l === "VODs exclusivos"} />)}
      <Link href={`/dashboard/membership/tiers/${id}/beneficios/adicionar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Plus className="w-3 h-3" />Adicionar benefício</Button></Link>
    </div>
  )
}
