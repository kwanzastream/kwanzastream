"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "a1", type: "ACHIEVEMENT", isRead: false, createdAt: new Date(Date.now() - 14400000).toISOString(), data: { achievementName: "Primeiro Passo — 100 seguidores" } },
  { id: "a2", type: "ACHIEVEMENT", isRead: true, createdAt: new Date(Date.now() - 604800000).toISOString(), data: { achievementName: "Maratona — 10 horas de stream" } },
]

export default function NotificacoesConquistasPage() {
  return <NotificationCategoryPage category="conquistas" title="Conquistas" filterTypes={["ACHIEVEMENT"]} mockData={MOCK} />
}
