"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  MessageCircle, Send, ArrowLeft, Search, MoreVertical,
  Check, CheckCheck, Circle, Loader2
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface User {
  id: string
  displayName: string | null
  username: string | null
  avatarUrl: string | null
}

interface ConversationItem {
  id: string
  otherUser: User
  lastMessage: { content: string; createdAt: string; senderId: string; read: boolean } | null
  unreadCount: number
  lastMessageAt: string
}

interface Message {
  id: string
  content: string
  read: boolean
  createdAt: string
  senderId: string
  sender: User
}

export default function MessagesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [conversations, setConversations] = useState<ConversationItem[]>([])
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }
    fetchConversations()
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchConversations, 5000)
    return () => clearInterval(interval)
  }, [user])

  useEffect(() => {
    if (selectedConv) {
      fetchMessages(selectedConv)
      const interval = setInterval(() => fetchMessages(selectedConv), 3000)
      return () => clearInterval(interval)
    }
  }, [selectedConv])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/messages`, { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations || [])
      }
    } catch { }
    setLoading(false)
  }

  const fetchMessages = async (convId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/messages/${convId}`, { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
        setOtherUser(data.otherUser || null)
      }
    } catch { }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !otherUser || sending) return

    setSending(true)
    try {
      const res = await fetch(`${API_URL}/api/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recipientId: otherUser.id, content: newMessage.trim() }),
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, data.message])
        setNewMessage("")
        if (!selectedConv) setSelectedConv(data.conversationId)
        fetchConversations()
      }
    } catch { }
    setSending(false)
  }

  const timeAgo = (dateStr: string) => {
    const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (secs < 60) return "agora"
    if (secs < 3600) return `${Math.floor(secs / 60)}m`
    if (secs < 86400) return `${Math.floor(secs / 3600)}h`
    if (secs < 604800) return `${Math.floor(secs / 86400)}d`
    return new Date(dateStr).toLocaleDateString("pt-AO", { day: "numeric", month: "short" })
  }

  const filteredConversations = conversations.filter(c => {
    if (!searchQuery) return true
    const name = c.otherUser.displayName || c.otherUser.username || ""
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Mobile: show either conversation list or chat
  const showChat = selectedConv !== null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)] flex">

          {/* Conversation List — hidden on mobile when chat is open */}
          <div className={`${showChat ? "hidden md:flex" : "flex"} flex-col w-full md:w-96 border-r border-white/[0.06]`}>
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06]">
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Mensagens
              </h1>
              <div className="mt-3 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Procurar conversas..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">Sem conversas</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Visita o perfil de alguém e envia uma mensagem
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConv(conv.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.04] transition-colors border-b border-white/[0.03] ${selectedConv === conv.id ? "bg-white/[0.06]" : ""
                      }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {conv.otherUser.avatarUrl ? (
                        <img src={conv.otherUser.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center text-sm font-bold">
                          {(conv.otherUser.displayName || conv.otherUser.username || "?")[0].toUpperCase()}
                        </div>
                      )}
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                          {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? "font-bold text-white" : "font-medium text-white/80"}`}>
                          {conv.otherUser.displayName || conv.otherUser.username || "Utilizador"}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                          {conv.lastMessage ? timeAgo(conv.lastMessage.createdAt) : ""}
                        </span>
                      </div>
                      {conv.lastMessage && (
                        <div className="flex items-center gap-1 mt-0.5">
                          {conv.lastMessage.senderId === user?.id && (
                            conv.lastMessage.read
                              ? <CheckCheck className="w-3 h-3 text-primary shrink-0" />
                              : <Check className="w-3 h-3 text-muted-foreground shrink-0" />
                          )}
                          <p className={`text-xs truncate ${conv.unreadCount > 0 ? "text-white/70 font-medium" : "text-muted-foreground"}`}>
                            {conv.lastMessage.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${showChat ? "flex" : "hidden md:flex"} flex-col flex-1`}>
            {selectedConv && otherUser ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
                  <button
                    onClick={() => { setSelectedConv(null); setOtherUser(null) }}
                    className="md:hidden p-1 hover:bg-white/[0.05] rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  {otherUser.avatarUrl ? (
                    <img src={otherUser.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center text-xs font-bold">
                      {(otherUser.displayName || otherUser.username || "?")[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {otherUser.displayName || otherUser.username}
                    </p>
                    <p className="text-[10px] text-muted-foreground">@{otherUser.username}</p>
                  </div>
                  <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageCircle className="w-10 h-10 text-muted-foreground/20 mb-2" />
                      <p className="text-sm text-muted-foreground">Envia a primeira mensagem!</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMine = msg.senderId === user?.id
                      return (
                        <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMine
                              ? "bg-primary/90 text-white rounded-br-md"
                              : "bg-white/[0.06] text-white rounded-bl-md"
                            }`}>
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                            <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : ""}`}>
                              <span className="text-[10px] opacity-60">
                                {new Date(msg.createdAt).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              {isMine && (
                                msg.read
                                  ? <CheckCheck className="w-3 h-3 opacity-80" />
                                  : <Check className="w-3 h-3 opacity-50" />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/[0.06]">
                  <form
                    onSubmit={(e) => { e.preventDefault(); sendMessage() }}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escreve uma mensagem..."
                      maxLength={1000}
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="p-3 bg-primary rounded-xl text-white hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-10 h-10 text-primary/50" />
                </div>
                <h2 className="text-lg font-bold text-white mb-1">As tuas mensagens</h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Seleciona uma conversa para ver as mensagens ou visita o perfil de um creator para iniciar
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
