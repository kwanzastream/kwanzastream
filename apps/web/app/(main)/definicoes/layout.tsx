"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { User, Shield, Bell, CreditCard, Palette, Globe, Smartphone, ChevronRight } from "lucide-react"

const SETTINGS_NAV = [
  { group: "Conta", items: [
    { href: "/definicoes/perfil", icon: User, label: "Perfil", desc: "Avatar, bio, username" },
    { href: "/definicoes/seguranca", icon: Shield, label: "Segurança", desc: "Password, 2FA, sessões" },
    { href: "/definicoes/notificacoes", icon: Bell, label: "Notificações", desc: "Email, push, SMS" },
    { href: "/definicoes/pagamentos", icon: CreditCard, label: "Pagamentos", desc: "KYC, métodos, histórico" },
  ]},
  { group: "Preferências", items: [
    { href: "/definicoes/tema", icon: Palette, label: "Aparência", desc: "Tema, idioma" },
    { href: "/definicoes/privacidade", icon: Globe, label: "Privacidade", desc: "Visibilidade, bloqueios" },
    { href: "/definicoes/conexoes", icon: Smartphone, label: "Dispositivos", desc: "Sessões activas" },
  ]},
]

export default function DefinicoesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Definições</h1>
      <div className="flex gap-6">
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="space-y-4">
            {SETTINGS_NAV.map((group) => (
              <div key={group.group}>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1.5">{group.group}</p>
                <div className="space-y-0.5">{group.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/")
                  return <Link key={item.href} href={item.href}><div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted")}><item.icon className="w-4 h-4 shrink-0" /><span className="flex-1">{item.label}</span>{active && <ChevronRight className="w-3.5 h-3.5" />}</div></Link>
                })}</div>
              </div>
            ))}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
