"use client"

import { useState } from "react"
import { NotificationPreferencesRow } from "@/components/notifications/notification-preferences-row"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const PUSH_PREFS = [
  { id: "push-streams", label: "Streams ao vivo", description: "Canal seguido foi ao vivo" },
  { id: "push-social", label: "Social", description: "Novos seguidores e menções" },
  { id: "push-payments", label: "Pagamentos", description: "Salos, subscrições, payouts", locked: true, lockedReason: "Pagamentos são sempre notificados" },
  { id: "push-system", label: "Sistema", description: "Actualizações e manutenção" },
  { id: "push-achievements", label: "Conquistas", description: "Novas conquistas desbloqueadas" },
  { id: "push-tournaments", label: "Torneios", description: "Inscrições e resultados" },
]

export default function NotificacoesPreferenciasPushPage() {
  const [globalEnabled, setGlobalEnabled] = useState(false)
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unknown">("unknown")
  const [showInstructions, setShowInstructions] = useState(false)
  const [dndEnabled, setDndEnabled] = useState(false)
  const [dndStart, setDndStart] = useState("23:00")
  const [dndEnd, setDndEnd] = useState("07:00")
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(PUSH_PREFS.map(p => [p.id, true]))
  )

  // Push permission flow (correction #3)
  const handleEnablePush = async () => {
    if (!("Notification" in window)) {
      toast.error("Este browser não suporta notificações push")
      return
    }

    const permission = await Notification.requestPermission()

    if (permission === "granted") {
      setGlobalEnabled(true)
      setPermissionState("granted")
      toast.success("Push activado! 🔔")
      // TODO: subscribeToPush() — enviar subscription ao servidor
    } else if (permission === "denied") {
      setPermissionState("denied")
      setShowInstructions(true)
      setGlobalEnabled(false)
      toast.error("Permissão negada — ver instruções abaixo")
    } else {
      // "default" = fechou sem decidir
      setPermissionState("default")
      setGlobalEnabled(false)
    }
  }

  const handleDisablePush = () => {
    setGlobalEnabled(false)
    toast.info("Push desactivado")
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">
      <Link href="/notificacoes/preferencias" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-blue-400" /></div>
        <div><h1 className="text-xl font-bold">Push</h1><p className="text-xs text-muted-foreground">Notificações no browser e app instalada (PWA)</p></div>
      </div>

      {/* Global toggle */}
      <div className="p-4 rounded-xl border border-white/10 flex items-center justify-between">
        <div><p className="text-sm font-bold">Push global</p><p className="text-[10px] text-muted-foreground">Activar notificações no telemóvel e browser</p></div>
        <Switch checked={globalEnabled} onCheckedChange={(v) => v ? handleEnablePush() : handleDisablePush()} />
      </div>

      {/* Permission denied instructions */}
      {showInstructions && permissionState === "denied" && (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
          <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /><p className="text-sm font-bold text-amber-400">Permissão bloqueada</p></div>
          <p className="text-xs text-muted-foreground">O browser bloqueou notificações. Para activar:</p>
          <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-1">
            <li>Clica no ícone de cadeado 🔒 na barra de endereço</li>
            <li>Procura "Notificações" nas permissões</li>
            <li>Muda de "Bloquear" para "Permitir"</li>
            <li>Recarrega a página</li>
          </ol>
        </div>
      )}

      {/* Per-type toggles */}
      {globalEnabled && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Por tipo de evento</h2>
          {PUSH_PREFS.map((p) => (
            <NotificationPreferencesRow key={p.id} id={p.id} label={p.label} description={p.description}
              enabled={prefs[p.id] ?? true} onToggle={(v) => setPrefs(prev => ({ ...prev, [p.id]: v }))}
              locked={p.locked} lockedReason={p.lockedReason} />
          ))}
        </div>
      )}

      {/* DND */}
      {globalEnabled && (
        <div className="p-4 rounded-xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-bold">🌙 Não perturbar</p><p className="text-[10px] text-muted-foreground">Silenciar push durante o horário definido (WAT)</p></div>
            <Switch checked={dndEnabled} onCheckedChange={setDndEnabled} />
          </div>
          {dndEnabled && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><Label className="text-xs">Das</Label><input type="time" value={dndStart} onChange={e => setDndStart(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs" /></div>
              <div className="flex items-center gap-1.5"><Label className="text-xs">Às</Label><input type="time" value={dndEnd} onChange={e => setDndEnd(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs" /></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
