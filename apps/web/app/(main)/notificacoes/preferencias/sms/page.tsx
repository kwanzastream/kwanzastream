"use client"

import { useState } from "react"
import { NotificationPreferencesRow } from "@/components/notifications/notification-preferences-row"
import { ArrowLeft, Bell, AlertTriangle } from "lucide-react"
import Link from "next/link"

const SMS_PREFS = [
  { id: "sms-payout", label: "Payout processado/falhado", description: "Quando um levantamento é concluído ou falha", locked: true, lockedReason: "Evento crítico — sempre activado" },
  { id: "sms-security", label: "Alertas de segurança", description: "Novo login detectado, password alterada", locked: true, lockedReason: "Evento crítico — sempre activado" },
  { id: "sms-large-donation", label: "Salos acima de 5.000 Kz", description: "Doações de valor elevado" },
  { id: "sms-sub", label: "Nova subscrição", description: "Quando alguém subscreve o teu canal", defaultOff: true },
  { id: "sms-follower", label: "Novo seguidor", description: "Desactivado — custo por SMS elevado", defaultOff: true },
  { id: "sms-live", label: "Canal ao vivo", description: "Desactivado — use WhatsApp para streams", defaultOff: true },
]

export default function NotificacoesPreferenciasSmsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(SMS_PREFS.map(p => [p.id, p.defaultOff ? false : true]))
  )

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">
      <Link href="/notificacoes/preferencias" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Bell className="w-5 h-5 text-purple-400" /></div>
        <div><h1 className="text-xl font-bold">SMS</h1><p className="text-xs text-muted-foreground">Apenas eventos críticos e de segurança</p></div>
      </div>

      {/* Cost warning */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-400">Aviso de custo</p>
            <p className="text-xs text-muted-foreground mt-0.5">SMS tem custo por mensagem. Recomendamos usar WhatsApp para notificações frequentes e reservar SMS apenas para alertas críticos (pagamentos e segurança).</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {SMS_PREFS.map((p) => (
          <NotificationPreferencesRow key={p.id} id={p.id} label={p.label} description={p.description}
            enabled={prefs[p.id] ?? false} onToggle={(v) => setPrefs(prev => ({ ...prev, [p.id]: v }))}
            locked={p.locked} lockedReason={p.lockedReason} />
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground">📱 SMS via Africa&apos;s Talking. Tarifas aplicáveis conforme operador (Unitel / Movicel).</p>
    </div>
  )
}
