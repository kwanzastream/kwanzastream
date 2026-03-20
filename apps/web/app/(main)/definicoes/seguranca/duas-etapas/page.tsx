"use client"
import { SettingsRow } from "@/components/settings/settings-components"
import { ArrowLeft, Smartphone, Key, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function DuasEtapasPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Autenticação em Duas Etapas</h1></div>
      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center space-y-2"><Shield className="w-8 h-8 text-red-400 mx-auto" /><p className="text-sm font-bold">2FA Inactivo</p><p className="text-[9px] text-muted-foreground">Recomendamos activar para proteger a tua conta.</p></div>
      <SettingsRow label="SMS" desc="Código por SMS (Africa's Talking)" href="/definicoes/seguranca/duas-etapas/ativar?method=sms"><Smartphone className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="App Autenticador" desc="TOTP — mais seguro" href="/definicoes/seguranca/duas-etapas/ativar?method=totp"><Key className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Backup Codes" desc="Códigos de emergência" href="/definicoes/seguranca/duas-etapas/backup-codes" />
    </div>
  )
}
