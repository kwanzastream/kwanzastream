"use client"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-components"
import { Shield, Key, Smartphone, Monitor, Clock, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export default function SegurancaPage() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5" />Segurança</h1>
      <div className="p-4 rounded-xl border border-white/10 grid grid-cols-2 gap-4">
        <div><p className="text-[9px] text-muted-foreground">2FA</p><Badge className="bg-red-500/10 text-red-400 text-[8px]"><X className="w-3 h-3" />Inactivo</Badge></div>
        <div><p className="text-[9px] text-muted-foreground">Senha alterada</p><p className="text-xs font-bold">há 45 dias</p></div>
        <div><p className="text-[9px] text-muted-foreground">Sessões activas</p><p className="text-xs font-bold">3 dispositivos</p></div>
        <div><p className="text-[9px] text-muted-foreground">Último login</p><p className="text-xs font-bold">Hoje, 14:30</p></div>
      </div>
      <SettingsSection title="Conta">
        <SettingsRow label="Alterar senha" desc="Última alteração: há 45 dias" href="/definicoes/seguranca/senha"><Key className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Autenticação em duas etapas" desc="Inactivo" href="/definicoes/seguranca/duas-etapas"><Smartphone className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      </SettingsSection>
      <SettingsSection title="Dispositivos">
        <SettingsRow label="Sessões activas" desc="3 dispositivos" href="/definicoes/seguranca/sessoes-activas"><Monitor className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Histórico de login" desc="Últimos 30 logins" href="/definicoes/seguranca/historico-login"><Clock className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Dispositivos autorizados" href="/definicoes/seguranca/dispositivos"><Monitor className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      </SettingsSection>
    </div>
  )
}
