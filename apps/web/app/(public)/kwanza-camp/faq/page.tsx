"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQ = [
  { cat: "Geral", qs: [
    { q: "O Kwanza Camp é gratuito?", a: "Sim, completamente gratuito para todos os criadores registados." },
    { q: "Preciso de completar os níveis em ordem?", a: "Sim, módulos e níveis desbloqueiam sequencialmente." },
    { q: "Quanto tempo demora?", a: "Cada nível tem ~12 capítulos de 5-10 min. Sem prazo." },
    { q: "Os certificados são reconhecidos?", a: "Digitais e partilháveis na comunidade Kwanza Stream e LinkedIn." },
  ]},
  { cat: "Técnico", qs: [
    { q: "Preciso de equipamento profissional?", a: "Não! O Nível 1 ensina a transmitir só com telemóvel." },
    { q: "Velocidade mínima de internet?", a: "Vídeo: 3 Mbps upload. Rádio: 500 kbps." },
    { q: "Posso usar dados móveis?", a: "Sim! Temos capítulo sobre economizar dados." },
  ]},
  { cat: "Monetização", qs: [
    { q: "Quando posso ganhar?", a: "Podes activar Salos com conta verificada. Módulo no Nível 2." },
    { q: "Como recebo pagamentos?", a: "Multicaixa Express, transferência bancária, ou carteira digital." },
  ]},
  { cat: "Programas", qs: [
    { q: "O que é o Programa Afiliado?", a: "Ganhar com subscrições e Salos. 50+ seguidores + 7h stream/mês." },
    { q: "O que é o Programa Partner?", a: "Nível mais alto: revenue share maior, suporte dedicado." },
  ]},
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Perguntas Frequentes</h1>
      {FAQ.map(c => (
        <div key={c.cat} className="space-y-2">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">{c.cat}</h2>
          {c.qs.map((f, i) => {
            const k = `${c.cat}-${i}`
            return (
              <button key={k} onClick={() => setOpen(open === k ? null : k)}
                className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{f.q}</p>
                  {open === k ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </div>
                {open === k && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.a}</p>}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
