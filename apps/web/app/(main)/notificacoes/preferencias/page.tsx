"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, MessageSquare, Smartphone, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const CHANNELS = [
  { id: "push", label: "Push (browser/app)", description: "Notificações no telemóvel e browser", icon: <Smartphone className="w-5 h-5 text-blue-400" />, href: "/notificacoes/preferencias/push" },
  { id: "whatsapp", label: "WhatsApp", description: "Canal prioritário em Angola", icon: <MessageSquare className="w-5 h-5 text-green-400" />, href: "/notificacoes/preferencias/whatsapp", badge: "Recomendado" },
  { id: "email", label: "Email", description: "Resumos e notificações importantes", icon: <Mail className="w-5 h-5 text-amber-400" />, href: "/notificacoes/preferencias/email" },
  { id: "sms", label: "SMS", description: "Apenas para eventos críticos", icon: <Bell className="w-5 h-5 text-purple-400" />, href: "/notificacoes/preferencias/sms" },
]

export default function NotificacoesPreferenciasPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ push: true, whatsapp: true, email: true, sms: false })

  const handleToggle = (id: string, val: boolean) => {
    setEnabled(prev => ({ ...prev, [id]: val }))
    toast.success(`${id.charAt(0).toUpperCase() + id.slice(1)} ${val ? "activado" : "desactivado"}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">
      <Link href="/notificacoes/todas" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar às notificações</Link>
      <div>
        <h1 className="text-xl font-bold">Preferências de notificações</h1>
        <p className="text-xs text-muted-foreground mt-1">Escolhe como e quando queres ser notificado</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Canais de entrega</h2>
        {CHANNELS.map((ch) => (
          <Link key={ch.id} href={ch.href}>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">{ch.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{ch.label}</p>
                  {ch.badge && <Badge className="bg-green-500/20 text-green-400 text-[9px] border-none">{ch.badge}</Badge>}
                </div>
                <p className="text-[10px] text-muted-foreground">{ch.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.preventDefault()}>
                <Switch checked={enabled[ch.id]} onCheckedChange={(v) => handleToggle(ch.id, v)} />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 p-4">
        <p className="text-xs text-muted-foreground">💡 <strong>Nota:</strong> Notificações de pagamento (Salos, subscrições, payouts) nunca podem ser desactivadas por motivos de segurança financeira.</p>
      </div>
    </div>
  )
}
