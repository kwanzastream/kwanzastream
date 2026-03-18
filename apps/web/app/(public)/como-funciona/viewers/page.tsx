import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Como Funciona para Viewers — Kwanza Stream", description: "Aprende a usar o Kwanza Stream como espectador. Cria conta, segue criadores e interage." }

const STEPS = [
  { step: "1", emoji: "👤", title: "Cria conta (gratuito)", desc: "Regista-te com o teu número angolano (+244). Recebes um SMS com código OTP. Confirmas e estás dentro em 30 segundos." },
  { step: "2", emoji: "❤️", title: "Segue criadores que gostas", desc: "Explora categorias angolanas — Gaming, Kuduro, Girabola, IRL Angola. Segue os canais que te interessam para receber notificações quando vão ao vivo." },
  { step: "3", emoji: "📺", title: "Assiste ao vivo ou em gravação", desc: "Vê streams ao vivo em tempo real ou acede a VODs (vídeos gravados) quando quiseres. A qualidade adapta-se automaticamente à tua ligação." },
  { step: "4", emoji: "💬", title: "Interage no chat, envia Salos, subscreve", desc: "Participa no chat em tempo real. Envia Salos (moeda virtual) para apoiar os teus criadores favoritos. Subscreve canais para benefícios exclusivos — badges, emotes e cor no chat." },
]

export default function ViewersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Para Viewers</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Como funciona para Viewers 👀</h1>
      <p className="text-muted-foreground mb-10">4 passos simples para começares a assistir ao melhor conteúdo angolano.</p>

      <div className="space-y-8">
        {STEPS.map((s) => (
          <div key={s.step} className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-2xl">{s.emoji}</div>
            <div>
              <h3 className="font-bold text-lg mb-1">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl border border-primary/20 bg-primary/5 text-center">
        <h3 className="font-bold text-lg mb-2">Pronto para começar? 🇦🇴</h3>
        <p className="text-sm text-muted-foreground mb-4">Criar conta demora menos de 1 minuto.</p>
        <Link href="/registar"><Button className="gap-2">Criar conta grátis <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
