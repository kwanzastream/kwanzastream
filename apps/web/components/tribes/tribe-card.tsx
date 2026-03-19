"use client"

import { useState } from "react"
import { Users, Radio, Lock, UserPlus, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

export interface TribeData {
  slug: string
  name: string
  description?: string
  bannerUrl?: string
  logoUrl?: string
  category: string
  memberCount: number
  weeklyStreams: number
  access: "open" | "approval" | "invite"
  color?: string
  founder?: { username: string; displayName: string }
}

const ACCESS_LABELS: Record<string, { label: string; icon: any }> = {
  open: { label: "Aberta", icon: UserPlus },
  approval: { label: "Por aprovação", icon: Lock },
  invite: { label: "Por convite", icon: Lock },
}

export function TribeCard({ tribe }: { tribe: TribeData }) {
  const [joined, setJoined] = useState(false)
  const access = ACCESS_LABELS[tribe.access]

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    if (tribe.access === "open") { setJoined(!joined); toast.success(joined ? "Saíste da tribo" : "Juntaste-te à tribo!") }
    else if (tribe.access === "approval") { toast.info("Redirigindo para candidatura...") }
    else { toast.info("Precisas de um convite") }
  }

  return (
    <Link href={`/tribos/${tribe.slug}`} className="group block">
      <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all bg-card">
        <div className="relative h-20 bg-gradient-to-r from-primary/20 to-purple-500/10" style={tribe.color ? { background: `linear-gradient(135deg, ${tribe.color}20, ${tribe.color}05)` } : undefined}>
          {tribe.bannerUrl && <img src={tribe.bannerUrl} className="w-full h-full object-cover" loading="lazy" />}
          <Badge className="absolute top-2 right-2 text-[9px] bg-black/50 backdrop-blur border-white/20 text-white">{tribe.category}</Badge>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: `${tribe.color || '#CE1126'}20`, color: tribe.color || '#CE1126' }}>{tribe.name[0]}</div>
            <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{tribe.name}</h3>
          </div>
          {tribe.description && <p className="text-[10px] text-muted-foreground line-clamp-2">{tribe.description}</p>}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tribe.memberCount.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Radio className="w-3 h-3" />{tribe.weeklyStreams} streams/semana</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[9px]"><access.icon className="w-3 h-3 mr-0.5" />{access.label}</Badge>
            <Button size="sm" variant={joined ? "secondary" : "default"} className="text-[10px] h-6 px-2" onClick={handleJoin}>
              {joined ? <><Check className="w-3 h-3 mr-0.5" />Membro</> : tribe.access === "approval" ? "Pedir entrada" : tribe.access === "invite" ? "Por convite" : "Juntar-se"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
