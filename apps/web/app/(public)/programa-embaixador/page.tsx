"use client"
import { ProgramHero, BenefitsList } from "@/components/programs/program-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const BENEFITS = [
  { icon: "👑", label: "Badge de Embaixador", desc: "O mais alto reconhecimento na plataforma" },
  { icon: "📢", label: "Voz na direcção da plataforma", desc: "Feedback directo à equipa" },
  { icon: "🎪", label: "Presença em eventos", desc: "Orador em eventos oficiais" },
  { icon: "💎", label: "Revenue share premium", desc: "Melhores condições financeiras" },
  { icon: "🎓", label: "Mentoria de novos criadores", desc: "Liderança na comunidade" },
]

const AMBASSADORS = [
  { name: "Kuduro Master", username: "kuduro_master", bio: "O rei do kuduro digital" },
  { name: "Esports AO", username: "esports_ao", bio: "Competição gaming Angola" },
]

export default function ProgramaEmbaixadorPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <ProgramHero badge="👑" title="Programa Embaixador" desc="O nível mais exclusivo. Embaixadores representam a essência da Kwanza Stream." level="Nível 3 · Por convite" />
      <div className="space-y-2"><h2 className="text-sm font-bold">Embaixadores actuais</h2><div className="grid grid-cols-2 gap-3">{AMBASSADORS.map(a => <Link key={a.username} href={`/${a.username}`} className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-center space-y-1 hover:border-yellow-500/40 transition-all"><p className="text-2xl">👑</p><p className="text-xs font-bold">{a.name}</p><p className="text-[8px] text-muted-foreground">@{a.username}</p><p className="text-[9px] text-muted-foreground">{a.bio}</p></Link>)}</div></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Benefícios</h2><BenefitsList benefits={BENEFITS} /></div>
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"><p className="text-xs text-muted-foreground">Embaixadores são convidados pela plataforma.</p><p className="text-[10px] text-muted-foreground mt-1">Foca-te em construir uma comunidade excelente.</p></div>
      <Link href="/programa-embaixador/como-funciona"><Button variant="outline" className="w-full text-xs">Como funciona →</Button></Link>
    </div>
  )
}
