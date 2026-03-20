"use client"
import { RaidTargetCard } from "@/components/collaborations/collab-components"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function RaidEnviarPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⚔️ Enviar Raid</h1>
      <div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar..." className="bg-white/5 pl-8" /></div>
      <p className="text-[10px] font-bold">Ao vivo agora</p>
      <RaidTargetCard username="@canal1" category="Gaming" viewers={89} onClick={() => toast.success("Raid enviado com 234 viewers!")} />
      <RaidTargetCard username="@canal2" category="Música" viewers={234} onClick={() => toast.success("Raid enviado com 234 viewers!")} />
      <div className="flex gap-1"><Link href="/dashboard/colaboracoes/raid/recebidos"><Button variant="outline" size="sm" className="flex-1 text-xs">Recebidos</Button></Link><Link href="/dashboard/colaboracoes/raid/historico"><Button variant="outline" size="sm" className="flex-1 text-xs">Histórico</Button></Link></div>
    </div>
  )
}
