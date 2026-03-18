"use client"

import { useState } from "react"
import { NotificationPreferencesRow } from "@/components/notifications/notification-preferences-row"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

const EMAIL_PREFS = [
  { id: "email-live", label: "Canal ao vivo", description: "Quando um canal que segues vai ao vivo", defaultFreq: "Sempre" },
  { id: "email-follower", label: "Novo seguidor", description: "Quando alguém começa a seguir-te", defaultFreq: "Diário" },
  { id: "email-salos", label: "Salos recebidos", description: "Quando recebes Salos", defaultFreq: "Sempre", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "email-sub", label: "Nova subscrição", description: "Quando alguém subscreve o teu canal", defaultFreq: "Sempre", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "email-payout", label: "Payout processado", description: "Quando um levantamento é concluído", defaultFreq: "Sempre", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "email-newsletter", label: "Newsletter Kwanza Stream", description: "Novidades e destaques semanais", defaultFreq: "Semanal" },
  { id: "email-events", label: "Eventos e torneios", description: "Lembretes de eventos agendados", defaultFreq: "Sempre" },
  { id: "email-system", label: "Actualizações do sistema", description: "Manutenção, novas funcionalidades", defaultFreq: "Sempre" },
]

export default function NotificacoesPreferenciasEmailPage() {
  const [prefs, setPrefs] = useState<Record<string, { enabled: boolean; frequency: string }>>(
    Object.fromEntries(EMAIL_PREFS.map(p => [p.id, { enabled: true, frequency: p.defaultFreq }]))
  )

  const handleToggle = (id: string, enabled: boolean) => { setPrefs(p => ({ ...p, [id]: { ...p[id], enabled } })) }
  const handleFreq = (id: string, frequency: string) => { setPrefs(p => ({ ...p, [id]: { ...p[id], frequency } })) }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">
      <Link href="/notificacoes/preferencias" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Mail className="w-5 h-5 text-amber-400" /></div>
        <div><h1 className="text-xl font-bold">Email</h1><p className="text-xs text-muted-foreground">Preferências de email por tipo de evento</p></div>
      </div>
      <div className="space-y-2">
        {EMAIL_PREFS.map((p) => (
          <NotificationPreferencesRow key={p.id} id={p.id} label={p.label} description={p.description}
            enabled={prefs[p.id]?.enabled ?? true} onToggle={(v) => handleToggle(p.id, v)}
            locked={p.locked} lockedReason={p.lockedReason}
            frequency={prefs[p.id]?.frequency} frequencyOptions={["Sempre", "Diário", "Semanal", "Nunca"]} onFrequencyChange={(f) => handleFreq(p.id, f)} />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">💡 Eventos sociais (seguidores) são agrupados num resumo diário para evitar spam.</p>
    </div>
  )
}
