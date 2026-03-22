"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function DireModeracaoPage() { return (
  <LegalPageLayout title="Diretrizes — Moderação" lastUpdated="1 Maio 2026">
    <LegalSection id="como" title="Como Funciona"><p>A moderação combina: AutoMod (detecção automática de spam e linguagem tóxica), moderadores do canal (nomeados pelo streamer), e moderadores globais (equipa Kwanza Stream).</p></LegalSection>
    <LegalSection id="acoes" title="Acções de Moderação"><ul className="list-disc ml-4 space-y-1"><li><strong>Aviso:</strong> mensagem de alerta</li><li><strong>Timeout:</strong> silenciamento temporário (1min-24h)</li><li><strong>Ban do canal:</strong> proibido no canal específico</li><li><strong>Ban global:</strong> proibido em toda a plataforma</li></ul></LegalSection>
    <LegalSection id="apelar" title="Como Apelar"><p>Podes apelar qualquer acção de moderação através de Definições → Segurança → Appeals, ou contactando suporte@kwanzastream.ao</p></LegalSection>
  </LegalPageLayout>
) }
