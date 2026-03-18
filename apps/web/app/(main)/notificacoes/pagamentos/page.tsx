"use client"
import { NotificationCategoryPage } from "../category-page"
import type { Notification } from "@/components/notifications/notification-item"

const MOCK: Notification[] = [
  { id: "p1", type: "DONATION", isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString(), data: { actorUsername: "fankuduro", actorName: "Fan Kuduro", amount: 500, message: "Bom stream! 🔥" } },
  { id: "p2", type: "SUBSCRIPTION", isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString(), data: { actorUsername: "sub_user", actorName: "Sub User" } },
  { id: "p3", type: "PAYOUT", isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString(), data: { message: "Payout de 25.000 Kz processado — Multicaixa Express" } },
]

export default function NotificacoesPagamentosPage() {
  return <NotificationCategoryPage category="pagamentos" title="Pagamentos" filterTypes={["DONATION", "SUBSCRIPTION", "PAYOUT", "PAYOUT_FAILED"]} mockData={MOCK} />
}
