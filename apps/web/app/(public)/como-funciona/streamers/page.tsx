import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Como Funciona para Streamers — Kwanza Stream", description: "Aprende a transmitir ao vivo no Kwanza Stream. Do telemóvel ou OBS, é simples." }

const STEPS = [
  { step: "1", emoji: "👤", title: "Cria conta e activa o canal", desc: "Regista-te, escolhe o teu username e personaliza o teu canal. Adiciona avatar, bio e categoria principal." },
  { step: "2", emoji: "⚙️", title: "Configura OBS ou transmite pelo telemóvel", desc: "Usa OBS Studio (desktop) ou a app Kwanza Stream (mobile) para transmitir. Recebe a tua chave de stream no dashboard e configura em minutos." },
  { step: "3", emoji: "🔴", title: "Faz a tua primeira live", desc: "Define um título atractivo, escolhe a categoria, e clica em «Ir ao vivo». O teu stream aparece automaticamente para todos os visitantes." },
  { step: "4", emoji: "👥", title: "Constrói comunidade", desc: "Interage com o chat, agradece os Salos recebidos, cria clips dos melhores momentos e partilha no WhatsApp." },
  { step: "5", emoji: "💰", title: "Candidata-te ao Programa Afiliado e monetiza", desc: "Com mais de 50 seguidores e 7 dias de streams, podes candidatar-te ao programa. Começa a receber Salos e subscrições." },
]

export default function StreamersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Para Streamers</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Como funciona para Streamers 📡</h1>
      <p className="text-muted-foreground mb-10">5 passos para começares a transmitir e ganhar no Kwanza Stream.</p>

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
        <h3 className="font-bold text-lg mb-2">Começa a transmitir hoje 🇦🇴</h3>
        <p className="text-sm text-muted-foreground mb-4">É grátis. Sem equipamento caro. Do teu telemóvel para o mundo.</p>
        <Link href="/registar"><Button className="gap-2">Criar canal grátis <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
