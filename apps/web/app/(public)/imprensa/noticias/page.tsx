"use client"
import Link from "next/link"
export default function ImprensaNoticiasPage() { return (
  <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">📰 Notícias e Comunicados</h1>
    <div className="space-y-3">{[{ slug: "lancamento-kwanza-stream", title: "Kwanza Stream lança oficialmente em 1 de Maio de 2026", date: "1 Mai 2026", excerpt: "A primeira plataforma angolana de live streaming está oficialmente online." }, { slug: "parceria-ossic", title: "Parceria com OSSIC para música angolana", date: "15 Abr 2026", excerpt: "Músicas angolanas licenciadas disponíveis gratuitamente para streamers." }].map(n => <Link key={n.slug} href={`/imprensa/noticias/${n.slug}`} className="block p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"><p className="text-[10px] text-muted-foreground">{n.date}</p><p className="text-sm font-semibold mt-1">{n.title}</p><p className="text-xs text-muted-foreground mt-1">{n.excerpt}</p></Link>)}</div>
  </div>
) }
