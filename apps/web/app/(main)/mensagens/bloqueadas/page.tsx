"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, ShieldOff } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface BlockedUser { id: string; username: string; displayName: string; avatarUrl?: string; blockedAt: string }

const MOCK: BlockedUser[] = [
  { id: "b1", username: "spammer123", displayName: "Spam User", blockedAt: "há 1 semana" },
]

export default function MensagensBloqueadasPage() {
  const [blocked, setBlocked] = useState(MOCK)

  const handleUnblock = (id: string) => {
    setBlocked(prev => prev.filter(u => u.id !== id))
    toast.success("Utilizador desbloqueado")
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/mensagens"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Bloqueados</h1></div>
      <p className="text-xs text-muted-foreground">Utilizadores bloqueados não podem enviar-te mensagens. <Link href="/definicoes/privacidade/bloqueados" className="text-primary hover:underline">Gestão completa →</Link></p>
      {blocked.length === 0 ? (
        <div className="text-center py-16"><Shield className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Nenhum utilizador bloqueado</p></div>
      ) : (
        <div className="space-y-2">
          {blocked.map(u => (
            <div key={u.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10">
              <Avatar className="w-10 h-10"><AvatarImage src={u.avatarUrl} /><AvatarFallback className="text-xs">{u.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold">@{u.username}</p><p className="text-[10px] text-muted-foreground">Bloqueado {u.blockedAt}</p></div>
              <Button size="sm" variant="outline" className="text-xs shrink-0 gap-1" onClick={() => handleUnblock(u.id)}><ShieldOff className="w-3 h-3" />Desbloquear</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
