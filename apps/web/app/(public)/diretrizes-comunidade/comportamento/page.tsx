"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function DireComportamentoPage() { return (
  <LegalPageLayout title="Diretrizes — Comportamento" lastUpdated="1 Maio 2026">
    <LegalSection id="respeito" title="Respeito Mútuo"><p>Trata todos os membros da comunidade com respeito. Não é necessário concordar com todos, mas é obrigatório manter um tom respeitoso.</p></LegalSection>
    <LegalSection id="assedio" title="Assédio"><p>Assédio inclui: mensagens repetidas indesejadas, perseguição entre canais, partilha de informação pessoal (doxxing), ameaças.</p><p className="text-red-400">Tolerância zero. Resultado: ban permanente.</p></LegalSection>
    <LegalSection id="moderadores" title="Respeitar Moderadores"><p>Os moderadores são voluntários ou contratados que mantêm a comunidade segura. Desrespeitar moderadores resulta em acção disciplinar.</p></LegalSection>
  </LegalPageLayout>
) }
