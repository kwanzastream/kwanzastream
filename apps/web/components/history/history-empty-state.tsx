"use client"
import Link from "next/link"
const defaults: Record<string, { icon: string; text: string; cta: string; href: string }> = {
  streams: { icon: "📺", text: "Ainda não assististe a nenhum stream.", cta: "Explorar streams", href: "/explore" },
  videos: { icon: "📹", text: "Nenhum VOD assistido.", cta: "Descobrir VODs", href: "/explore" },
  clips: { icon: "✂️", text: "Nenhum clip visto.", cta: "Ver clips populares", href: "/explore" },
  shorts: { icon: "📱", text: "Nenhum short visto.", cta: "Descobrir shorts", href: "/shorts" },
  pesquisas: { icon: "🔍", text: "Nenhuma pesquisa registada.", cta: "Pesquisar", href: "/explore" },
  canais: { icon: "👤", text: "Nenhum canal visitado recentemente.", cta: "Explorar canais", href: "/explore" },
  salos: { icon: "💎", text: "Nenhum Salo enviado.", cta: "Comprar Salos", href: "/salos/comprar" },
}
export function HistoryEmptyState({ type }: { type: string }) {
  const d = defaults[type] || defaults.streams
  return (
    <div className="text-center py-12 space-y-3">
      <div className="text-4xl">{d.icon}</div>
      <p className="text-xs text-muted-foreground">{d.text}</p>
      <Link href={d.href} className="inline-block px-4 py-2 rounded-xl bg-primary text-white text-xs">{d.cta}</Link>
    </div>
  )
}
