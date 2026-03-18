import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Mobile — Kwanza Stream", description: "Transmite e assiste no telemóvel. Optimizado para Angola." }
export default function ComoFuncionaMobilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link>
        <span>/</span><span className="text-foreground">Mobile</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Mobile 📲</h1>
      <p className="text-muted-foreground mb-10">Optimizado para redes angolanas. Funciona em 3G. Menos dados, mais conteúdo.</p>
      <div className="space-y-6">
        {[
          { emoji: "📱", title: "App nativa", desc: "Disponível para Android (e em breve iOS). Instala directamente ou usa a versão PWA no browser para uma experiência app-like." },
          { emoji: "📡", title: "Transmite do telemóvel", desc: "Vai ao vivo directamente do teu Android. Câmara frontal ou traseira. Sem necessidade de equipamento extra." },
          { emoji: "📶", title: "Modo baixo consumo", desc: "Qualidade adaptativa automática. Em ligações lentas, reduz a qualidade para 360p para garantir reprodução sem buffering." },
          { emoji: "📻", title: "Modo Rádio", desc: "Ouve streams em modo áudio apenas. Consome 10x menos dados do que vídeo. Ideal com ligações 3G." },
          { emoji: "💾", title: "Cache offline", desc: "A homepage e explorar ficam em cache. Se perdes ligação, vês o último estado em vez de ecrã branco." },
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
