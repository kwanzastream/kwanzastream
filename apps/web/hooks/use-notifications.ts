"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

export function useNotifications() {
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!user) return
    const fetch = () =>
      api.get("/api/notifications/")
        .then((res) => {
          const notifs = res.data?.notifications || res.data || []
          setUnreadCount(notifs.filter((n: any) => !n.isRead).length)
        })
        .catch(() => {})

    fetch()
    const interval = setInterval(fetch, 30000)
    return () => clearInterval(interval)
  }, [user])

  return { unreadCount }
}
