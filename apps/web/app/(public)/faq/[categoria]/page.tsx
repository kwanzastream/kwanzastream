"use client"
import { useParams } from "next/navigation"
import { FaqAccordion } from "@/components/support/faq-accordion"
import Link from "next/link"
const faqData: Record<string, { title: string; items: { question: string; answer: string }[] }> = {
  geral: { title: "Geral", items: [{ question: "O Kwanza Stream é gratuito?", answer: "Sim, criar conta e assistir é completamente gratuito." }, { question: "Está disponível em Angola?", answer: "Sim, é uma plataforma angolana, criada em Angola para Angola. Também acessível a partir da diáspora." }, { question: "Preciso de internet rápida?", answer: "Para assistir: 2 Mbps (480p), 5 Mbps (720p). Para transmitir: mínimo 5 Mbps upload." }] },
  conta: { title: "Conta", items: [{ question: "Como crio conta?", answer: "Clica em Registar, preenche email/telefone, confirma o código OTP." }, { question: "Esqueci a password", answer: "Usa 'Esqueci-me da password' na página de login." }] },
  pagamentos: { title: "Pagamentos", items: [{ question: "Como funciona o Multicaixa Express?", answer: "Geras uma referência, pagas no ATM ou app do banco, Salos creditados em 1-5 min." }, { question: "Os Salos expiram?", answer: "Não, os Salos não têm prazo de validade." }] },
  streaming: { title: "Streaming", items: [{ question: "Posso transmitir pelo telemóvel?", answer: "Sim, podes transmitir directamente pelo browser mobile." }, { question: "Que software usar?", answer: "Recomendamos OBS Studio (gratuito). Configura com a stream key em /studio/stream-key." }] },
  criadores: { title: "Criadores", items: [{ question: "Como ganho dinheiro?", answer: "Através de doações (Salos), subscrições e programa Afiliado/Partner." }, { question: "Quando posso ser Afiliado?", answer: "50 seguidores, 7 streams nos últimos 30 dias, 3+ viewers médios." }] },
}
export default function FaqCategoriaPage() {
  const { categoria } = useParams()
  const cat = faqData[categoria as string] || { title: categoria, items: [] }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/faq" className="text-[10px] text-muted-foreground hover:text-foreground">← FAQ</Link>
      <h1 className="text-xl font-bold">FAQ — {cat.title}</h1>
      <FaqAccordion items={cat.items} />
    </div>
  )
}
