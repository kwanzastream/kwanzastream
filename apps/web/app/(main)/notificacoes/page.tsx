"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, UserPlus, Gift, Radio, Wallet, CheckCheck, Loader2, ArrowLeft, Inbox } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notificationService } from "@/lib/services"

interface Notification {
  id: string
  type: string
  title: string
  body: string
  imageUrl?: string
  linkUrl?: string
  read: boolean
  createdAt: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await notificationService.getAll()
      setNotifications(data.notifications || [])
    } catch {
      // If API fails, show empty state
      setNotifications([])
    }
    setLoading(false)
  }, [])

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { data } = await notificationService.getUnreadCount()
      setUnreadCount(data.count || 0)
    } catch {
      // silently fail
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
    fetchUnreadCount()
  }, [fetchNotifications, fetchUnreadCount])

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch {
      // silently fail
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch {
      // silently fail
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "LIVE_STARTED": return <Radio className="h-3.5 w-3.5 text-red-500" />
      case "DONATION_RECEIVED": return <Gift className="h-3.5 w-3.5 text-yellow-500" />
      case "NEW_FOLLOWER": return <UserPlus className="h-3.5 w-3.5 text-blue-400" />
      case "SYSTEM": return <Bell className="h-3.5 w-3.5 text-muted-foreground" />
      default: return <Bell className="h-3.5 w-3.5 text-muted-foreground" />
    }
  }

  const getIconEmoji = (type: string) => {
    switch (type) {
      case "LIVE_STARTED": return "🔴"
      case "DONATION_RECEIVED": return "💰"
      case "NEW_FOLLOWER": return "👤"
      default: return "🔔"
    }
  }

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return "agora"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    return `${Math.floor(seconds / 86400)}d`
  }

  const filtered = activeTab === "unread"
    ? notifications.filter(n => !n.read)
    : notifications

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-2xl mx-auto w-full md:border-x border-white/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
            <Bell className="h-5 w-5 text-primary" /> Notificações
            {unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </h1>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary font-bold text-xs flex items-center gap-1"
            onClick={handleMarkAllAsRead}
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Marcar tudo
          </Button>
        )}
      </header>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-background border-b border-white/10 rounded-none h-14 p-0">
          <TabsTrigger
            value="all"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-bold"
          >
            Todas
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-bold"
          >
            Não Lidas
            {unreadCount > 0 && (
              <span className="ml-1.5 text-[10px] bg-primary/20 text-primary rounded-full px-1.5 py-0.5 font-bold">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
          <TabsContent value="all" className="mt-0 pb-20">
            {renderContent()}
          </TabsContent>
          <TabsContent value="unread" className="mt-0 pb-20">
            {renderContent()}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )

  function renderContent() {
    if (loading) {
      return (
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 md:px-6 flex gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
                <div className="h-2 bg-white/5 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Inbox className="h-10 w-10 text-muted-foreground/30" />
          </div>
          <h3 className="font-bold text-lg">
            {activeTab === "unread" ? "Tudo lido!" : "Sem notificações"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {activeTab === "unread"
              ? "Não tens notificações por ler. Bom trabalho!"
              : "Quando alguém te seguir, enviar Salos ou começar uma live, vais ver aqui."}
          </p>
          <Link href="/feed">
            <Button variant="outline" size="sm" className="border-white/10">
              Explorar Feed
            </Button>
          </Link>
        </div>
      )
    }

    return (
      <div className="divide-y divide-white/5">
        {filtered.map(n => (
          <button
            key={n.id}
            onClick={() => {
              if (!n.read) handleMarkAsRead(n.id)
              if (n.linkUrl) router.push(n.linkUrl)
            }}
            className={`w-full p-4 md:px-6 flex gap-4 text-left transition-colors cursor-pointer group ${!n.read ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-white/5"
              }`}
          >
            <div className="relative shrink-0">
              {n.imageUrl ? (
                <Avatar className="h-12 w-12 border border-white/10">
                  <AvatarImage src={n.imageUrl} alt="" />
                  <AvatarFallback>{getIconEmoji(n.type)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-lg">
                  {getIconEmoji(n.type)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-background border border-white/10 rounded-full p-1 shadow-lg">
                {getIcon(n.type)}
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm leading-relaxed">
                  <span className={`${!n.read ? "text-white font-medium" : "text-foreground/90"}`}>
                    {n.title}
                  </span>
                </p>
                <span className="text-[10px] text-muted-foreground uppercase font-black shrink-0 mt-1">
                  {timeAgo(n.createdAt)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{n.body}</p>
            </div>

            {!n.read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-5 flex-shrink-0 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    )
  }
}
