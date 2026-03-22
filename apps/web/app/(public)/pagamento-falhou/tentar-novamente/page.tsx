"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function PagamentoTentarNovamentePage() { return (
  <ErrorPageLayout icon="🔄" title="Tentar Novamente" description="Serás redirigido para o método de pagamento. Se o problema persistir, contacta o suporte." primaryAction={{ label: "Ir para Wallet", href: "/wallet" }} secondaryAction={{ label: "Contactar suporte", href: "/suporte" }} />
) }
