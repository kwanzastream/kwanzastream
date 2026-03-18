"use client"

import { useState, useCallback } from "react"
import { NotificationItem, type Notification } from "./notification-item"
import { InfiniteScroll } from "@/components/feed/infinite-scroll"
import { Skeleton } from "@/components/ui/skeleton"

interface NotificationListProps {
  notifications: Notification[]
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
  className?: string
}

const ONE_HOUR = 3600000

/**
 * Groups notifications by type within 1h window.
 * Applied on ALL accumulated items (correction #2).
 */
function groupNotifications(items: Notification[]): { notification: Notification; grouped?: { count: number; actors: string[] } }[] {
  const result: { notification: Notification; grouped?: { count: number; actors: string[] } }[] = []
  let i = 0
  while (i < items.length) {
    const current = items[i]
    const actors: string[] = [current.data.actorUsername || ""]
    let count = 1
    let j = i + 1
    while (j < items.length) {
      const next = items[j]
      if (next.type === current.type && Math.abs(new Date(current.createdAt).getTime() - new Date(next.createdAt).getTime()) < ONE_HOUR) {
        actors.push(next.data.actorUsername || "")
        count++
        j++
      } else break
    }
    result.push({ notification: current, grouped: count > 1 ? { count, actors } : undefined })
    i = j
  }
  return result
}

export function NotificationList({ notifications, loading, hasMore, onLoadMore, onMarkRead, onDelete, className = "" }: NotificationListProps) {
  const grouped = groupNotifications(notifications)

  if (loading && notifications.length === 0) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
      </div>
    )
  }

  return (
    <InfiniteScroll onLoadMore={onLoadMore} hasMore={hasMore} loading={loading} className={className}>
      <div className="space-y-1">
        {grouped.map(({ notification, grouped: g }) => (
          <NotificationItem key={notification.id} notification={notification} onMarkRead={onMarkRead} onDelete={onDelete} grouped={g} />
        ))}
      </div>
    </InfiniteScroll>
  )
}
