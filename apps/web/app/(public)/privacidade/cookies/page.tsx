"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "essenciais", label: "Essenciais" }, { id: "analise", label: "Análise" }, { id: "marketing", label: "Marketing" }, { id: "gerir", label: "Gerir" }]
export default function CookiesPage() { return (
  <LegalPageLayout title="Política de Cookies" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="essenciais" title="Cookies Essenciais (sempre activos)"><ul className="list-disc ml-4 space-y-1"><li>Sessão de autenticação</li><li>Preferências de idioma</li><li>Token CSRF</li></ul><p>Estes cookies são necessários para o funcionamento da plataforma.</p></LegalSection>
    <LegalSection id="analise" title="Cookies de Análise (opt-in)"><ul className="list-disc ml-4 space-y-1"><li>Métricas de utilização anónimas</li><li>Comportamento de navegação agregado</li></ul></LegalSection>
    <LegalSection id="marketing" title="Cookies de Marketing (opt-in)"><ul className="list-disc ml-4 space-y-1"><li>Personalização do feed</li><li>Anúncios relevantes</li></ul></LegalSection>
    <LegalSection id="gerir" title="Gerir Preferências"><p>Podes gerir as tuas preferências de cookies a qualquer momento nas definições da conta.</p><button className="mt-2 px-4 py-2 rounded-lg border border-white/10 text-xs hover:bg-white/5">⚙ Gerir preferências de cookies</button></LegalSection>
  </LegalPageLayout>
) }
