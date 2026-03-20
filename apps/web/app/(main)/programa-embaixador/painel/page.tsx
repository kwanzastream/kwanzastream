"use client"
import { ArrowLeft, BarChart3, Link2, DollarSign, FolderOpen } from "lucide-react"
import { SettingsRow } from "@/components/settings/settings-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PainelPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-embaixador"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2">👑 Painel do Embaixador</h1></div>
      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 grid grid-cols-3 gap-4 text-center">{[{l:"Referrals",v:"45"},{l:"Comissões",v:"12.500 Kz"},{l:"Mês activo",v:"6"}].map(s => <div key={s.l}><p className="text-lg font-black text-yellow-400">{s.v}</p><p className="text-[8px] text-muted-foreground">{s.l}</p></div>)}</div>
      <SettingsRow label="Links de referral" desc="Links e rastreio" href="/programa-embaixador/painel/links"><Link2 className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Comissões" desc="Ganhos por referrals" href="/programa-embaixador/painel/comissoes"><DollarSign className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Materiais" desc="Logos, guidelines, templates" href="/programa-embaixador/painel/materiais"><FolderOpen className="w-3 h-3 text-muted-foreground" /></SettingsRow>
    </div>
  )
}
