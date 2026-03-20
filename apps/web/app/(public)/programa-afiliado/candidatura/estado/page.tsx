"use client"
import { ApplicationStatusCard, BenefitsList } from "@/components/programs/program-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const BENEFITS = [
  { icon: "💰", label: "Subscrições de canal" },
  { icon: "💛", label: "Salos activados" },
  { icon: "🏪", label: "Loja do canal" },
  { icon: "🏅", label: "Badge de Afiliado" },
  { icon: "📊", label: "Analytics avançados" },
]
export default function EstadoPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-afiliado"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Estado da Candidatura</h1></div>
      <ApplicationStatusCard status="approved" date="20 Março 2026" detail="Todos os critérios cumpridos. Bem-vindo!" />
      <div className="space-y-2"><h2 className="text-sm font-bold">Benefícios desbloqueados 🎉</h2><BenefitsList benefits={BENEFITS} /></div>
      <Link href="/dashboard"><Button className="w-full">Ir para o Dashboard →</Button></Link>
    </div>
  )
}
