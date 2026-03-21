"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Radio, BarChart2, Film, Users, DollarSign, Shield, Settings2, ChevronLeft, Puzzle, Mic2, BookOpen, Handshake, Star, Sparkles } from "lucide-react"

const NAV_GROUPS = [
  { label: null, items: [
    { href: "/dashboard", icon: LayoutDashboard, label: "Início", exact: true },
    { href: "/dashboard/stream-manager", icon: Radio, label: "Stream Manager" },
  ]},
  { label: "Criador", items: [
    { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
    { href: "/dashboard/content", icon: Film, label: "Conteúdo", children: [
      { href: "/dashboard/content/vods", label: "VODs" },
      { href: "/dashboard/content/clips", label: "Clips" },
      { href: "/dashboard/content/shorts", label: "Shorts" },
      { href: "/dashboard/content/schedule", label: "Schedule" },
      { href: "/dashboard/content/eventos", label: "Eventos" },
    ]},
    { href: "/dashboard/comunidade", icon: Users, label: "Comunidade", children: [
      { href: "/dashboard/comunidade/seguidores", label: "Seguidores" },
      { href: "/dashboard/comunidade/subscritores", label: "Subscritores" },
      { href: "/dashboard/comunidade/vips", label: "VIPs" },
      { href: "/dashboard/comunidade/moderadores", label: "Moderadores" },
      { href: "/dashboard/comunidade/emotes", label: "Emotes" },
      { href: "/dashboard/comunidade/badges", label: "Badges" },
      { href: "/dashboard/comunidade/channel-points", label: "Channel Points" },
    ]},
    { href: "/dashboard/monetizacao", icon: DollarSign, label: "Monetização", children: [
      { href: "/dashboard/monetizacao/salos", label: "Salos" },
      { href: "/dashboard/monetizacao/subscricoes", label: "Subscriptions" },
      { href: "/dashboard/monetizacao/drops", label: "Drops" },
      { href: "/dashboard/monetizacao/payouts", label: "Payouts" },
    ]},
    { href: "/dashboard/membership", icon: Star, label: "Memberships" },
    { href: "/dashboard/featured", icon: Sparkles, label: "Featured", children: [
      { href: "/dashboard/featured/canais-sugeridos", label: "Canais Sugeridos" },
      { href: "/dashboard/featured/shelf", label: "Shelf" },
      { href: "/dashboard/featured/banner-offline", label: "Banner Offline" },
      { href: "/dashboard/featured/trailer-canal", label: "Trailer" },
    ]},
  ]},
  { label: "Stream", items: [
    { href: "/dashboard/stream-config", icon: Settings2, label: "Stream Config", children: [
      { href: "/dashboard/stream-config/stream-key", label: "Stream Key" },
      { href: "/dashboard/stream-config/qualidade", label: "Qualidade" },
      { href: "/dashboard/stream-config/alertas", label: "Alertas" },
      { href: "/dashboard/stream-config/overlays", label: "Overlays" },
    ]},
    { href: "/dashboard/moderacao", icon: Shield, label: "Moderação", children: [
      { href: "/dashboard/moderacao/automod", label: "AutoMod" },
      { href: "/dashboard/moderacao/logs", label: "Logs" },
      { href: "/dashboard/moderacao/reports", label: "Reports" },
    ]},
    { href: "/dashboard/colaboracoes", icon: Handshake, label: "Colaborações", children: [
      { href: "/dashboard/colaboracoes/stream-together", label: "Stream Together" },
      { href: "/dashboard/colaboracoes/raid", label: "Raid" },
      { href: "/dashboard/colaboracoes/equipa", label: "Equipa" },
    ]},
  ]},
  { label: "Extra", items: [
    { href: "/dashboard/extensoes", icon: Puzzle, label: "Extensões" },
    { href: "/dashboard/radio", icon: Mic2, label: "Modo Rádio" },
    { href: "/dashboard/kwanza-camp", icon: BookOpen, label: "Kwanza Camp" },
  ]},
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isActive = (href: string, exact = false) => exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="w-56 xl:w-60 shrink-0 border-r border-border/50 min-h-screen hidden lg:flex flex-col bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2.5">
          <Avatar className="w-8 h-8"><AvatarImage src={user?.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary text-xs">{user?.displayName?.slice(0, 2).toUpperCase() ?? "KS"}</AvatarFallback></Avatar>
          <div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate">{user?.displayName || user?.username}</p><p className="text-xs text-muted-foreground">@{user?.username}</p></div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {group.label && <p className="px-3 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{group.label}</p>}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, (item as any).exact)
                  const children = (item as any).children as any[] | undefined
                  const childActive = children?.some((c: any) => isActive(c.href))
                  return (
                    <div key={item.href}>
                      <Link href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${active || childActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                        <item.icon className="w-4 h-4 shrink-0" /><span className="flex-1 truncate">{item.label}</span>
                      </Link>
                      {children && (active || childActive) && (
                        <div className="ml-7 mt-0.5 space-y-0.5 border-l border-border/50 pl-3">
                          {children.map((child: any) => (
                            <Link key={child.href} href={child.href} className={`block py-1.5 px-2 rounded text-xs transition-colors ${isActive(child.href) ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>{child.label}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-3 border-t"><Link href="/feed"><Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground h-8"><ChevronLeft className="w-3.5 h-3.5" />Voltar para o site</Button></Link></div>
    </aside>
  )
}
