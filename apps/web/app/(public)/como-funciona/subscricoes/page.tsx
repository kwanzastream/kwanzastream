import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Subscrições — Kwanza Stream", description: "Como funcionam as subscrições de canal no Kwanza Stream." }

const TIERS = [
  { tier: 1, name: "Tier 1", price: 500, benefits: ["Badge de subscritor", "Emotes exclusivos (5)", "Nome com cor no chat", "Sem anúncios no canal"] },
  { tier: 2, name: "Tier 2", price: 1500, benefits: ["Todos os benefícios do Tier 1", "Emotes exclusivos (15)", "Prioridade no chat", "Sala VIP (se existir)", "Acesso a VODs exclusivos"] },
  { tier: 3, name: "Tier 3", price: 3000, benefits: ["Todos os benefícios do Tier 2", "Emotes exclusivos (30)", "Badge premium dourada", "Menção especial em lives", "Conteúdo exclusivo do criador", "Contacto directo com o criador"] },
]

export default function SubscricoesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Subscrições</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Como funcionam as Subscrições ⭐</h1>
      <p className="text-muted-foreground mb-10">Subscreve os teus canais favoritos. Apoio mensal contínuo com benefícios exclusivos.</p>

      {/* Difference section */}
      <div className="mb-10 p-5 rounded-xl bg-[var(--surface-1)] border border-border/50">
        <h2 className="font-bold mb-3">Subscrição vs Salos — qual é a diferença?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-card border border-border/50">
            <p className="font-medium mb-1">⭐ Subscrição</p>
            <p className="text-muted-foreground">Pagamento mensal automático. Benefícios contínuos (badges, emotes, prioridade). Apoio estável ao criador.</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border/50">
            <p className="font-medium mb-1">🎁 Salos</p>
            <p className="text-muted-foreground">Doação pontual durante streams. Sem compromisso mensal. Ideal para apoios espontâneos e momentos especiais.</p>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <h2 className="font-bold text-lg mb-4">Os 3 Tiers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {TIERS.map((t) => (
          <div key={t.tier} className={`p-5 rounded-xl border ${t.tier === 2 ? "border-primary ring-1 ring-primary/20 bg-primary/5" : "border-border/50 bg-card"}`}>
            <p className="text-xs text-muted-foreground mb-1">{t.name}</p>
            <p className="text-2xl font-bold">{t.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">Kz/mês</span></p>
            <ul className="mt-4 space-y-2">
              {t.benefits.map((b) => (
                <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Renewal & Cancel */}
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-border/50 bg-card">
          <p className="font-medium text-sm mb-1">🔄 Como se renova?</p>
          <p className="text-sm text-muted-foreground">A subscrição renova automaticamente todos os meses. O pagamento é feito pelo mesmo método que usaste na compra inicial.</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card">
          <p className="font-medium text-sm mb-1">❌ Como cancelar?</p>
          <p className="text-sm text-muted-foreground">Vai a Definições → Subscrições → Selecciona o canal → Cancelar. Mantens os benefícios até ao fim do período pago.</p>
        </div>
      </div>
    </div>
  )
}
