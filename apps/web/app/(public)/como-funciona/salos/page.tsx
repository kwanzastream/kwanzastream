import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "O que são Salos — Kwanza Stream", description: "A moeda virtual do Kwanza Stream. Tabela de preços, como comprar e como enviar durante streams." }

const SALO_PRICES = [
  { salos: 50, price: 50, popular: false },
  { salos: 200, price: 180, popular: false },
  { salos: 500, price: 430, popular: true },
  { salos: 1000, price: 850, popular: false },
  { salos: 2500, price: 2000, popular: false },
  { salos: 5000, price: 3900, popular: true },
  { salos: 10000, price: 7500, popular: false },
]

const FAQ = [
  { q: "O que são Salos?", a: "Salos são a moeda virtual do Kwanza Stream. Compra-os com kwanzas e envia-os aos teus criadores favoritos durante streams ao vivo." },
  { q: "Como compro Salos?", a: "Via Multicaixa Express, e-Kwanza ou Unitel Money. Vai à carteira, selecciona o pacote e paga com o teu método preferido." },
  { q: "Como envio Salos durante um stream?", a: "No chat do stream, clica no ícone de Salo, escolhe a quantidade e envia. O criador recebe uma alerta de doação ao vivo!" },
  { q: "Quanto recebe o criador?", a: "O criador recebe 80% do valor do Salo. Os restantes 20% vão para a plataforma para manutenção e desenvolvimento." },
  { q: "Posso trocar Salos por dinheiro?", a: "Enquanto espectador, não. Os Salos são moeda virtual de apoio. Os criadores é que podem converter os seus Salos recebidos em kwanzas e sacar." },
]

export default function SalosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Salos</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">O que são Salos 🎁</h1>
      <p className="text-muted-foreground mb-10">A moeda virtual da plataforma. Compra, envia e apoia criadores angolanos directamente em kwanzas.</p>

      {/* Price table */}
      <div className="mb-10">
        <h2 className="font-bold text-lg mb-4">Tabela de preços</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SALO_PRICES.map((p) => (
            <div key={p.salos} className={`relative p-4 rounded-xl border text-center ${p.popular ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border/50 bg-card"}`}>
              {p.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px]">POPULAR</Badge>}
              <p className="text-2xl font-bold">{p.salos.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Salos</p>
              <p className="text-lg font-bold text-primary mt-2">{p.price.toLocaleString()} Kz</p>
              {p.salos > 50 && (
                <p className="text-[10px] text-[var(--success)] mt-1">
                  -{Math.round((1 - p.price / p.salos) * 100)}% desconto
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="mb-10 p-5 rounded-xl bg-[var(--surface-1)] border border-border/50">
        <h2 className="font-bold text-lg mb-3">Como comprar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Multicaixa Express", emoji: "💳", desc: "Referência e entidade. Confirma no teu Multicaixa Express." },
            { name: "e-Kwanza", emoji: "📱", desc: "Pagamento instantâneo via app e-Kwanza." },
            { name: "Unitel Money", emoji: "📲", desc: "Paga com o teu saldo Unitel Money via USSD." },
          ].map((m) => (
            <div key={m.name} className="p-3 rounded-lg bg-card border border-border/50 text-center">
              <span className="text-2xl block mb-2">{m.emoji}</span>
              <p className="font-medium text-sm">{m.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creator share */}
      <div className="mb-10 p-5 rounded-xl border border-primary/20 bg-primary/5">
        <h2 className="font-bold text-lg mb-2">Quanto recebe o criador?</h2>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">80%</p>
            <p className="text-xs text-muted-foreground">Criador</p>
          </div>
          <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-4/5 bg-primary rounded-full" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-muted-foreground">20%</p>
            <p className="text-xs text-muted-foreground">Plataforma</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Perguntas frequentes</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <div key={item.q} className="p-4 rounded-xl border border-border/50 bg-card">
              <p className="font-medium text-sm mb-1">{item.q}</p>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
