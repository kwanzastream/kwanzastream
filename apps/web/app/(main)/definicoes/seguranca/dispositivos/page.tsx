"use client"
import { SessionDeviceCard, type SessionData } from "@/components/settings/session-device-card"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const DEVICES: SessionData[] = [
  { id: "d1", device: "desktop", os: "Chrome · Windows 11", location: "Luanda", lastActive: "Confiável desde 1 Mar", current: true },
  { id: "d2", device: "mobile", os: "Safari · iPhone 15", location: "Luanda", lastActive: "Confiável desde 15 Fev" },
]
export default function DispositivosPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5" />Dispositivos Autorizados</h1></div>
      <p className="text-[10px] text-muted-foreground">Remover → próximo login pede 2FA nesse dispositivo.</p>
      <div className="space-y-1.5">{DEVICES.map(d => <SessionDeviceCard key={d.id} session={d} onRevoke={() => toast.success("Dispositivo removido!")} />)}</div>
    </div>
  )
}
