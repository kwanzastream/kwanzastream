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
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NotificationCategoryPageProps {
  category: string
  title: string
  filterTypes: string[]
  mockData: Notification[]
}

export function NotificationCategoryPage({ category, title, filterTypes, mockData }: NotificationCategoryPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [marking, setMarking] = useState(false)
  const [showRead, setShowRead] = useState(true)

  useEffect(() => {
    setTimeout(() => { setNotifications(mockData); setLoading(false) }, 500)
  }, [mockData])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
    api.post("/api/notifications/mark-read", { ids: [id] }).catch(() => {})
  }, [])

  const handleDelete = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    api.delete(`/api/notifications/${id}`).catch(() => {})
  }, [])

  const handleMarkAll = async () => {
    setMarking(true)
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    try { await api.post("/api/notifications/mark-read", { ids: notifications.filter(n => !n.isRead).map(n => n.id) }); toast.success("Marcadas") }
    catch {} finally { setMarking(false) }
  }

  const displayed = showRead ? notifications : notifications.filter(n => !n.isRead)

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><h1 className="text-xl font-bold">{title}</h1><NotificationBadge count={unreadCount} /></div>
        <div className="flex items-center gap-2">
          <MarkAllReadButton unreadCount={unreadCount} onMarkAll={handleMarkAll} onClearRead={() => { setShowRead(false); toast.success("Lidas ocultadas") }} marking={marking} />
          <Link href="/notificacoes/preferencias"><Button variant="ghost" size="icon" className="w-8 h-8"><Settings className="w-4 h-4" /></Button></Link>
        </div>
      </div>
      <NotificationTabs />
      {displayed.length === 0 && !loading ? <NotificationEmptyState category={category} /> : (
        <NotificationList notifications={displayed} loading={loading} hasMore={hasMore} onLoadMore={() => {}} onMarkRead={handleMarkRead} onDelete={handleDelete} />
      )}
    </div>
  )
}
