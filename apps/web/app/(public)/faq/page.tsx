"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

const FAQ_DATA = [
  {
    category: "Geral",
    questions: [
      { q: "O que é o Kwanza Stream?", a: "O Kwanza Stream é a primeira plataforma angolana de streaming ao vivo. Permite a criadores de conteúdo transmitir ao vivo, interagir com o público e monetizar o seu conteúdo — tudo em kwanzas." },
      { q: "Preciso pagar para usar?", a: "Não! Criar conta, assistir a streams e interagir no chat é totalmente grátis. Funcionalidades premium como subscrições e Salos envolvem transações opcionais." },
      { q: "Que tipo de conteúdo posso encontrar?", a: "Gaming, música ao vivo, futebol angolano, IRL, debates (Just Talking), criatividade, negócios e muito mais. Temos categorias específicas para a cultura angolana." },
      { q: "O Kwanza Stream funciona em Angola?", a: "Sim! Foi construído de raiz para o mercado angolano. Funciona em redes 3G, tem modo de baixo consumo de dados e suporta pagamentos locais como Multicaixa Express." },
    ],
  },
  {
    category: "Conta e Registo",
    questions: [
      { q: "Como crio uma conta?", a: "Podes registar-te com o teu número de telefone angolano (+244). Receberás um código OTP por SMS para verificação. Também podes usar email." },
      { q: "Esqueci-me da minha senha. Como recupero?", a: "Vai a /recuperar-senha, introduz o teu email ou telefone e segue as instruções para redefinir a tua senha." },
      { q: "A minha conta foi suspensa. O que faço?", a: "Contacta o suporte em suporte@kwanzastream.ao com o teu username. A equipa irá rever o teu caso e responder em até 48 horas." },
    ],
  },
  {
    category: "Streaming",
    questions: [
      { q: "Como começo a transmitir?", a: "Cria uma conta, vai ao teu Dashboard e clica em 'Ir ao Vivo'. Podes transmitir directamente do browser, do telemóvel ou usando software como OBS Studio." },
      { q: "Que software posso usar para transmitir?", a: "Qualquer software compatível com RTMP: OBS Studio, Streamlabs, XSplit, ou directamente do browser. No telemóvel, a app do Kwanza Stream (em breve) também permite transmissão." },
      { q: "O que é o Modo Rádio?", a: "É um modo de streaming apenas com áudio. Ideal para DJs, músicos e podcasters. Consome até 10x menos dados que vídeo." },
      { q: "Qual a qualidade máxima de stream?", a: "Suportamos até 1080p a 60fps. Recomendamos 720p para uma experiência óptima nas redes angolanas." },
    ],
  },
  {
    category: "Monetização",
    questions: [
      { q: "O que são Salos?", a: "Salos são a moeda virtual do Kwanza Stream. Os viewers compram Salos e enviam-nos aos criadores durante as streams como forma de doação/apoio." },
      { q: "Como recebo o meu dinheiro?", a: "Através da tua carteira (Wallet). Podes levantar via Multicaixa Express, transferência bancária ou E-Kwanza. O montante mínimo de levantamento é 5.000 Kz." },
      { q: "Quanto fica o Kwanza Stream das doações?", a: "O Kwanza Stream retém 20% dos Salos como comissão de plataforma. 80% vai directamente para o criador." },
      { q: "O que é o Programa Partner?", a: "É o nosso programa para criadores estabelecidos. Partners têm acesso a funcionalidades exclusivas, suporte prioritário e taxas de comissão reduzidas." },
    ],
  },
  {
    category: "Pagamentos",
    questions: [
      { q: "Que métodos de pagamento aceitam?", a: "Multicaixa Express, E-Kwanza, Unitel Money e transferência bancária angolana. Não é necessário cartão internacional." },
      { q: "Os pagamentos são seguros?", a: "Sim. Todas as transações são processadas com encriptação de ponta a ponta. Não armazenamos dados de pagamento nos nossos servidores." },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors">
        <span className="text-sm font-medium pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [search, setSearch] = useState("")
  const filtered = FAQ_DATA.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) => q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
        <p className="text-muted-foreground">Encontra respostas às dúvidas mais comuns sobre o Kwanza Stream.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar perguntas..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-primary/50 focus:outline-none transition-colors"
        />
      </div>

      {/* FAQ Categories */}
      {filtered.map((cat) => (
        <div key={cat.category} className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {cat.category}
            <span className="text-xs text-muted-foreground font-normal">({cat.questions.length})</span>
          </h2>
          <div className="space-y-2">
            {cat.questions.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">Nenhuma pergunta encontrada para &ldquo;{search}&rdquo;</p>
        </div>
      )}

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-muted-foreground">Não encontraste o que procuravas? <a href="/contacto" className="text-primary hover:underline">Contacta-nos</a></p>
      </div>
    </div>
  )
}
