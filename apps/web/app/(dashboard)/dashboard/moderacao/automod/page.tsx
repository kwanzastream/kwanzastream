"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function AutoModHubPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🤖 AutoMod</h1>
      <div className="grid grid-cols-3 gap-3"><RevenueMetricCard icon="📊" label="Detectadas" value="47" sub="esta semana" /><RevenueMetricCard icon="🔴" label="Bloqueadas" value="12" /><RevenueMetricCard icon="⚠️" label="Falsos positivos" value="2" /></div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs">AutoMod: <strong className="text-green-400">✅ Activo</strong> — Nível 2 (Moderado)</p></div>
      <div className="space-y-1">{[{l:"Nível",d:"Ajustar sensibilidade",h:"/dashboard/moderacao/automod/nivel"},{l:"Palavras banidas",d:"Lista de termos bloqueados",h:"/dashboard/moderacao/automod/palavras-banidas"},{l:"Palavras permitidas",d:"Excepções ao AutoMod",h:"/dashboard/moderacao/automod/palavras-permitidas"},{l:"Links",d:"Controlo de URLs no chat",h:"/dashboard/moderacao/automod/links"},{l:"CAPS",d:"Limite de maiúsculas",h:"/dashboard/moderacao/automod/caps"},{l:"Emotes",d:"Limite de emotes por msg",h:"/dashboard/moderacao/automod/emotes"},{l:"Spam",d:"Detecção de spam e bots",h:"/dashboard/moderacao/automod/spam"},{l:"Símbolos",d:"Limite de caracteres especiais",h:"/dashboard/moderacao/automod/simbolos"}].map(s => <Link key={s.l} href={s.h}><div className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 hover:border-primary/20"><div><p className="text-xs font-bold">{s.l}</p><p className="text-[8px] text-muted-foreground">{s.d}</p></div><span className="text-muted-foreground">→</span></div></Link>)}</div>
    </div>
  )
}
