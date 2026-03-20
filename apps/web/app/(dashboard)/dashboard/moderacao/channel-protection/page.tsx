"use client"
import { ProtectionToggleCard } from "@/components/moderation/moderation-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ChannelProtectionPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🛡️ Protecção do Canal</h1>
      <ProtectionToggleCard icon="🔍" title="Suspicious Accounts" desc="Detectar contas suspeitas automaticamente" active />
      <ProtectionToggleCard icon="⚠️" title="Harmful Chatter" desc="Conteúdo prejudicial, ódio, ameaças" active />
      <ProtectionToggleCard icon="🤖" title="Bot Detection" desc="Detectar padrões de bot" active />
      <ProtectionToggleCard icon="🔒" title="IP Block" desc="Bloquear ranges de IP" active={false} />
      <div className="space-y-1"><Link href="/dashboard/moderacao/channel-protection/suspicious"><Button variant="outline" size="sm" className="w-full text-xs">Configurar Suspicious →</Button></Link><Link href="/dashboard/moderacao/channel-protection/harmful-chatter"><Button variant="outline" size="sm" className="w-full text-xs">Configurar Harmful →</Button></Link><Link href="/dashboard/moderacao/channel-protection/ip-block"><Button variant="outline" size="sm" className="w-full text-xs">Configurar IP Block →</Button></Link></div>
    </div>
  )
}
