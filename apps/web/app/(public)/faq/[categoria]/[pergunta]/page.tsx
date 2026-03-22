"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function FaqPerguntaPage() {
  const { categoria, pergunta } = useParams()
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/faq/${categoria}`} className="text-[10px] text-muted-foreground hover:text-foreground">← {categoria}</Link>
      <h1 className="text-xl font-bold">{(pergunta as string).replaceAll("-", " ")}</h1>
      <div className="text-xs text-muted-foreground leading-relaxed"><p>Resposta detalhada disponível na nossa base de conhecimento.</p><p className="mt-2">Para mais detalhes, visita <Link href="/suporte" className="text-primary hover:underline">Suporte</Link> ou <Link href="/suporte/ticket/criar" className="text-primary hover:underline">cria um ticket</Link>.</p></div>
    </div>
  )
}
