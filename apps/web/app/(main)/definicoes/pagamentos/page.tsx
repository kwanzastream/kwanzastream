"use client"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-components"
import { Wallet, CreditCard, ArrowUpRight } from "lucide-react"
import Link from "next/link"
export default function PagamentosPage() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><Wallet className="w-5 h-5" />Pagamentos</h1>
      <SettingsSection title="Carteira">
        <SettingsRow label="Saldo e depósito" href="/wallet/saldo"><Wallet className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Histórico de transacções" href="/wallet/historico" />
      </SettingsSection>
      <SettingsSection title="Configuração">
        <SettingsRow label="Métodos de pagamento" desc="Cada pagamento é individual (v1)" href="/definicoes/pagamentos/metodos"><CreditCard className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Configurar payouts" desc="Receber ganhos de streamer" href="/definicoes/pagamentos/payouts"><ArrowUpRight className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="KYC — Verificação" href="/kyc" />
      </SettingsSection>
    </div>
  )
}
