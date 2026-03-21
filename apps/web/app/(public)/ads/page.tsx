"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Megaphone, Users, Smartphone, Globe, ArrowRight, Gift, Target, Tv } from "lucide-react"

export default function AdsLandingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center space-y-4">
        <Megaphone className="w-12 h-12 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Publicita no Kwanza Stream</h1>
        <p className="text-lg text-muted-foreground">Alcança a audiência jovem angolana</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ icon: Users, value: "50.000+", label: "Utilizadores" }, { icon: Tv, value: "1.000+", label: "Streams/mês" },
          { icon: Smartphone, value: "68%", label: "Mobile" }, { icon: Globe, value: "78%", label: "Audiência AO" }].map((s, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-2" /><p className="text-xl font-bold">{s.value}</p><p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">85% entre 18–34 anos · Engagement rate 3× superior à média</p>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-center">Formatos disponíveis</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[{ icon: Gift, title: "Drops", desc: "Recompensas para viewers" }, { icon: Target, title: "Reward Campaigns", desc: "Engagement premium" },
            { icon: Megaphone, title: "Ads (Banner)", desc: "Impressões e cliques" }, { icon: Users, title: "Managed", desc: "Estratégia personalizada" }].map((f, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all text-center space-y-1">
              <f.icon className="w-5 h-5 text-primary mx-auto" /><p className="text-sm font-semibold">{f.title}</p><p className="text-[10px] text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link href="/ads/criar-campanha"><Button className="gap-1.5">Criar campanha <ArrowRight className="w-3 h-3" /></Button></Link>
        <Link href="/ads/para-marcas/managed"><Button variant="outline">Falar com a equipa</Button></Link>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link href="/ads/para-marcas" className="hover:text-foreground">Para marcas</Link>
        <Link href="/ads/politicas" className="hover:text-foreground">Políticas</Link>
        <Link href="/ads/especificacoes" className="hover:text-foreground">Especificações</Link>
        <Link href="/ads/casos-sucesso" className="hover:text-foreground">Casos de sucesso</Link>
      </div>
    </div>
  )
}
