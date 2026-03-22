"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function PoliticaAdsPage() { return (
  <LegalPageLayout title="Política de Publicidade" lastUpdated="1 Maio 2026">
    <LegalSection id="regras" title="Regras"><p>Todos os anúncios devem: ser legais em Angola, respeitar as Diretrizes da Comunidade, não conter conteúdo enganoso, indicar claramente o anunciante.</p></LegalSection>
    <LegalSection id="proibido" title="Anúncios Proibidos"><ul className="list-disc ml-4 space-y-1"><li>Tabaco e álcool para menores</li><li>Armas de fogo</li><li>Conteúdo sexual explícito</li><li>Esquemas financeiros (crypto scams)</li><li>Medicamentos sem receita</li></ul></LegalSection>
    <LegalSection id="formatos" title="Formatos"><p>Pre-roll (15s), banner, sponsorship overlay. Todos sujeitos a revisão pela equipa Kwanza Stream.</p></LegalSection>
  </LegalPageLayout>
) }
