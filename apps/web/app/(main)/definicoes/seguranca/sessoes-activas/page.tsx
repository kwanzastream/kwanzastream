"use client"
import { SessionDeviceCard, type SessionData } from "@/components/settings/session-device-card"
import { ArrowLeft, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const SESSIONS: SessionData[] = [
  { id: "s1", device: "desktop", os: "Chrome · Windows 11", location: "Luanda, AO", lastActive: "Agora", current: true },
  { id: "s2", device: "mobile", os: "Safari · iPhone 15", location: "Luanda, AO", lastActive: "há 2h" },
  { id: "s3", device: "tablet", os: "Chrome · iPad", location: "Benguela, AO", lastActive: "há 3 dias" },
]
export default function SessoesActivasPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Monitor className="w-5 h-5" />Sessões Activas</h1></div>
      <div className="space-y-1.5">{SESSIONS.map(s => <SessionDeviceCard key={s.id} session={s} onRevoke={() => toast.success("Sessão terminada!")} />)}</div>
      <Button variant="destructive" className="w-full text-xs" onClick={() => toast.success("Todas as outras sessões terminadas!")}>Terminar todas as outras sessões</Button>
    </div>
  )
}
