"use client"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
const PROJECTS = [
  { id: "kwanza-bot", name: "KwanzaBot", author: "dev_joao", desc: "Bot de moderação e comandos para chat", installs: 234, category: "Bot" },
  { id: "salo-overlay", name: "Salo Alert", author: "overlay_pedro", desc: "Widget de overlay para alertas de Salos", installs: 156, category: "Overlay" },
  { id: "analytics-dash", name: "Stream Insights", author: "api_maria", desc: "Dashboard alternativo de analytics", installs: 89, category: "Dashboard" },
  { id: "goal-bar", name: "Goal Bar Pro", author: "ext_dev", desc: "Extensão de goal bar personalizável", installs: 45, category: "Extensão" },
]
export default function ShowcasePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Star className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Showcase</h1>
      <p className="text-sm text-muted-foreground">Apps e extensões em destaque construídas pela comunidade</p>
      <div className="grid grid-cols-2 gap-3">
        {PROJECTS.map(p => (
          <Link key={p.id} href={`/developers/showcase/${p.id}`} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-2">
            <div className="flex items-center justify-between"><span className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">{p.category}</span><span className="text-[9px] text-muted-foreground">{p.installs} instal.</span></div>
            <p className="text-sm font-semibold">{p.name}</p>
            <p className="text-[10px] text-muted-foreground">{p.desc}</p>
            <p className="text-[9px] text-muted-foreground">por @{p.author}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
