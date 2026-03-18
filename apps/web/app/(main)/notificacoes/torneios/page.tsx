"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "t1", type: "TOURNAMENT_STARTING", isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString(), data: { tournamentName: "Angola Cup FIFA" } },
  { id: "t2", type: "TOURNAMENT_SIGNUP", isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString(), data: { tournamentName: "CS2 Angola Open" } },
  { id: "t3", type: "TOURNAMENT_RESULT", isRead: true, createdAt: new Date(Date.now() - 604800000).toISOString(), data: { message: "Qualificaste-te para a fase seguinte do Angola Cup!" } },
]

export default function NotificacoesTorneiosPage() {
  return <NotificationCategoryPage category="torneios" title="Torneios" filterTypes={["TOURNAMENT_SIGNUP", "TOURNAMENT_STARTING", "TOURNAMENT_RESULT"]} mockData={MOCK} />
}
