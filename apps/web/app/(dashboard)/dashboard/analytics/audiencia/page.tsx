"use client"
import { ArrowLeft, Users, RotateCw, ExternalLink, Smartphone, Clock, MapPin } from "lucide-react"
import { SettingsRow } from "@/components/settings/settings-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function AudienciaHubPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Users className="w-5 h-5" />Audiência</h1></div>
      <SettingsRow label="Demográficos" desc="Idade, género, países" href="/dashboard/analytics/audiencia/demograficos"><Users className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Retenção" desc="Quanto tempo ficam" href="/dashboard/analytics/audiencia/retencao"><RotateCw className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Origem de tráfego" desc="De onde vêm" href="/dashboard/analytics/audiencia/origem-trafego"><ExternalLink className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Dispositivos" desc="Mobile, desktop, PWA" href="/dashboard/analytics/audiencia/dispositivos"><Smartphone className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Horários" desc="Quando os seguidores estão online" href="/dashboard/analytics/audiencia/horarios"><Clock className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Província" desc="Distribuição geográfica" href="/dashboard/analytics/audiencia/provincia"><MapPin className="w-3 h-3 text-muted-foreground" /></SettingsRow>
    </div>
  )
}
