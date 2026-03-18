"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface Tribo { id: string; name: string; icon: string; members: number; status: "membro" | "a-seguir" | "moderador" }

const TABS = [
  { id: "canais", label: "Canais", href: "/a-seguir/canais" },
  { id: "categorias", label: "Categorias", href: "/a-seguir/categorias" },
  { id: "tribos", label: "Tribos", href: "/a-seguir/tribos" },
  { id: "tags", label: "Tags", href: "/a-seguir/tags" },
]

const MOCK: Tribo[] = [
  { id: "t1", name: "Gamers de Angola", icon: "🎮", members: 2400, status: "membro" },
  { id: "t2", name: "Kuduro Nation", icon: "🇦🇴", members: 5600, status: "a-seguir" },
  { id: "t3", name: "Tech Luanda", icon: "💻", members: 890, status: "moderador" },
  { id: "t4", name: "Culinária Angolana", icon: "🍲", members: 1200, status: "a-seguir" },
]

const STATUS_STYLES: Record<string, string> = {
  membro: "bg-primary/20 text-primary",
  "a-seguir": "bg-white/10 text-muted-foreground",
  moderador: "bg-amber-500/20 text-amber-400",
}

export default function ASeguirTribosPage() {
  const [tribos, setTribos] = useState(MOCK)

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold">A seguir</h1>

      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "tribos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>
        ))}
      </div>

      <div className="space-y-2">
        {tribos.map(tribo => (
          <div key={tribo.id} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">{tribo.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold">{tribo.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5"><Users className="w-2.5 h-2.5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{tribo.members > 999 ? `${(tribo.members / 1000).toFixed(1)}k` : tribo.members} membros</span></div>
            </div>
            <Badge className={`text-[9px] ${STATUS_STYLES[tribo.status]}`}>
              {tribo.status === "moderador" ? "🛡️ Moderador" : tribo.status === "membro" ? "Membro" : "A seguir"}
            </Badge>
          </div>
        ))}
        {tribos.length === 0 && <div className="text-center py-16"><Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem tribos</p></div>}
      </div>
    </div>
  )
}
