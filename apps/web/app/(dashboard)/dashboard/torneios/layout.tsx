"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Trophy, Swords, Award } from "lucide-react"

const TABS = [
  { href: "/dashboard/torneios/meus", label: "Meus Torneios", icon: Swords },
  { href: "/dashboard/torneios/organizados", label: "Organizados", icon: Trophy },
  { href: "/dashboard/torneios/inscricoes", label: "Inscrições", icon: Award },
]

export default function TorneiosLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Torneios</h1>
        <p className="text-sm text-muted-foreground mt-1">Gere os teus torneios e inscrições.</p>
      </div>
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
      <div>{children}</div>
    </div>
  )
}
