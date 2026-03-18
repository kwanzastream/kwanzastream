"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "sys1", type: "SYSTEM", isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString(), data: { message: "Nova funcionalidade: Clips agora disponível para todos!" } },
  { id: "sys2", type: "SYSTEM", isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString(), data: { message: "Manutenção programada: 20 de Março, 3h-5h WAT" } },
]

export default function NotificacoesSistemaPage() {
  return <NotificationCategoryPage category="sistema" title="Sistema" filterTypes={["SYSTEM"]} mockData={MOCK} />
}
