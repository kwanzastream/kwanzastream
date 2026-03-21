"use client"

import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { AudienceTargetingCard } from "@/components/ads/audience-targeting-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ChevronLeft, MapPin, Tag, Heart } from "lucide-react"

export default function AudienciaPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={2} />
      <Link href="/ads/criar-campanha/objetivo" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Objectivo</Link>
      <h1 className="text-xl font-bold">Define a tua audiência</h1>

      <AudienceTargetingCard totalReach={45000} provinces={[]} categories={[]} interests={[]} />

      <div className="space-y-3">
        {[
          { icon: MapPin, title: "Por Província", desc: "Targeting geográfico nas 21 províncias", href: "/ads/criar-campanha/audiencia/provincia" },
          { icon: Tag, title: "Por Categoria", desc: "Gaming, Música, Futebol...", href: "/ads/criar-campanha/audiencia/categoria" },
          { icon: Heart, title: "Por Interesses", desc: "Tecnologia, Empreendedorismo...", href: "/ads/criar-campanha/audiencia/interesses" },
        ].map((f, i) => (
          <Link key={i} href={f.href} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <f.icon className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1"><p className="text-sm font-semibold">{f.title}</p><p className="text-xs text-muted-foreground">{f.desc}</p></div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Link href="/ads/criar-campanha/criativo"><Button className="w-full gap-1.5">Seguinte <ArrowRight className="w-3 h-3" /></Button></Link>
    </div>
  )
}
