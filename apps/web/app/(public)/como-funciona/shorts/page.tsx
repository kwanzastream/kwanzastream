import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Shorts — Kwanza Stream", description: "Conteúdo curto vertical no Kwanza Stream." }
export default function ComoFuncionaShortsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Shorts</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Shorts 📱</h1>
      <p className="text-muted-foreground mb-10">Conteúdo curto vertical. Menos de 60 segundos. Mobile-first, som desligado por defeito.</p>
      <div className="space-y-6">
        {[
          { emoji: "📱", title: "Formato vertical", desc: "Shorts são vídeos verticais (9:16) com menos de 60 segundos. Optimizados para consumo rápido no telemóvel." },
          { emoji: "🎬", title: "Como publicar", desc: "Grava com o telemóvel ou faz upload de um vídeo vertical. Adiciona um título, tags e publica. Aparece no feed de Shorts." },
          { emoji: "🔇", title: "Som desligado por defeito", desc: "Por respeito ao utilizador, os Shorts começam em mudo. Um toque activa o som." },
          { emoji: "🚀", title: "Algoritmo próprio", desc: "Os Shorts têm um algoritmo separado dos clips. Mais agressivo em promover conteúdo novo e creators emergentes." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card">
            <span className="text-2xl shrink-0">{item.emoji}</span>
            <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
