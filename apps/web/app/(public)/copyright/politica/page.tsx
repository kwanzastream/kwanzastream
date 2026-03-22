"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "protegido", label: "Conteúdo Protegido" }, { id: "biblioteca", label: "Biblioteca" }, { id: "claims", label: "Sistema de Claims" }, { id: "strikes", label: "Strikes" }]
export default function CopyrightPoliticaPage() { return (
  <LegalPageLayout title="Política de Copyright" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="protegido" title="1. Conteúdo Protegido"><ul className="list-disc ml-4 space-y-1"><li>Músicas sem licença</li><li>Conteúdo de outros criadores sem autorização</li><li>Transmissões desportivas com direitos exclusivos</li><li>Filmes e séries</li></ul></LegalSection>
    <LegalSection id="biblioteca" title="2. Biblioteca Musical Licenciada"><p>Parceria com OSSIC (Organismo angolano de direitos). Músicas angolanas disponíveis para uso gratuito em streams. Efeitos sonoros sem restrições.</p></LegalSection>
    <LegalSection id="claims" title="3. Sistema de Claims"><p>Aviso automático ao criador → 14 dias para contestar → Revisão pela equipa.</p></LegalSection>
    <LegalSection id="strikes" title="4. Strikes"><p>1 strike = aviso · 2 strikes = restrição de monetização · 3 strikes = suspensão da conta.</p></LegalSection>
  </LegalPageLayout>
) }
