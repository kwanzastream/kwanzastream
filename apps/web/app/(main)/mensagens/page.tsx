"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Search, MessageSquarePlus, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

interface Conversation { id: string; lastMessageAt: string; participants: { id: string; username: string; displayName: string; avatarUrl?: string; isOnline?: boolean }[]; lastMessage?: { content: string; senderId: string; isRead: boolean }; unreadCount: number }

export default function MensagensPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get("/api/messages/conversations")
      .then((res) => setConversations(res.data?.conversations || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const getOther = (c: Conversation) => c.participants.find((p) => p.id !== user?.id) ?? c.participants[0]
  const filtered = conversations.filter((c) => { const o = getOther(c); return o?.displayName?.toLowerCase().includes(search.toLowerCase()) || o?.username?.toLowerCase().includes(search.toLowerCase()) })

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold">Mensagens</h1><Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => router.push("/mensagens/nova")}><MessageSquarePlus className="w-3.5 h-3.5" />Nova</Button></div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Pesquisar conversas..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      {loading ? <div className="space-y-2">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
      : filtered.length === 0 ? <div className="text-center py-16"><MessageSquare className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-30" /><p className="font-medium">Sem mensagens</p><p className="text-sm text-muted-foreground mt-1">Envia uma mensagem a um criador que segues</p></div>
      : <div className="space-y-1">{filtered.map((conv) => {
          const other = getOther(conv); const isUnread = conv.unreadCount > 0; const isLastMine = conv.lastMessage?.senderId === user?.id
          return (
            <button key={conv.id} className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-muted/40 transition-colors text-left" onClick={() => router.push(`/mensagens/${conv.id}`)}>
              <div className="relative shrink-0"><Avatar className="w-11 h-11"><AvatarImage src={other?.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{other?.displayName?.slice(0, 2)}</AvatarFallback></Avatar>{other?.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2"><p className={`text-sm truncate ${isUnread ? "font-semibold" : "font-medium"}`}>{other?.displayName}</p><p className="text-[10px] text-muted-foreground shrink-0">{formatDistanceToNow(new Date(conv.lastMessageAt), { locale: pt, addSuffix: false })}</p></div>
                <div className="flex items-center justify-between gap-2 mt-0.5"><p className={`text-xs truncate ${isUnread ? "text-foreground" : "text-muted-foreground"}`}>{isLastMine ? "Tu: " : ""}{conv.lastMessage?.content ?? "..."}</p>{isUnread && <Badge className="shrink-0 h-4 min-w-4 text-[10px] px-1">{conv.unreadCount}</Badge>}</div>
              </div>
            </button>
          )
        })}</div>}
    </div>
  )
}
