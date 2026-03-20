"use client"
import { BenefitsList } from "@/components/programs/program-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const BENEFITS = [
  { icon: "💰", label: "Subscrições de canal", desc: "3 tiers: 500, 1.500, 3.000 Kz/mês" },
  { icon: "💛", label: "Salos activados", desc: "Receber doações — 80% para ti" },
  { icon: "🏪", label: "Loja do canal", desc: "Produtos digitais, físicos e experiências" },
  { icon: "🏅", label: "Badge de Afiliado", desc: "Visível no perfil e no chat" },
  { icon: "📊", label: "Analytics avançados", desc: "Dashboard com métricas detalhadas" },
  { icon: "🏆", label: "Criar torneios", desc: "Até 32 participantes" },
  { icon: "📅", label: "Criar eventos", desc: "Streams especiais com página dedicada" },
  { icon: "🎯", label: "Acesso ao Creator Fund", desc: "Candidatura ao fundo de criadores" },
]
export default function BeneficiosPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-afiliado"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Benefícios do Afiliado</h1></div>
      <BenefitsList benefits={BENEFITS} />
    </div>
  )
}
