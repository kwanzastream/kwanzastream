"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function NoticiaDetailPage() { const { slug } = useParams(); return (
  <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <Link href="/imprensa/noticias" className="text-[10px] text-muted-foreground hover:text-foreground">← Notícias</Link>
    <p className="text-[10px] text-muted-foreground">1 Maio 2026</p>
    <h1 className="text-xl font-bold">{(slug as string).replaceAll("-", " ")}</h1>
    <div className="text-xs text-muted-foreground leading-relaxed space-y-3"><p>Comunicado de imprensa completo disponível em breve.</p><p>Para mais informações: imprensa@kwanzastream.ao</p></div>
  </div>
) }
