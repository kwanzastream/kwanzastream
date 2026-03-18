"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "s1", type: "STREAM_LIVE", isRead: false, createdAt: new Date(Date.now() - 120000).toISOString(), data: { actorUsername: "angolangamer", actorName: "Angola Gamer", streamTitle: "Valorant Ranked 🇦🇴" } },
  { id: "s2", type: "RAID", isRead: true, createdAt: new Date(Date.now() - 7200000).toISOString(), data: { actorUsername: "kuduroking", actorName: "Kuduro King" } },
  { id: "s3", type: "CLIP_FEATURED", isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString(), data: { clipTitle: "Clutch 1v5" } },
]

export default function NotificacoesStreamsPage() {
  return <NotificationCategoryPage category="streams" title="Streams" filterTypes={["STREAM_LIVE", "RAID", "CLIP_FEATURED"]} mockData={MOCK} />
}
