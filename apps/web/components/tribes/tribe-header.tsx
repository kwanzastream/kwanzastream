"use client"

import { useState } from "react"
import { Users, Radio, Settings, MessageCircle, Check, UserPlus, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
import type { TribeData } from "./tribe-card"

interface TribeHeaderProps {
  tribe: TribeData
  isMember?: boolean
  isFounder?: boolean
  isMod?: boolean
}

export function TribeHeader({ tribe, isMember, isFounder, isMod }: TribeHeaderProps) {
  const [joined, setJoined] = useState(isMember || false)

  const handleJoin = () => {
    if (tribe.access === "open") { setJoined(!joined); toast.success(joined ? "Saíste da tribo" : "Bem-vindo à tribo!") }
    else if (tribe.access === "approval") { window.location.href = `/tribos/${tribe.slug}/candidatura` }
    else { toast.info("Precisas de um convite") }
  }

  return (
    <div className="space-y-4">
      <div className="relative h-32 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-purple-500/10" style={tribe.color ? { background: `linear-gradient(135deg, ${tribe.color}30, ${tribe.color}08)` } : undefined}>
        {tribe.bannerUrl && <img src={tribe.bannerUrl} className="w-full h-full object-cover" />}
      </div>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 -mt-8 rounded-2xl border-4 border-background flex items-center justify-center text-2xl font-black shrink-0 z-10" style={{ backgroundColor: `${tribe.color || '#CE1126'}20`, color: tribe.color || '#CE1126' }}>{tribe.name[0]}</div>
        <div className="flex-1 min-w-0 space-y-1">
          <h1 className="text-xl font-black truncate">{tribe.name}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-[9px]">{tribe.category}</Badge>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tribe.memberCount.toLocaleString()} membros</span>
            <span className="flex items-center gap-1"><Radio className="w-3 h-3" />{tribe.weeklyStreams} streams/semana</span>
          </div>
          {tribe.description && <p className="text-xs text-muted-foreground line-clamp-2">{tribe.description}</p>}
        </div>
        <div className="flex gap-2 shrink-0">
          {!joined ? (
            <Button className="gap-1" onClick={handleJoin}><UserPlus className="w-4 h-4" />{tribe.access === "approval" ? "Pedir entrada" : "Juntar-se"}</Button>
          ) : (
            <Button variant="outline" className="gap-1" onClick={handleJoin}><Check className="w-4 h-4" />Membro</Button>
          )}
          {(isFounder || isMod) && <Link href={`/tribos/${tribe.slug}/gerir`}><Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button></Link>}
          <Button variant="outline" size="icon" onClick={() => { const url = `https://kwanzastream.ao/tribos/${tribe.slug}`; window.open(`https://wa.me/?text=${encodeURIComponent(`Junta-te à tribo ${tribe.name}!\n${url}`)}`, "_blank") }}><MessageCircle className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  )
}
