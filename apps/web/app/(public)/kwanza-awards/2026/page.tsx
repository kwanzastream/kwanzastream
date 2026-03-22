"use client"
import Link from "next/link"
import { Trophy, Calendar, Award, Vote, BarChart3, Tv } from "lucide-react"
export default function Awards2026Page() {
  const links = [
    { icon: Award, label: "Categorias", href: "/kwanza-awards/2026/categorias" },
    { icon: Trophy, label: "Nomeados", href: "/kwanza-awards/2026/nomeados" },
    { icon: Vote, label: "Votar", href: "/kwanza-awards/2026/votar" },
    { icon: BarChart3, label: "Resultados", href: "/kwanza-awards/2026/resultados" },
    { icon: Tv, label: "Cerimónia", href: "/kwanza-awards/2026/cerimonia" },
  ]
  const cats = ["🎮 Melhor Streamer de Gaming", "🎵 Melhor DJ / Músico", "⚽ Melhor Caster de Futebol", "🤣 Melhor Comediante", "📱 Melhor Criador Mobile", "🌍 Melhor Representante da Diáspora", "🆕 Melhor Novo Criador", "🏆 Criador do Ano"]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <div className="text-center space-y-2"><Trophy className="w-10 h-10 text-primary mx-auto" /><h1 className="text-2xl font-bold">Kwanza Awards 2026</h1><p className="text-xs text-muted-foreground">📅 15 Dezembro 2026 · Luanda · Transmissão ao vivo</p></div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">{links.map((l,i) => <Link key={i} href={l.href} className="p-3 rounded-xl border border-white/10 hover:border-primary/20 text-center text-xs space-y-1 transition-all"><l.icon className="w-5 h-5 text-primary mx-auto" /><p>{l.label}</p></Link>)}</div>
    <div className="space-y-1"><h2 className="text-sm font-semibold">Categorias:</h2>{cats.map(c => <p key={c} className="text-xs text-muted-foreground">{c}</p>)}</div>
  </div>)
}
