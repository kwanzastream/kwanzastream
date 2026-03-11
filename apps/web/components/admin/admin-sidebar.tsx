"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Radio, DollarSign, Shield, BarChart2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview", exact: true },
  { href: "/admin/utilizadores", icon: Users, label: "Utilizadores" },
  { href: "/admin/streams", icon: Radio, label: "Streams" },
  { href: "/admin/pagamentos", icon: DollarSign, label: "Pagamentos" },
  { href: "/admin/moderacao", icon: Shield, label: "Moderação" },
  { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/admin/config", icon: Settings, label: "Configurações" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const isActive = (href: string, exact = false) => exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="w-48 shrink-0 border-r border-border/50 min-h-screen bg-background hidden lg:flex flex-col">
      <nav className="p-2 space-y-0.5 flex-1">
        {NAV.map((item) => { const active = isActive(item.href, (item as any).exact); return (
          <Link key={item.href} href={item.href}><div className={cn("flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors", active ? "bg-[#CE1126]/10 text-[#CE1126] font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted")}><item.icon className="w-4 h-4 shrink-0" /><span className="flex-1">{item.label}</span></div></Link>
        )})}
      </nav>
      <div className="p-3 border-t text-[10px] text-muted-foreground">Kwanza Stream Admin</div>
    </aside>
  )
}
