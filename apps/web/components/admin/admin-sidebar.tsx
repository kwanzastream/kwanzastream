"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, Video, Radio, FileVideo, Shield, CreditCard, BarChart2, Tag, ShoppingBag,
  Flag, Bell, Settings, ScrollText, UserCog, Trophy, Gamepad2, Calendar, Megaphone
} from "lucide-react"

type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'finance' | 'support'

const SIDEBAR_SECTIONS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["super_admin","admin","moderator","finance","support"] },
  { label: "Utilizadores", href: "/admin/utilizadores", icon: Users, roles: ["super_admin","admin","moderator","support"] },
  { label: "Streamers", href: "/admin/streamers", icon: Video, roles: ["super_admin","admin"] },
  { label: "Streams", href: "/admin/streams", icon: Radio, roles: ["super_admin","admin","moderator"] },
  { label: "Conteúdo", href: "/admin/conteudo", icon: FileVideo, roles: ["super_admin","admin","moderator"] },
  { label: "Moderação", href: "/admin/moderacao", icon: Shield, roles: ["super_admin","admin","moderator"] },
  { label: "Pagamentos", href: "/admin/pagamentos", icon: CreditCard, roles: ["super_admin","admin","finance"] },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart2, roles: ["super_admin","admin","finance"] },
  { label: "Categorias", href: "/admin/categorias", icon: Tag, roles: ["super_admin","admin"] },
  { label: "Tags", href: "/admin/tags", icon: Tag, roles: ["super_admin","admin"] },
  { label: "Tribos", href: "/admin/tribos", icon: Gamepad2, roles: ["super_admin","admin"] },
  { label: "Torneios", href: "/admin/torneios", icon: Trophy, roles: ["super_admin","admin"] },
  { label: "Eventos", href: "/admin/eventos", icon: Calendar, roles: ["super_admin","admin"] },
  { label: "Loja", href: "/admin/loja", icon: ShoppingBag, roles: ["super_admin","admin"] },
  { label: "Drops", href: "/admin/drops", icon: ShoppingBag, roles: ["super_admin","admin"] },
  { label: "Campanhas", href: "/admin/campanhas", icon: Megaphone, roles: ["super_admin","admin"] },
  { label: "Anúncios", href: "/admin/anuncios", icon: Megaphone, roles: ["super_admin","admin"] },
  { label: "Extensões", href: "/admin/extensoes", icon: Gamepad2, roles: ["super_admin","admin"] },
  { label: "Developers", href: "/admin/developers", icon: Gamepad2, roles: ["super_admin","admin"] },
  { label: "Feature Flags", href: "/admin/feature-flags", icon: Flag, roles: ["super_admin"] },
  { label: "Notificações", href: "/admin/notificacoes", icon: Bell, roles: ["super_admin","admin"] },
  { label: "Kwanza Awards", href: "/admin/kwanza-awards", icon: Trophy, roles: ["super_admin","admin"] },
  { label: "Configurações", href: "/admin/config", icon: Settings, roles: ["super_admin"] },
  { label: "Logs", href: "/admin/logs", icon: ScrollText, roles: ["super_admin","admin","moderator","finance","support"] },
  { label: "Admins", href: "/admin/admins", icon: UserCog, roles: ["super_admin"] },
]

export function AdminSidebar({ role = "super_admin" }: { role?: string }) {
  const pathname = usePathname()
  const visible = SIDEBAR_SECTIONS.filter(s => s.roles.includes(role))
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="w-56 shrink-0 border-r border-border/50 min-h-screen bg-background hidden lg:flex flex-col">
      <div className="p-3 border-b border-border/50">
        <p className="text-[10px] text-white/40 uppercase tracking-wider">{role === 'super_admin' ? '👑 Super Admin' : role}</p>
      </div>
      <nav className="p-2 space-y-0.5 flex-1 overflow-y-auto">
        {visible.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={cn("flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors",
              isActive(item.href) ? "bg-[#CE1126]/10 text-[#CE1126] font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}>
              <item.icon className="w-3.5 h-3.5 shrink-0" /><span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t text-[9px] text-muted-foreground">Kwanza Stream Admin v2</div>
    </aside>
  )
}
