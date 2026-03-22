"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function DireStreamersPage() { return (
  <LegalPageLayout title="Diretrizes — Streamers" lastUpdated="1 Maio 2026">
    <LegalSection id="responsabilidade" title="Responsabilidade"><p>Como streamer, és responsável pelo conteúdo do teu canal, incluindo o comportamento dos teus viewers no chat.</p></LegalSection>
    <LegalSection id="moderacao" title="Moderação do Canal"><p>Deves nomear pelo menos 1 moderador quando tiveres mais de 30 viewers simultâneos. O AutoMod deve estar activo.</p></LegalSection>
    <LegalSection id="monetizacao" title="Monetização"><p>Streamers devem cumprir as leis fiscais angolanas. Rendimentos acima de 500.000 Kz/mês requerem KYC verificado.</p></LegalSection>
    <LegalSection id="parcerias" title="Parcerias Externas"><p>Podes promover marcas no teu canal se: sinalizas como #ad ou #publi, o produto/serviço é legal em Angola, não entra em conflito com parceiros do Kwanza Stream.</p></LegalSection>
  </LegalPageLayout>
) }
