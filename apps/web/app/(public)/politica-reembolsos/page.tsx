"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function PoliticaReembolsosPage() { return (
  <LegalPageLayout title="Política de Reembolsos" lastUpdated="1 Maio 2026">
    <LegalSection id="salos" title="Salos"><p>Não reembolsáveis após envio ao streamer. Excepção: stream cancelado por erro técnico da plataforma.</p></LegalSection>
    <LegalSection id="subs" title="Subscrições"><p>Cancelável a qualquer momento. Acesso mantido até fim do período pago. Sem reembolso proporcional.</p></LegalSection>
    <LegalSection id="loja-fisico" title="Loja (produtos físicos)"><p>Devolução em 14 dias se defeituoso. Custo de envio de volta por conta do comprador.</p></LegalSection>
    <LegalSection id="loja-digital" title="Loja (produtos digitais)"><p>Não reembolsáveis após download.</p></LegalSection>
  </LegalPageLayout>
) }
