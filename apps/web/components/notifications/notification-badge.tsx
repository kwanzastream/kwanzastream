"use client"

import { Badge } from "@/components/ui/badge"

interface NotificationBadgeProps {
  count: number
  className?: string
}

export function NotificationBadge({ count, className = "" }: NotificationBadgeProps) {
  if (count === 0) return null
  return (
    <Badge className={`bg-primary text-primary-foreground text-[10px] px-1.5 h-5 ${className}`}>
      {count > 99 ? "99+" : count}
    </Badge>
  )
}
