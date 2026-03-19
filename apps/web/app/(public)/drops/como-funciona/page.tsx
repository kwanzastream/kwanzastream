"use client"
import { Gift, Eye, Clock, Bell, Check } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Activos", href: "/drops/activos" },
  { id: "historico", label: "Histórico", href: "/drops/historico" },
  { id: "como-funciona", label: "Como funciona", href: "/drops/como-funciona" },
]

export default function DropsComoFuncionaPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Como Funcionam os Drops</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "como-funciona" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ step: "1", icon: Eye, title: "Encontra", desc: "Um stream com Drops activos (badge 🎁)" },
          { step: "2", icon: Clock, title: "Assiste", desc: "Durante o tempo necessário" },
          { step: "3", icon: Bell, title: "Notificação", desc: "Quando completares → Drop ganho!" },
          { step: "4", icon: Check, title: "Resgata", desc: "Resgata o prémio antes de expirar" },
        ].map(s => (
          <div key={s.step} className="p-4 rounded-2xl border border-white/10 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto"><s.icon className="w-5 h-5 text-primary" /></div>
            <p className="text-xs font-bold">{s.step}. {s.title}</p>
            <p className="text-[10px] text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="prose prose-invert prose-sm max-w-none space-y-3">
        <h3>Perguntas Frequentes</h3>
        <details><summary className="text-xs font-bold cursor-pointer">Como sei se um stream tem Drops?</summary><p className="text-xs text-muted-foreground">Streams com Drops activos mostram um badge 🎁 no título e na miniatura.</p></details>
        <details><summary className="text-xs font-bold cursor-pointer">O que acontece se fechar o browser?</summary><p className="text-xs text-muted-foreground">O progresso é guardado. Quando voltares, continua de onde paraste.</p></details>
        <details><summary className="text-xs font-bold cursor-pointer">Posso ganhar vários Drops ao mesmo tempo?</summary><p className="text-xs text-muted-foreground">Sim! Se assistires a uma stream elegível para múltiplos Drops, o progresso conta para todos.</p></details>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h3 className="text-sm font-bold">Marcas Parceiras</h3>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground"><span className="px-3 py-1 rounded-lg bg-white/5">🟡 Unitel</span><span className="px-3 py-1 rounded-lg bg-white/5">🟠 Jumia</span><span className="px-3 py-1 rounded-lg bg-white/5">🔵 BAI</span><span className="px-3 py-1 rounded-lg bg-white/5">🟢 Refriango</span></div>
        <Link href="/parceiros/marcas" className="text-[10px] text-primary hover:underline block">Queres ser marca parceira? →</Link>
      </div>
    </div>
  )
}
