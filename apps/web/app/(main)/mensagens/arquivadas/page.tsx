"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Archive, ArrowLeft, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ArchivedConv { id: string; username: string; displayName: string; avatarUrl?: string; lastMessage: string; date: string }

const MOCK: ArchivedConv[] = [
  { id: "a1", username: "old_viewer", displayName: "Viewer Antigo", lastMessage: "Ok, até ao próximo stream!", date: "há 2 meses" },
]

export default function MensagensArquivadasPage() {
  const router = useRouter()
  const [archived, setArchived] = useState(MOCK)

  const handleUnarchive = (id: string) => {
    setArchived(prev => prev.filter(c => c.id !== id))
    toast.success("Conversa desarquivada")
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/mensagens"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Arquivadas</h1></div>
      <p className="text-xs text-muted-foreground">Conversas arquivadas não aparecem no inbox nem geram notificações.</p>
      {archived.length === 0 ? (
        <div className="text-center py-16"><Archive className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem conversas arquivadas</p></div>
      ) : (
        <div className="space-y-2">
          {archived.map(c => (
            <div key={c.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10">
              <Avatar className="w-10 h-10"><AvatarImage src={c.avatarUrl} /><AvatarFallback className="text-xs bg-primary/20 text-primary">{c.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{c.displayName}</p><p className="text-[10px] text-muted-foreground truncate">{c.lastMessage} · {c.date}</p></div>
              <Button size="sm" variant="outline" className="text-xs shrink-0" onClick={() => handleUnarchive(c.id)}>Desarquivar</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
