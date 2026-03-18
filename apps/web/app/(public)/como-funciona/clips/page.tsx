import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Clips — Kwanza Stream", description: "Como criar e partilhar clips no Kwanza Stream." }
export default function ComoFuncionaClipsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Clips</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Clips ✂️</h1>
      <p className="text-muted-foreground mb-10">Captura os melhores momentos de um stream ao vivo em 10 a 90 segundos.</p>
      <div className="space-y-6">
        {[
          { emoji: "✂️", title: "O que é um clip?", desc: "Um recorte curto de um stream ao vivo. Pode ter entre 10 e 90 segundos. Perfeito para partilhar momentos incríveis." },
          { emoji: "📱", title: "Como criar", desc: "Enquanto assistes a um stream, clica no ícone de tesoura no player. Selecciona o intervalo de tempo e dá um título ao clip." },
          { emoji: "📤", title: "Como partilhar", desc: "Cada clip tem um botão de partilha WhatsApp nativo. O link gera um preview rico com thumbnail e título." },
          { emoji: "🔥", title: "Clips virais", desc: "Os clips mais vistos aparecem na página de Tendências. Clips com muitas visualizações dão exposição ao criador original." },
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
