"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "so1", type: "FOLLOW", isRead: false, createdAt: new Date(Date.now() - 300000).toISOString(), data: { actorUsername: "user123", actorName: "User 123" } },
  { id: "so2", type: "FOLLOW", isRead: false, createdAt: new Date(Date.now() - 360000).toISOString(), data: { actorUsername: "user456", actorName: "User 456" } },
  { id: "so3", type: "MENTION", isRead: true, createdAt: new Date(Date.now() - 5400000).toISOString(), data: { actorUsername: "viewer_ao", actorName: "Viewer AO", channelUrl: "/stream/angolangamer" } },
]

export default function NotificacoesSocialPage() {
  return <NotificationCategoryPage category="social" title="Social" filterTypes={["FOLLOW", "MENTION"]} mockData={MOCK} />
}
