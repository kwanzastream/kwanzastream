"use client"
import { ConnectedServiceRow, type ConnectedServiceData } from "@/components/settings/connected-service-row"
import { Link2 } from "lucide-react"
import { toast } from "sonner"

const SERVICES: ConnectedServiceData[] = [
  { id: "google", name: "Google", icon: "🔍", connected: true, detail: "streamer@gmail.com" },
  { id: "whatsapp", name: "WhatsApp", icon: "💬", connected: true, detail: "+244 9XX XXX XXX" },
  { id: "obs", name: "OBS Studio", icon: "🎥", connected: false, detail: "Plugin de integração" },
  { id: "discord", name: "Discord", icon: "🎮", connected: false, detail: "Bot de notificações (v2)" },
]

export default function ConexoesPage() {
  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-lg font-bold flex items-center gap-2"><Link2 className="w-5 h-5" />Conexões Externas</h1>
      <p className="text-[10px] text-muted-foreground">Serviços ligados à tua conta.</p>
      <div className="space-y-1.5">{SERVICES.map(s => <ConnectedServiceRow key={s.id} service={s} onToggle={() => toast.success(`${s.name}: ${s.connected ? "desligado" : "ligado"}`)} />)}</div>
    </div>
  )
}
