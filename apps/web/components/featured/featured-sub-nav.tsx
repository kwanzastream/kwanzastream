"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, LayoutGrid, Grid3X3, Image, Film } from "lucide-react"

const TABS = [
  { href: "/dashboard/featured/canais-sugeridos", label: "Canais Sugeridos", icon: Users },
  { href: "/dashboard/featured/shelf", label: "Shelf", icon: LayoutGrid },
  { href: "/dashboard/featured/categorias-recentes", label: "Categorias", icon: Grid3X3 },
  { href: "/dashboard/featured/banner-offline", label: "Banner Offline", icon: Image },
  { href: "/dashboard/featured/trailer-canal", label: "Trailer", icon: Film },
]

export function FeaturedSubNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + "/")
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all shrink-0",
              active
                ? "bg-primary/10 text-primary font-medium border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
