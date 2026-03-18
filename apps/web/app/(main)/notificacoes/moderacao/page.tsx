"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "m1", type: "MODERATION_REPORT", isRead: false, createdAt: new Date(Date.now() - 5400000).toISOString(), data: { message: "Report recebido: mensagem ofensiva no chat" } },
  { id: "m2", type: "MODERATION_AUTOMOD", isRead: true, createdAt: new Date(Date.now() - 43200000).toISOString(), data: { message: "AutoMod eliminou 3 mensagens durante o teu último stream" } },
]

export default function NotificacoesModeracaoPage() {
  return <NotificationCategoryPage category="moderacao" title="Moderação" filterTypes={["MODERATION_REPORT", "MODERATION_AUTOMOD", "MODERATION_BAN", "MODERATION_WARNING"]} mockData={MOCK} />
}
