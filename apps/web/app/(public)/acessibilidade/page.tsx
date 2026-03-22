"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function AcessibilidadePage() { return (
  <LegalPageLayout title="Declaração de Acessibilidade" lastUpdated="1 Maio 2026">
    <LegalSection id="compromisso" title="Compromisso"><p>O Kwanza Stream compromete-se a ser acessível a todos os utilizadores, independentemente de capacidades físicas ou cognitivas.</p></LegalSection>
    <LegalSection id="conformidade" title="Conformidade"><p><strong>Objectivo:</strong> WCAG 2.1 nível AA</p><p><strong>Estado actual:</strong> Parcialmente conforme</p></LegalSection>
    <LegalSection id="funcionalidades" title="Funcionalidades Disponíveis"><ul className="list-disc ml-4 space-y-1"><li>Navegação por teclado</li><li>Suporte a leitores de ecrã (parcial)</li><li>Modo de alto contraste</li><li>Tamanho de texto ajustável</li><li>Modo de redução de movimento</li><li>Legendas automáticas (em desenvolvimento)</li></ul></LegalSection>
    <LegalSection id="reportar" title="Reportar Problema"><p>Encontraste uma barreira de acessibilidade? Contacta-nos:</p><p className="font-mono text-foreground mt-1">acessibilidade@kwanzastream.ao</p></LegalSection>
  </LegalPageLayout>
) }
