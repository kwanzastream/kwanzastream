"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Settings, Zap, Shield, Radio, DollarSign } from "lucide-react"

interface FeatureFlag { key: string; enabled: boolean; description?: string }

const FLAG_META: Record<string, { label: string; desc: string; icon: any; category: string }> = {
  ENABLE_REGISTRATION: { label: "Registo de utilizadores", desc: "Permite novos registos na plataforma", icon: Shield, category: "Plataforma" },
  ENABLE_STREAMING: { label: "Streaming ao vivo", desc: "Permite transmissões RTMP na plataforma", icon: Radio, category: "Streaming" },
  ENABLE_PAYMENTS: { label: "Sistema de pagamentos", desc: "Activa depósitos e levantamentos", icon: DollarSign, category: "Pagamentos" },
  ENABLE_DONATIONS: { label: "Salos (doações)", desc: "Permite envio de Salos entre utilizadores", icon: Zap, category: "Pagamentos" },
  ENABLE_SUBSCRIPTIONS: { label: "Subscrições de canal", desc: "Activa o sistema de SUPPORTER/VIP", icon: DollarSign, category: "Pagamentos" },
  MAINTENANCE_MODE: { label: "Modo de manutenção", desc: "Exibe página de manutenção para utilizadores", icon: Settings, category: "Sistema" },
}

export default function AdminConfigPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)

  useEffect(() => {
    api.get("/api/admin/feature-flags").then((r) => setFlags(r.data?.flags || r.data || []))
      .catch(() => { setFlags(Object.keys(FLAG_META).map((key) => ({ key, enabled: key !== "MAINTENANCE_MODE" }))) })
      .finally(() => setLoading(false))
  }, [])

  const handleToggle = async (flag: FeatureFlag) => {
    setToggling(flag.key)
    try { await api.put(`/api/admin/feature-flags/${flag.key}`, { enabled: !flag.enabled }); setFlags((p) => p.map((f) => f.key === flag.key ? { ...f, enabled: !f.enabled } : f)); const meta = FLAG_META[flag.key]; toast.success(`${meta?.label || flag.key} ${!flag.enabled ? "activado" : "desactivado"}`) }
    catch { toast.error("Erro ao actualizar feature flag") } finally { setToggling(null) }
  }

  const grouped = flags.reduce<Record<string, FeatureFlag[]>>((acc, flag) => {
    const cat = FLAG_META[flag.key]?.category ?? "Outros"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(flag)
    return acc
  }, {})

  return (
    <div className="space-y-4 max-w-2xl">
      <div><h1 className="text-lg font-bold">Configurações</h1><p className="text-xs text-muted-foreground">Feature flags e controlo do sistema</p></div>
      {loading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
      : Object.entries(grouped).map(([category, catFlags]) => (
        <Card key={category} className="border-border/50"><CardHeader className="pb-2 pt-4"><CardTitle className="text-sm">{category}</CardTitle></CardHeader>
          <CardContent className="space-y-4">{catFlags.map((flag) => { const meta = FLAG_META[flag.key]; const Icon = meta?.icon ?? Settings; return (
            <div key={flag.key} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5"><Icon className="w-3.5 h-3.5 text-muted-foreground" /></div>
                <div><div className="flex items-center gap-2"><Label className="text-sm font-medium">{meta?.label || flag.key}</Label>{flag.key === "MAINTENANCE_MODE" && flag.enabled && <Badge className="text-[10px] h-4 px-1.5 bg-yellow-500/10 text-yellow-500">ACTIVO</Badge>}</div><p className="text-xs text-muted-foreground mt-0.5">{meta?.desc || flag.description || flag.key}</p></div>
              </div>
              <Switch checked={flag.enabled} onCheckedChange={() => handleToggle(flag)} disabled={toggling === flag.key} className={flag.key === "MAINTENANCE_MODE" && flag.enabled ? "data-[state=checked]:bg-yellow-500" : ""} />
            </div>
          )})}</CardContent>
        </Card>
      ))}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-muted/10"><Settings className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" /><p className="text-xs text-muted-foreground">As alterações às feature flags têm efeito imediato. O Modo de Manutenção exibe uma página de aviso para todos os utilizadores excepto admins.</p></div>
    </div>
  )
}
