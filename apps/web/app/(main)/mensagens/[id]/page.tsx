"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { ArrowLeft, Send, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"
import Link from "next/link"

interface Message { id: string; content: string; senderId: string; createdAt: string; isRead: boolean; sender: { id: string; username: string; displayName: string; avatarUrl?: string } }

export default function ConversationPage() {
  const params = useParams()
  const convId = params.id as string
  const { user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [convInfo, setConvInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const fetchMessages = useCallback(async (silent = false) => {
    try {
      const res = await api.get(`/api/messages/conversations/${convId}`)
      setConvInfo(res.data?.conversation || { id: convId, participants: [] })
      setMessages(res.data?.messages || res.data || [])
    } catch { if (!silent) router.push("/mensagens") }
    finally { setLoading(false) }
  }, [convId, router])

  useEffect(() => { fetchMessages(); pollRef.current = setInterval(() => fetchMessages(true), 5000); return () => clearInterval(pollRef.current) }, [fetchMessages])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || sending) return
    const content = input.trim(); setInput(""); setSending(true)
    try { await api.post("/api/messages/", { conversationId: convId, content }); await fetchMessages(true) }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao enviar"); setInput(content) }
    finally { setSending(false) }
  }

  const handleDelete = async (msgId: string) => { try { await api.delete(`/api/messages/${msgId}`); setMessages((p) => p.filter((m) => m.id !== msgId)) } catch { toast.error("Erro ao apagar") } }

  const otherUser = convInfo?.participants?.find((p: any) => p.id !== user?.id)

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-lg mx-auto">
      <div className="flex items-center gap-3 p-4 border-b border-border/50 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.push("/mensagens")}><ArrowLeft className="w-4 h-4" /></Button>
        {loading ? <Skeleton className="h-10 w-40 rounded-lg" /> : otherUser && (
          <Link href={`/${otherUser.username}`} className="flex items-center gap-2 hover:opacity-80">
            <Avatar className="w-9 h-9"><AvatarImage src={otherUser.avatarUrl} /><AvatarFallback className="text-xs">{otherUser.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
            <div><p className="text-sm font-semibold leading-none">{otherUser.displayName}</p><p className="text-xs text-muted-foreground mt-0.5">@{otherUser.username}</p></div>
          </Link>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? Array(6).fill(0).map((_, i) => <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}><Skeleton className="h-10 w-48 rounded-2xl" /></div>)
        : messages.length === 0 ? <div className="text-center py-8"><p className="text-sm text-muted-foreground">Sem mensagens ainda. Diz olá! 👋</p></div>
        : messages.map((msg) => {
            const isMine = msg.senderId === user?.id
            return (
              <div key={msg.id} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
                {!isMine && <Avatar className="w-6 h-6 shrink-0"><AvatarImage src={msg.sender?.avatarUrl} /><AvatarFallback className="text-[8px]">{msg.sender?.displayName?.slice(0, 2)}</AvatarFallback></Avatar>}
                <div className={`group relative max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${isMine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                  {msg.content}
                  <p className={`text-[10px] mt-0.5 ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{formatDistanceToNow(new Date(msg.createdAt), { locale: pt, addSuffix: true })}</p>
                  {isMine && <button className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(msg.id)}><Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" /></button>}
                </div>
              </div>
            )
          })}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-border/50 flex gap-2 shrink-0">
        <Input placeholder="Escreve uma mensagem..." value={input} onChange={(e) => setInput(e.target.value)} className="flex-1" disabled={sending} autoFocus />
        <Button type="submit" size="icon" disabled={!input.trim() || sending}><Send className="w-4 h-4" /></Button>
      </form>
    </div>
  )
}
