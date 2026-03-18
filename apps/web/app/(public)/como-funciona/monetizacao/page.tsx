import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Monetização — Kwanza Stream", description: "Descobre todas as formas de ganhar dinheiro como criador no Kwanza Stream." }

const REVENUE_SOURCES = [
  { emoji: "🎁", title: "Salos (doações em tempo real)", desc: "Os espectadores compram Salos e enviam-te durante o stream. Recebes 80% do valor. Exemplo: 1.000 Salos (850 Kz compra) = 680 Kz para ti.", href: "/como-funciona/salos" },
  { emoji: "⭐", title: "Subscrições de canal (Tiers 1–3)", desc: "Os fãs subscrevem o teu canal mensalmente. 3 tiers de preço com benefícios crescentes. Recebes 70% de cada subscrição.", href: "/como-funciona/subscricoes" },
  { emoji: "🎯", title: "Drops com marcas angolanas", desc: "Parceria com marcas como Unitel, BAI, Jumia. Campanhas de reward onde os teus viewers ganham prémios por assistirem ao teu conteúdo." },
  { emoji: "🛍️", title: "Loja do canal", desc: "Vende merch digital ou físico directamente no teu canal. T-shirts, stickers, emotes premium — tudo integrado." },
  { emoji: "🤝", title: "Programa Afiliado / Partner", desc: "Afiliados recebem 60% dos Salos. Partners recebem 80% + ferramentas de analytics avançadas + suporte prioritário + badge verificado." },
]

export default function MonetizacaoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Monetização</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Como funciona a Monetização 💰</h1>
      <p className="text-muted-foreground mb-10">Todas as formas de ganhar como criador no Kwanza Stream. Tudo em Kwanzas.</p>

      <div className="space-y-6">
        {REVENUE_SOURCES.map((source) => (
          <div key={source.title} className="p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{source.emoji}</span>
              <h3 className="font-bold">{source.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{source.desc}</p>
            {source.href && (
              <Link href={source.href} className="text-xs text-primary mt-2 inline-block hover:underline">Saber mais →</Link>
            )}
          </div>
        ))}
      </div>

      {/* Revenue split transparency */}
      <div className="mt-10 p-6 rounded-xl bg-[var(--surface-1)] border border-border/50">
        <h3 className="font-bold mb-4">Divisão de receita transparente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Salos", creator: "80%", platform: "20%" },
            { label: "Subscrições", creator: "70%", platform: "30%" },
            { label: "Drops", creator: "Variável", platform: "Acordo" },
          ].map((r) => (
            <div key={r.label} className="text-center p-3 rounded-lg bg-card border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
              <p className="text-lg font-bold text-primary">{r.creator}</p>
              <p className="text-[10px] text-muted-foreground">Criador</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
