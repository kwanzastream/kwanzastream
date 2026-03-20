"use client"
import { BenefitsList } from "@/components/programs/program-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const AFFILIATE = [
  { icon: "💰", label: "Subscrições", desc: "✓ Afiliado ✓ Partner" },
  { icon: "💛", label: "Salos", desc: "✓ Afiliado ✓ Partner" },
  { icon: "🏪", label: "Loja do canal", desc: "✓ Afiliado ✓ Partner" },
]
const PARTNER_ONLY = [
  { icon: "⭐", label: "Badge Partner verificada", desc: "Só Partner" },
  { icon: "📺", label: "Revenue share de ads", desc: "Receita de anúncios" },
  { icon: "🎯", label: "Prioridade no suporte", desc: "Resposta em < 24h" },
  { icon: "🤝", label: "Drops com marcas angolanas", desc: "Parcerias exclusivas" },
  { icon: "🎬", label: "Co-streaming facilitado", desc: "Até 4 streamers" },
  { icon: "🎪", label: "Convites para eventos", desc: "Eventos oficiais da plataforma" },
  { icon: "✅", label: "Página verificada", desc: "Selo de verificação no perfil" },
]
export default function BeneficiosPartnerPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/programa-partner"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Benefícios Partner</h1></div>
      <h2 className="text-xs font-bold text-muted-foreground">Tudo do Afiliado +</h2>
      <BenefitsList benefits={AFFILIATE} />
      <h2 className="text-xs font-bold text-primary">Exclusivos Partner</h2>
      <BenefitsList benefits={PARTNER_ONLY} />
    </div>
  )
}
