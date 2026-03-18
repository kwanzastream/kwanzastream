"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"
import { ChatMessage } from "@/hooks/use-chat"
import { StreamChatInput } from "./stream-chat-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, ChevronDown, Shield, Star, Crown, Gem, Zap } from "lucide-react"
import Link from "next/link"

// Badge hierarchy: streamer → mod → vip → subscriber → ambassador
const BADGE_CONFIG: Record<string, { icon: typeof Shield; color: string; label: string }> = {
  streamer:    { icon: Shield, color: "#CE1126", label: "Streamer" },
  moderator:   { icon: Shield, color: "#00B300", label: "Mod" },
  vip:         { icon: Star,   color: "#F9D616", label: "VIP" },
  subscriber:  { icon: Crown,  color: "#7B2FBE", label: "Sub" },
  subscriber2: { icon: Crown,  color: "#7B2FBE", label: "Sub T2" },
  subscriber3: { icon: Gem,    color: "#7B2FBE", label: "Sub T3" },
  ambassador:  { icon: Zap,    color: "#FF6B00", label: "Embaixador" },
}

interface StreamChatProps {
  messages: ChatMessage[]
  viewerCount: number
  isConnected: boolean
  sendMessage: (msg: string) => void
  username: string
  streamId: string
  chatMode?: "normal" | "followers" | "subscribers" | "slow" | "readonly"
  slowModeSeconds?: number
  compact?: boolean
}

export function StreamChat({
  messages, viewerCount, isConnected, sendMessage, username, streamId,
  chatMode = "normal", slowModeSeconds = 0, compact = false,
}: StreamChatProps) {
  const { isAuthenticated } = useAuth()
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [newMsgCount, setNewMsgCount] = useState(0)

  // Auto-scroll logic
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    setNewMsgCount(0)
    setIsAtBottom(true)
  }, [])

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    } else {
      setNewMsgCount(c => c + 1)
    }
  }, [messages.length, isAtBottom])

  const handleScroll = (e: React.UIEvent) => {
    const el = e.currentTarget
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60
    setIsAtBottom(atBottom)
    if (atBottom) setNewMsgCount(0)
  }

  const timeSince = (date: Date) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 10) return "agora"
    if (s < 60) return `${s}s`
    const m = Math.floor(s / 60)
    if (m < 60) return `${m}min`
    return `${Math.floor(m / 60)}h`
  }

  const renderBadges = (badges?: string[]) => {
    if (!badges?.length) return null
    return badges.map((badge) => {
      const config = BADGE_CONFIG[badge]
      if (!config) return null
      const Icon = config.icon
      return (
        <span key={badge} title={config.label} className="inline-flex shrink-0">
          <Icon className="w-4 h-4" style={{ color: config.color }} />
        </span>
      )
    })
  }

  return (
    <div className={`flex flex-col ${compact ? "h-full" : "h-[calc(100vh-3.5rem)]"} border-l border-white/10 bg-black/40 backdrop-blur-xl`}>
      {/* Header */}
      {!compact && (
        <div className="flex items-center gap-2 p-3 border-b border-white/10 shrink-0">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider">Chat</span>
          {chatMode !== "normal" && (
            <Badge variant="secondary" className="text-[8px] ml-auto">
              {chatMode === "followers" ? "Seguidores" : chatMode === "subscribers" ? "Subscritores" : chatMode === "slow" ? `Lento (${slowModeSeconds}s)` : "Leitura"}
            </Badge>
          )}
          <span className={`w-1.5 h-1.5 rounded-full ${compact ? "" : "ml-auto"} ${isConnected ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`} title={isConnected ? "Conectado" : "A reconectar..."} />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 relative" onScroll={handleScroll}>
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-muted-foreground">Sê o primeiro a escrever no chat!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-1.5 text-[13px] leading-snug py-0.5 rounded px-1 ${
                msg.type === "donation" ? "bg-[#F9D616]/10" : msg.type === "system" ? "text-muted-foreground italic text-xs" : "hover:bg-white/5"
              }`}
            >
              {msg.type !== "system" && (
                <Avatar className="w-5 h-5 shrink-0 mt-0.5">
                  <AvatarImage src={msg.avatarUrl} />
                  <AvatarFallback className="text-[8px] bg-primary/20 text-primary">
                    {(msg.displayName || msg.username || "?").slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 min-w-0 break-words">
                {msg.type !== "system" && (
                  <span className="inline-flex items-center gap-0.5 mr-1">
                    {renderBadges(msg.badges)}
                    <span className="font-semibold text-white/90">{msg.displayName || msg.username}</span>
                  </span>
                )}
                {msg.type === "donation" && (
                  <span className="text-[#F9D616] mr-1">💰 {msg.amount} Salos</span>
                )}
                <span className="text-white/70">{msg.message}</span>
                <span className="text-white/20 text-[10px] ml-1">{timeSince(msg.timestamp)}</span>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* New messages indicator */}
      {!isAtBottom && newMsgCount > 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
          <Button size="sm" variant="secondary" className="text-xs gap-1 shadow-lg" onClick={scrollToBottom}>
            <ChevronDown className="w-3 h-3" /> {newMsgCount} novas mensagens
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0">
        <StreamChatInput
          isAuthenticated={isAuthenticated}
          isConnected={isConnected}
          sendMessage={sendMessage}
          username={username}
          chatMode={chatMode}
          slowModeSeconds={slowModeSeconds}
        />
      </div>
    </div>
  )
}
