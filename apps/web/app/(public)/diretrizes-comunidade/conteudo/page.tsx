"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function DireConteudoPage() { return (
  <LegalPageLayout title="Diretrizes — Conteúdo" lastUpdated="1 Maio 2026">
    <LegalSection id="permitido" title="✅ O que é permitido"><ul className="list-disc ml-4 space-y-1"><li>Gaming, música, desporto, criatividade</li><li>Conteúdo cultural angolano</li><li>Debates respeitosos</li><li>Conteúdo 18+ com classificação correcta</li></ul></LegalSection>
    <LegalSection id="proibido" title="❌ O que não é permitido"><ul className="list-disc ml-4 space-y-1"><li>Discurso de ódio</li><li>Assédio ou bullying</li><li>Conteúdo sexual envolvendo menores (tolerância zero)</li><li>Violência gráfica</li><li>Spam e phishing</li><li>Conteúdo que viola direitos de autor</li><li>Desinformação perigosa</li></ul></LegalSection>
  </LegalPageLayout>
) }
