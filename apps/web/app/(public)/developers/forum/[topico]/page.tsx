"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, MessageSquare } from "lucide-react"
import Link from "next/link"
const TOPICS: Record<string, any> = {
  "oauth-pkce": { title: "OAuth PKCE para SPAs — quando?", author: "dev_joao", date: "20 Mar 2026", content: "Estou a desenvolver uma SPA e preciso de PKCE flow. Quando será suportado?", replies: [
    { author: "kwanza_team", content: "PKCE está planeado para v1.3.0 (Q2 2026). Por agora, usa um backend proxy.", date: "20 Mar" },
    { author: "dev_maria", content: "Eu uso um serverless function como proxy. Funciona bem!", date: "20 Mar" },
  ]},
  "rate-limit-production": { title: "Rate limit em produção parece baixo", author: "botmaker_ao", date: "19 Mar 2026", content: "1.000 req/min é suficiente para a maioria dos cases, mas para bots de chat em canais grandes pode ser limitante.", replies: [
    { author: "kwanza_team", content: "Partners têm acesso a 5.000 req/min. Contacta-nos se precisas de mais.", date: "19 Mar" },
  ]},
}
export default function TopicoPage() {
  const { topico } = useParams()
  const t = TOPICS[topico as string] || { title: "Tópico", author: "anon", date: "", content: "Conteúdo do tópico", replies: [] }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/forum" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Fórum</Link>
      <h1 className="text-xl font-bold">{t.title}</h1>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] text-muted-foreground mb-2">@{t.author} · {t.date}</p><p className="text-sm">{t.content}</p></div>
      <h2 className="text-sm font-semibold flex items-center gap-1"><MessageSquare className="w-4 h-4" />{t.replies.length} respostas</h2>
      <div className="space-y-3 pl-4 border-l-2 border-white/10">
        {t.replies.map((r: any, i: number) => (
          <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-[10px] text-muted-foreground mb-1">@{r.author} · {r.date}</p><p className="text-xs">{r.content}</p></div>
        ))}
      </div>
    </div>
  )
}
