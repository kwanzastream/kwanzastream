"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Shield, MessageSquare, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface MessageRequest { id: string; from: { username: string; displayName: string; avatarUrl?: string }; preview: string; createdAt: string }

const MOCK: MessageRequest[] = [
  { id: "r1", from: { username: "new_viewer", displayName: "Novo Viewer" }, preview: "Eii, gosto muito do teu conteúdo...", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "r2", from: { username: "marca_ao", displayName: "Marca Angola" }, preview: "Olá! Gostaríamos de propor uma parceria...", createdAt: new Date(Date.now() - 86400000).toISOString() },
]

export default function MensagensPedidosPage() {
  const router = useRouter()
  const [requests, setRequests] = useState(MOCK)

  const handleAccept = async (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id))
    toast.success("Pedido aceite — movido para inbox")
    // API: POST /api/messages/requests/:id/accept
  }

  const handleReject = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id))
    toast.info("Pedido rejeitado")
  }

  const handleBlock = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id))
    toast.success("Utilizador bloqueado")
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/mensagens"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-xl font-bold">Pedidos de mensagem</h1>
        {requests.length > 0 && <Badge className="bg-primary text-primary-foreground">{requests.length}</Badge>}
      </div>
      <p className="text-xs text-muted-foreground">Mensagens de utilizadores que não segues. O remetente não sabe se rejeitares.</p>

      {requests.length === 0 ? (
        <div className="text-center py-16"><MessageSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem pedidos pendentes</p></div>
      ) : (
        <div className="space-y-2">
          {requests.map(r => (
            <div key={r.id} className="p-4 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10"><AvatarImage src={r.from.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary text-xs">{r.from.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0"><p className="text-sm font-bold">@{r.from.username}</p><p className="text-xs text-muted-foreground truncate">{r.preview}</p></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 text-xs gap-1" onClick={() => handleAccept(r.id)}><Check className="w-3 h-3" />Aceitar</Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs gap-1" onClick={() => handleReject(r.id)}><X className="w-3 h-3" />Rejeitar</Button>
                <Button size="sm" variant="ghost" className="text-xs gap-1 text-red-400" onClick={() => handleBlock(r.id)}><Shield className="w-3 h-3" />Bloquear</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
