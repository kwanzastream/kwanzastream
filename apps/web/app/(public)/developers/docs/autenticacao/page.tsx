"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import Link from "next/link"
import { Key, Shield, List } from "lucide-react"

export default function AutenticacaoHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Autenticação</h1>
        <p className="text-sm text-muted-foreground">A API do Kwanza Stream usa OAuth 2.0 Authorization Code Flow</p>
        <div className="space-y-3">
          {[{ icon: Key, title: "OAuth 2.0", desc: "Fluxo completo de autorização", href: "/developers/docs/autenticacao/oauth" },
            { icon: Shield, title: "Access & Refresh Tokens", desc: "Gestão de tokens e renovação", href: "/developers/docs/autenticacao/tokens" },
            { icon: List, title: "Scopes", desc: "Lista completa de permissões", href: "/developers/docs/autenticacao/scopes" }].map((s, i) => (
            <Link key={i} href={s.href} className="flex gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <s.icon className="w-5 h-5 text-primary shrink-0" /><div><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
