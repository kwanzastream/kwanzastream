"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function PagamentoFalhouPage() { return (
  <ErrorPageLayout icon="❌" title="Pagamento Falhado" description="O teu pagamento não foi processado. Razões possíveis: saldo insuficiente, referência expirada, ou erro de comunicação com o banco. O teu dinheiro não foi debitado." primaryAction={{ label: "Tentar novamente", href: "/pagamento-falhou/tentar-novamente" }} secondaryAction={{ label: "Contactar suporte", href: "/suporte" }} showSystemStatus>
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left"><p className="text-[10px] text-muted-foreground">Código: <span className="font-mono text-foreground">PAY_FAILED_001</span></p><p className="text-[10px] text-muted-foreground">Referência: <span className="font-mono text-foreground">REF-2026-XXXXXX</span></p></div>
  </ErrorPageLayout>
) }
