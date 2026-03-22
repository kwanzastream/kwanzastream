"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "api", label: "Uso da API" }, { id: "rate-limits", label: "Rate Limits" }, { id: "dados", label: "Dados" }, { id: "rescisao", label: "Rescisão" }]
export default function TermosDevsPage() { return (
  <LegalPageLayout title="Termos para Developers" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="api" title="1. Uso da API"><p>A API do Kwanza Stream é fornecida "as is". Não garantimos 100% de uptime.</p><p>Ao usar a API, concordas em não extrair dados em massa ou criar funcionalidade que compete directamente com a plataforma.</p></LegalSection>
    <LegalSection id="rate-limits" title="2. Rate Limits"><p>• Free: 100 req/min • Basic: 500 req/min • Pro: 2000 req/min</p><p>Exceder os limites resulta em throttling automático.</p></LegalSection>
    <LegalSection id="dados" title="3. Dados dos Utilizadores"><p>Apps que acedem a dados de utilizadores devem respeitar a Política de Privacidade do Kwanza Stream e a Lei n.º 22/11.</p></LegalSection>
    <LegalSection id="rescisao" title="4. Rescisão"><p>Reservamo-nos o direito de revogar access tokens de apps que violem estes termos.</p></LegalSection>
  </LegalPageLayout>
) }
