"use client"
import { OfferCard } from "@/components/membership/membership-components"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
export default function OfertasPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎁 Ofertas</h1>
      <Link href="/dashboard/membership/ofertas/criar"><Button size="sm" className="w-full text-xs gap-1"><Plus className="w-3 h-3" />Criar oferta</Button></Link>
      <p className="text-[10px] font-bold">Activas</p>
      <Link href="/dashboard/membership/ofertas/1"><OfferCard title="1 Mês Tier 1 por 250 Kz" discount="50% desconto" validUntil="30 Abr" uses={34} maxUses={100} /></Link>
      <p className="text-[10px] font-bold text-muted-foreground">Expiradas</p>
      <div className="opacity-50"><OfferCard title="Trial 7 dias gratuito" discount="Grátis" validUntil="28 Fev" uses={89} maxUses={100} /></div>
    </div>
  )
}
