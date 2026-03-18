"use client"

import { usePathname, useRouter } from "next/navigation"
import { NotificationBadge } from "./notification-badge"
import { Radio, Users, Info, CreditCard, Shield, Trophy, Swords, Bell } from "lucide-react"

const TABS = [
  { id: "todas", label: "Todas", href: "/notificacoes/todas", icon: <Bell className="w-3.5 h-3.5" /> },
  { id: "streams", label: "Streams", href: "/notificacoes/streams", icon: <Radio className="w-3.5 h-3.5" /> },
  { id: "social", label: "Social", href: "/notificacoes/social", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "sistema", label: "Sistema", href: "/notificacoes/sistema", icon: <Info className="w-3.5 h-3.5" /> },
  { id: "pagamentos", label: "Pagamentos", href: "/notificacoes/pagamentos", icon: <CreditCard className="w-3.5 h-3.5" /> },
  { id: "moderacao", label: "Moderação", href: "/notificacoes/moderacao", icon: <Shield className="w-3.5 h-3.5" /> },
  { id: "conquistas", label: "Conquistas", href: "/notificacoes/conquistas", icon: <Trophy className="w-3.5 h-3.5" /> },
  { id: "torneios", label: "Torneios", href: "/notificacoes/torneios", icon: <Swords className="w-3.5 h-3.5" /> },
]

export function NotificationTabs({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className={`flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2 ${className}`}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <button key={tab.id} onClick={() => router.push(tab.href)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/10"}`}>
            {tab.icon}{tab.label}
          </button>
        )
      })}
    </div>
  )
}
