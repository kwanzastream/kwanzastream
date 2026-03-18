"use client"

import { useState } from "react"
import { NotificationPreferencesRow } from "@/components/notifications/notification-preferences-row"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MessageSquare, AlertTriangle, Check } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const WA_PREFS = [
  { id: "wa-live", label: "Canal ao vivo", description: "15 minutos antes de streams agendados" },
  { id: "wa-salos", label: "Salos recebidos", description: "Acima do threshold configurado abaixo", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "wa-sub", label: "Nova subscrição", description: "Quando alguém subscreve o teu canal", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "wa-payout", label: "Payout processado", description: "Quando um levantamento é concluído", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "wa-follower", label: "Novo seguidor", description: "Desactivado por defeito — pode ser muito frequente", defaultOff: true },
  { id: "wa-newsletter", label: "Newsletter", description: "Resumo semanal por WhatsApp", defaultOff: true },
]

export default function NotificacoesPreferenciasWhatsAppPage() {
  const [linked, setLinked] = useState(false) // whether WhatsApp number is linked
  const [saloThreshold, setSaloThreshold] = useState(100) // minimum Kz to notify
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(WA_PREFS.map(p => [p.id, p.defaultOff ? false : true]))
  )

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">
      <Link href="/notificacoes/preferencias" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-green-400" /></div>
        <div className="flex-1">
          <div className="flex items-center gap-2"><h1 className="text-xl font-bold">WhatsApp</h1><Badge className="bg-green-500/20 text-green-400 text-[9px] border-none">Recomendado</Badge></div>
          <p className="text-xs text-muted-foreground">Canal prioritário em Angola</p>
        </div>
      </div>

      {/* Number link status */}
      {!linked ? (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /><p className="text-sm font-bold text-amber-400">WhatsApp não ligado</p></div>
          <p className="text-xs text-muted-foreground">Liga o teu número de WhatsApp para receber notificações.</p>
          <div className="flex gap-2">
            <Link href="/definicoes/conexoes"><Button size="sm" className="text-xs gap-1">Ligar WhatsApp →</Button></Link>
            <Button size="sm" variant="outline" className="text-xs" onClick={() => { setLinked(true); toast.success("WhatsApp ligado (demo)") }}>Demo: simular ligação</Button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/5 flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" /><p className="text-sm text-green-400">WhatsApp ligado — +244 9XX XXX XXX</p>
        </div>
      )}

      {/* Salos threshold */}
      {linked && (
        <div className="p-4 rounded-xl border border-white/10 space-y-3">
          <div><p className="text-sm font-bold">Threshold de Salos</p><p className="text-[10px] text-muted-foreground">Só notificar por WhatsApp se o valor for superior a este montante</p></div>
          <div className="flex items-center gap-2">
            <Input type="number" value={saloThreshold} onChange={(e) => setSaloThreshold(Number(e.target.value))} className="w-28 text-sm" min={0} step={50} />
            <span className="text-xs text-muted-foreground">Kz</span>
          </div>
        </div>
      )}

      {/* Per-type toggles */}
      {linked && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Por tipo de evento</h2>
          {WA_PREFS.map((p) => (
            <NotificationPreferencesRow key={p.id} id={p.id} label={p.label} description={p.description}
              enabled={prefs[p.id] ?? false} onToggle={(v) => setPrefs(prev => ({ ...prev, [p.id]: v }))}
              locked={p.locked} lockedReason={p.lockedReason} />
          ))}
        </div>
      )}
    </div>
  )
}
