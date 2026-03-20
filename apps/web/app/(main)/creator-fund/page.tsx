"use client"
import { ProgramHero, BenefitsList } from "@/components/programs/program-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const BENEFITS = [
  { icon: "💰", label: "Subsídio mensal", desc: "Valor varia por ciclo (trimestral)" },
  { icon: "🎓", label: "Mentoria", desc: "Streamer experiente como mentor" },
  { icon: "🚀", label: "Acesso antecipado", desc: "Testar funcionalidades antes do lançamento" },
  { icon: "⭐", label: "Destaque na plataforma", desc: "Promoção na homepage e redes sociais" },
]

export default function CreatorFundPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <ProgramHero badge="🇦🇴" title="Creator Fund" desc="Angola-First. Subsídio mensal para apoiar criadores angolanos emergentes." level="Fundo de Criadores" />
      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center space-y-1"><p className="text-xs font-bold text-green-400">Próximo ciclo de candidaturas</p><p className="text-lg font-black">Abril 2026</p><p className="text-[9px] text-muted-foreground">Ciclos trimestrais · Jan · Abr · Jul · Out</p></div>
      <div className="space-y-3"><h2 className="text-sm font-bold">Quem pode candidatar</h2><ul className="text-xs text-muted-foreground space-y-1 pl-4"><li className="list-disc">Afiliados (não precisa de ser Partner)</li><li className="list-disc">Conta angolana verificada (KYC)</li><li className="list-disc">Mínimo 3 meses de actividade</li><li className="list-disc">Conteúdo em PT-AO ou língua angolana</li><li className="list-disc">Foco em categorias Angola-First</li></ul></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Benefícios</h2><BenefitsList benefits={BENEFITS} /></div>
      <div className="flex gap-3"><Link href="/creator-fund/candidatura" className="flex-1"><Button className="w-full h-12 font-bold">Candidatar-me</Button></Link><Link href="/creator-fund/como-funciona"><Button variant="outline" className="text-xs">Como funciona →</Button></Link></div>
    </div>
  )
}
