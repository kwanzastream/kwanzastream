"use client"

import { DocsSidebar } from "@/components/developers/docs-sidebar"
import Link from "next/link"
import { Book, Key, Globe, Layers, Bot, Code } from "lucide-react"

export default function DocsHubPage() {
  const sections = [
    { icon: Book, title: "Introdução", desc: "Primeiros passos e guia rápido", href: "/developers/docs/introducao" },
    { icon: Key, title: "Autenticação", desc: "OAuth 2.0, tokens, scopes", href: "/developers/docs/autenticacao" },
    { icon: Globe, title: "Referência API", desc: "Endpoints: streams, canais, chat, analytics", href: "/developers/docs/api" },
    { icon: Layers, title: "Extensões", desc: "Criar, publicar, monetizar", href: "/developers/docs/extensoes" },
    { icon: Bot, title: "Bots", desc: "Chat bots e comandos", href: "/developers/docs/bots" },
    { icon: Code, title: "Overlays", desc: "Widgets para OBS", href: "/developers/docs/overlays" },
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Documentação</h1>
        <div className="grid grid-cols-2 gap-3">
          {sections.map((s, i) => (
            <Link key={i} href={s.href} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-1">
              <s.icon className="w-5 h-5 text-primary" /><p className="text-sm font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
