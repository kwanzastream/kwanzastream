"use client"
import { NotificationComposer } from "@/components/admin/notification-composer"
import { toast } from "sonner"
import api from "@/lib/api"
export default function NotificacoesEnviarPage() {
  const handleSend = async (data: any) => { try { await api.post("/api/admin/notifications/broadcast", data); toast.success(`Notificação enviada para ${data.audience}`) } catch { toast.error("Erro") } }
  return (<div className="space-y-4"><h1 className="text-xl font-bold">Enviar Notificação</h1><NotificationComposer onSend={handleSend} /></div>)
}
