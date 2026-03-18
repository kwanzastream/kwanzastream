"use client"

import { useState, useEffect, useCallback } from "react"
import { api } from "@/lib/api"
import { NotificationTabs } from "@/components/notifications/notification-tabs"
import { NotificationList } from "@/components/notifications/notification-list"
import { NotificationEmptyState } from "@/components/notifications/notification-empty-state"
import { MarkAllReadButton } from "@/components/notifications/mark-all-read-button"
import { NotificationBadge } from "@/components/notifications/notification-badge"
import type { Notification } from "@/components/notifications/notification-item"
import { toast } from "sonner"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data
const MOCK: Notification[] = [
  { id: "1", type: "STREAM_LIVE", isRead: false, createdAt: new Date(Date.now() - 120000).toISOString(), data: { actorUsername: "angolangamer", actorName: "Angola Gamer", streamTitle: "Valorant Ranked Angola 🇦🇴" } },
  { id: "2", type: "FOLLOW", isRead: false, createdAt: new Date(Date.now() - 300000).toISOString(), data: { actorUsername: "user123", actorName: "User 123" } },
  { id: "3", type: "FOLLOW", isRead: false, createdAt: new Date(Date.now() - 360000).toISOString(), data: { actorUsername: "user456", actorName: "User 456" } },
  { id: "4", type: "FOLLOW", isRead: false, createdAt: new Date(Date.now() - 420000).toISOString(), data: { actorUsername: "user789", actorName: "User 789" } },
  { id: "5", type: "DONATION", isRead: true, createdAt: new Date(Date.now() - 3600000).toISOString(), data: { actorUsername: "fankuduro", actorName: "Fan Kuduro", amount: 500, message: "Bom stream mano! 🔥" } },
  { id: "6", type: "SUBSCRIPTION", isRead: true, createdAt: new Date(Date.now() - 7200000).toISOString(), data: { actorUsername: "sub_user", actorName: "Sub User" } },
  { id: "7", type: "ACHIEVEMENT", isRead: false, createdAt: new Date(Date.now() - 14400000).toISOString(), data: { achievementName: "Primeiro Passo — 100 seguidores" } },
  { id: "8", type: "SYSTEM", isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString(), data: { message: "Nova funcionalidade: Clips agora disponível para todos!" } },
]

export default function NotificacoesTodasPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [marking, setMarking] = useState(false)
  const [showRead, setShowRead] = useState(true)

  useEffect(() => {
    setTimeout(() => { setNotifications(MOCK); setLoading(false) }, 600)
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
    api.post("/api/notifications/mark-read", { ids: [id] }).catch(() => {})
  }, [])

  const handleDelete = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    api.delete(`/api/notifications/${id}`).catch(() => toast.error("Erro ao apagar"))
  }, [])

  const handleMarkAll = async () => {
    setMarking(true)
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    try { await api.post("/api/notifications/mark-read", { ids: notifications.filter(n => !n.isRead).map(n => n.id) }); toast.success("Marcadas como lidas") }
    catch { toast.error("Erro") } finally { setMarking(false) }
  }

  const handleClearRead = () => { setShowRead(false); toast.success("Notificações lidas ocultadas") }

  const loadMore = useCallback(() => {
    if (page >= 3) { setHasMore(false); return }
    setPage(p => p + 1)
    setTimeout(() => {
      const more = MOCK.map(n => ({ ...n, id: `${n.id}-p${page + 1}`, isRead: true }))
      setNotifications(prev => [...prev, ...more])
    }, 500)
  }, [page])

  const displayed = showRead ? notifications : notifications.filter(n => !n.isRead)

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Notificações</h1>
          <NotificationBadge count={unreadCount} />
        </div>
        <div className="flex items-center gap-2">
          <MarkAllReadButton unreadCount={unreadCount} onMarkAll={handleMarkAll} onClearRead={handleClearRead} marking={marking} />
          <Link href="/notificacoes/preferencias"><Button variant="ghost" size="icon" className="w-8 h-8"><Settings className="w-4 h-4" /></Button></Link>
        </div>
      </div>

      <NotificationTabs />

      {displayed.length === 0 && !loading ? (
        <NotificationEmptyState category="todas" />
      ) : (
        <NotificationList notifications={displayed} loading={loading} hasMore={hasMore} onLoadMore={loadMore} onMarkRead={handleMarkRead} onDelete={handleDelete} />
      )}
    </div>
  )
}
