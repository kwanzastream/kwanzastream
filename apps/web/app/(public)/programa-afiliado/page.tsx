"use client"
import { ProgramHero, RequirementsChecklist, BenefitsList, type Requirement } from "@/components/programs/program-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const REQS: Requirement[] = [
  { label: "50 seguidores", met: true, current: 67, required: 50 },
  { label: "8 horas transmitidas (últimas 4 semanas)", met: true, current: 12, required: 8 },
  { label: "7 dias de stream (último mês)", met: true, current: 9, required: 7 },
  { label: "Conta activa há 30 dias", met: true, current: 45, required: 30 },
  { label: "Sem violações nos últimos 30 dias", met: true, current: 0, required: 0 },
]

const BENEFITS = [
  { icon: "💰", label: "Subscrições de canal", desc: "3 tiers de subscrição" },
  { icon: "💛", label: "Salos activados", desc: "Receber doações de viewers" },
  { icon: "🏪", label: "Loja do canal", desc: "Vender produtos e experiências" },
  { icon: "🏅", label: "Badge de Afiliado", desc: "No perfil e no chat" },
  { icon: "📊", label: "Analytics avançados", desc: "Dashboard detalhado" },
  { icon: "🏆", label: "Criar torneios", desc: "Até 32 participantes" },
  { icon: "📅", label: "Criar eventos", desc: "Streams especiais" },
]

export default function ProgramaAfiliadoPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <ProgramHero badge="🏅" title="Programa Afiliado" desc="O primeiro passo para monetizar o teu canal na Kwanza Stream." level="Nível 1" />
      <div className="space-y-2"><h2 className="text-sm font-bold">Requisitos</h2><RequirementsChecklist requirements={REQS} /></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Benefícios</h2><BenefitsList benefits={BENEFITS} /></div>
      <div className="flex gap-3"><Link href="/programa-afiliado/candidatura" className="flex-1"><Button className="w-full h-12 font-bold">Candidatar-me</Button></Link><Link href="/programa-afiliado/requisitos"><Button variant="outline" className="text-xs">Requisitos detalhados →</Button></Link></div>
    </div>
  )
}
