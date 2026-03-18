"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { ArrowLeft, Image as ImageIcon, Link as LinkIcon, MoreVertical } from "lucide-react"
import Link from "next/link"
import { MessageBubble, type Message } from "@/components/messages/message-bubble"
import { MessageInput } from "@/components/messages/message-input"
import { TypingIndicator } from "@/components/messages/typing-indicator"

// Mock data
const MOCK_MESSAGES: Message[] = [
  { id: "1", content: "Eii mano, quando é o próximo stream?", senderId: "other", createdAt: new Date(Date.now() - 3600000).toISOString(), isRead: true, isDelivered: true, sender: { id: "other", username: "viewer_ao", displayName: "Viewer AO" } },
  { id: "2", content: "Hoje às 20h! Valorant ranked 🎮", senderId: "me", createdAt: new Date(Date.now() - 3500000).toISOString(), isRead: true, isDelivered: true, sender: { id: "me", username: "me", displayName: "Eu" } },
  { id: "3", content: "Vou tar lá! Deixa eu convidar o pessoal", senderId: "other", createdAt: new Date(Date.now() - 3400000).toISOString(), isRead: true, isDelivered: true, sender: { id: "other", username: "viewer_ao", displayName: "Viewer AO" } },
  { id: "4", content: "Mandei 200 Salos ontem, recebeste? 💰", senderId: "other", createdAt: new Date(Date.now() - 1800000).toISOString(), isRead: true, isDelivered: true, sender: { id: "other", username: "viewer_ao", displayName: "Viewer AO" } },
  { id: "5", content: "Sim! Muito obrigado mano, aprecio muito 🙏", senderId: "me", createdAt: new Date(Date.now() - 1700000).toISOString(), isRead: true, isDelivered: true, sender: { id: "me", username: "me", displayName: "Eu" } },
  { id: "6", content: "Bora fazer uma stream de co-op qualquer dia! 🚀", senderId: "me", createdAt: new Date(Date.now() - 600000).toISOString(), isRead: false, isDelivered: true, sender: { id: "me", username: "me", displayName: "Eu" } },
]

export default function ConversationPage() {
  const params = useParams()
  const convId = params.id as string
  const { user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [convInfo, setConvInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const fetchMessages = useCallback(async (silent = false) => {
    try {
      const res = await api.get(`/api/messages/conversations/${convId}`)
      setConvInfo(res.data?.conversation || { id: convId, participants: [{ id: "other", username: "viewer_ao", displayName: "Viewer AO", isOnline: true }] })
      setMessages(res.data?.messages || MOCK_MESSAGES)
    } catch { if (!silent) { setConvInfo({ id: convId, participants: [{ id: "other", username: "viewer_ao", displayName: "Viewer AO", isOnline: true }] }); setMessages(MOCK_MESSAGES) } }
    finally { setLoading(false) }
  }, [convId])

  // Polling with visibilitychange (correction #5)
  const startPolling = useCallback(() => {
    if (pollRef.current) return
    pollRef.current = setInterval(() => fetchMessages(true), 5000)
  }, [fetchMessages])

  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = undefined }
  }, [])

  useEffect(() => {
    fetchMessages()
    startPolling()

    const handleVisibility = () => {
      if (document.hidden) stopPolling()
      else { fetchMessages(true); startPolling() }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => { stopPolling(); document.removeEventListener("visibilitychange", handleVisibility) }
  }, [fetchMessages, startPolling, stopPolling])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  // Mock typing indicator
  useEffect(() => {
    const timer = setInterval(() => { setIsTyping(true); setTimeout(() => setIsTyping(false), 2000) }, 15000)
    return () => clearInterval(timer)
  }, [])

  const handleSend = async (content: string, attachment?: File) => {
    const newMsg: Message = { id: `local-${Date.now()}`, content, senderId: user?.id || "me", createdAt: new Date().toISOString(), isRead: false, isDelivered: false, sender: { id: user?.id || "me", username: user?.username || "me", displayName: user?.displayName || "Eu" } }
    setMessages(prev => [...prev, newMsg])
    // Mark as delivered after 500ms (optimistic)
    setTimeout(() => setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, isDelivered: true } : m)), 500)
    try { await api.post("/api/messages/", { conversationId: convId, content }) } catch {}
  }

  const handleDelete = async (msgId: string) => {
    setMessages(prev => prev.filter(m => m.id !== msgId))
    try { await api.delete(`/api/messages/${msgId}`) } catch { toast.error("Erro ao apagar") }
  }

  const handleReport = (msgId: string) => { toast.success("Denúncia enviada"); setShowMenu(false) }

  // Reverse pagination: scroll up to load older
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    if (containerRef.current.scrollTop === 0) {
      const prevHeight = containerRef.current.scrollHeight
      // Load older messages would go here
      // After loading: containerRef.current.scrollTop = containerRef.current.scrollHeight - prevHeight
    }
  }, [])

  const otherUser = convInfo?.participants?.find((p: any) => p.id !== (user?.id || "me"))

  // Group messages by time (5 min window)
  const shouldShowTimestamp = (i: number) => {
    if (i === 0) return true
    const prev = new Date(messages[i - 1].createdAt).getTime()
    const curr = new Date(messages[i].createdAt).getTime()
    return curr - prev > 300000 // 5 min
  }

  const shouldShowAvatar = (i: number) => {
    if (i === messages.length - 1) return true
    return messages[i].senderId !== messages[i + 1].senderId
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.push("/mensagens")}><ArrowLeft className="w-4 h-4" /></Button>
        {loading ? <Skeleton className="h-10 w-40 rounded-lg" /> : otherUser && (
          <Link href={`/${otherUser.username}`} className="flex items-center gap-2 hover:opacity-80 flex-1 min-w-0">
            <div className="relative">
              <Avatar className="w-9 h-9"><AvatarImage src={otherUser.avatarUrl} /><AvatarFallback className="text-xs">{otherUser.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
              {otherUser.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />}
            </div>
            <div className="min-w-0"><p className="text-sm font-semibold leading-none truncate">{otherUser.displayName}</p><p className="text-[10px] text-muted-foreground mt-0.5">{otherUser.isOnline ? "Online" : "Offline"}</p></div>
          </Link>
        )}
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowMenu(!showMenu)}><MoreVertical className="w-4 h-4" /></Button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-popover border border-white/10 rounded-xl shadow-xl z-50 py-1 min-w-[160px]">
              <Link href={`/mensagens/${convId}/media`}><button className="w-full text-left px-3 py-2 text-xs hover:bg-muted flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5" />Media partilhada</button></Link>
              <Link href={`/mensagens/${convId}/links`}><button className="w-full text-left px-3 py-2 text-xs hover:bg-muted flex items-center gap-2"><LinkIcon className="w-3.5 h-3.5" />Links partilhados</button></Link>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2" onScroll={handleScroll}>
        {loading ? Array(6).fill(0).map((_, i) => <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}><Skeleton className="h-10 w-48 rounded-2xl" /></div>)
        : messages.length === 0 ? <div className="text-center py-8"><p className="text-sm text-muted-foreground">Sem mensagens ainda. Diz olá! 👋</p></div>
        : messages.map((msg, i) => (
          <MessageBubble key={msg.id} message={msg} isMine={msg.senderId === (user?.id || "me")} showAvatar={shouldShowAvatar(i)} showTimestamp={shouldShowTimestamp(i)} onDelete={handleDelete} onReport={handleReport} />
        ))}
        {isTyping && <TypingIndicator username={otherUser?.username} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  )
}
