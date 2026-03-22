"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "elegibilidade", label: "Elegibilidade" }, { id: "campanhas", label: "Campanhas" }, { id: "criativos", label: "Criativos" }, { id: "pagamento", label: "Pagamento" }, { id: "dados", label: "Dados" }]
export default function TermosMarcasPage() { return (
  <LegalPageLayout title="Termos para Marcas e Anunciantes" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="elegibilidade" title="1. Elegibilidade"><p>Marcas registadas em Angola ou com representação local podem anunciar no Kwanza Stream. É necessário RUPE ou NIF válido.</p></LegalSection>
    <LegalSection id="campanhas" title="2. Campanhas"><p>Todas as campanhas passam por revisão antes de serem publicadas. O prazo de revisão é de 24-48h em dias úteis.</p></LegalSection>
    <LegalSection id="criativos" title="3. Criativos"><p>Os criativos devem respeitar as Diretrizes da Comunidade. Conteúdo enganoso, discriminatório ou ilegal será rejeitado.</p></LegalSection>
    <LegalSection id="pagamento" title="4. Pagamento"><p>Os pagamentos são processados em Kwanzas (AOA) através de Multicaixa Express ou transferência bancária. IVA de 14% aplicado.</p></LegalSection>
    <LegalSection id="dados" title="5. Dados e Relatórios"><p>Fornecemos relatórios de impressões, cliques e CTR. Não partilhamos dados pessoais dos viewers com anunciantes.</p></LegalSection>
  </LegalPageLayout>
) }
