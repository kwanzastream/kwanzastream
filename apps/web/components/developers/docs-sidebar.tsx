"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Key, Globe, Code, Bot, Layers, FileText } from "lucide-react"

const NAV = [
  { label: "Introdução", href: "/developers/docs/introducao", icon: Book },
  { label: "Autenticação", href: "/developers/docs/autenticacao", icon: Key, children: [
    { label: "OAuth 2.0", href: "/developers/docs/autenticacao/oauth" },
    { label: "Tokens", href: "/developers/docs/autenticacao/tokens" },
    { label: "Scopes", href: "/developers/docs/autenticacao/scopes" },
  ]},
  { label: "Referência API", href: "/developers/docs/api", icon: Globe, children: [
    { label: "Utilizadores", href: "/developers/docs/api/utilizadores" },
    { label: "Streams", href: "/developers/docs/api/streams" },
    { label: "Canais", href: "/developers/docs/api/canais" },
    { label: "Chat", href: "/developers/docs/api/chat" },
    { label: "Salos", href: "/developers/docs/api/salos" },
    { label: "Clips", href: "/developers/docs/api/clips" },
    { label: "Analytics", href: "/developers/docs/api/analytics" },
    { label: "Webhooks", href: "/developers/docs/api/webhooks" },
    { label: "EventSub", href: "/developers/docs/api/eventsub" },
  ]},
  { label: "Extensões", href: "/developers/docs/extensoes", icon: Layers, children: [
    { label: "Criar", href: "/developers/docs/extensoes/criar" },
    { label: "Publicar", href: "/developers/docs/extensoes/publicar" },
    { label: "Monetizar", href: "/developers/docs/extensoes/monetizar" },
  ]},
  { label: "Bots", href: "/developers/docs/bots", icon: Bot, children: [
    { label: "Chat Bots", href: "/developers/docs/bots/chat-bots" },
    { label: "Comandos", href: "/developers/docs/bots/comandos" },
  ]},
  { label: "Overlays", href: "/developers/docs/overlays", icon: Code },
  { label: "Changelog", href: "/developers/changelog", icon: FileText },
]

export function DocsSidebar() {
  const pathname = usePathname()
  return (
    <nav className="w-56 shrink-0 space-y-1 pr-4 border-r border-white/10 hidden md:block">
      {NAV.map(item => (
        <div key={item.href}>
          <Link href={item.href} className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all ${pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <item.icon className="w-3.5 h-3.5" />{item.label}
          </Link>
          {item.children?.map(child => (
            <Link key={child.href} href={child.href} className={`block pl-8 py-1 text-[10px] transition-all ${pathname === child.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {child.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
