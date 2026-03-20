"use client"
import { ProgramHero, RequirementsChecklist, BenefitsList, type Requirement } from "@/components/programs/program-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const REQS: Requirement[] = [
  { label: "500 seguidores", met: false, current: 67, required: 500 },
  { label: "25 viewers médios (30 dias)", met: false, current: 8, required: 25 },
  { label: "25 horas transmitidas (4 semanas)", met: true, current: 28, required: 25 },
  { label: "12 dias de stream (4 semanas)", met: false, current: 9, required: 12 },
  { label: "Conta activa há 90 dias", met: true, current: 95, required: 90 },
  { label: "Ser Afiliado", met: true, current: 1, required: 1 },
]

const BENEFITS = [
  { icon: "⭐", label: "Badge Partner verificada" },
  { icon: "📺", label: "Revenue share de ads" },
  { icon: "🎯", label: "Prioridade no suporte" },
  { icon: "🤝", label: "Drops com marcas angolanas" },
  { icon: "🎬", label: "Co-streaming facilitado" },
  { icon: "🎪", label: "Convites para eventos" },
  { icon: "✅", label: "Página verificada" },
]

export default function ProgramaPartnerPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <ProgramHero badge="⭐" title="Programa Partner" desc="O nível mais alto para criadores na Kwanza Stream. Benefícios exclusivos e revenue share." level="Nível 2" />
      <div className="space-y-2"><h2 className="text-sm font-bold">Requisitos</h2><RequirementsChecklist requirements={REQS} /></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Benefícios adicionais vs Afiliado</h2><BenefitsList benefits={BENEFITS} /></div>
      <div className="flex gap-3"><Link href="/programa-partner/candidatura" className="flex-1"><Button className="w-full h-12 font-bold">Candidatar-me</Button></Link><Link href="/programa-partner/requisitos"><Button variant="outline" className="text-xs">Requisitos →</Button></Link></div>
    </div>
  )
}
