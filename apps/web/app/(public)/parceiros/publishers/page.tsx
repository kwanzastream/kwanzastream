import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Para Publishers — Kwanza Stream" }
export default function ParceirosPublishersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/parceiros" className="hover:text-foreground">Parceiros</Link>
        <span>/</span><span className="text-foreground">Publishers</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Para Publishers 🎮</h1>
      <p className="text-muted-foreground mb-10">Lança jogos, eventos e torneios na comunidade gaming angolana.</p>
      <div className="space-y-4 mb-10">
        {[
          { emoji: "🎮", title: "Lançamentos de jogos", desc: "Organiza events de lançamento com streamers angolanos. First-play, reviews e gameplay ao vivo." },
          { emoji: "🏆", title: "Torneios patrocinados", desc: "Cria torneios competitivos na plataforma com prémios em kwanzas." },
          { emoji: "🎁", title: "Drops de items", desc: "Distribui items, skins e códigos de jogo aos viewers durante streams." },
          { emoji: "📈", title: "Analytics", desc: "Vê quantos jogadores angolanos interagem com o teu conteúdo." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card">
            <span className="text-2xl shrink-0">{item.emoji}</span>
            <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-xl border border-primary/20 bg-[var(--surface-1)] text-center">
        <h3 className="font-bold text-lg mb-2">Queres lançar na plataforma?</h3>
        <Link href="/contacto"><Button className="gap-2">Contactar<ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
