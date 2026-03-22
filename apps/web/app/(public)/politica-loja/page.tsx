"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function PoliticaLojaPage() { return (
  <LegalPageLayout title="Política da Loja" lastUpdated="1 Maio 2026">
    <LegalSection id="vendedores" title="Vendedores"><p>Vendedores devem ter KYC verificado e NIF válido. Comissão da plataforma: 10% sobre vendas.</p></LegalSection>
    <LegalSection id="produtos" title="Produtos Permitidos"><p>Merch oficial, emotes personalizados, overlays, bots de chat. Proibido: conteúdo ilegal, contrafacção, produtos sem licença.</p></LegalSection>
    <LegalSection id="envio" title="Envio (físico)"><p>Envio para todo o território angolano. Prazo: 3-7 dias úteis para Luanda, 7-15 dias para outras províncias.</p></LegalSection>
    <LegalSection id="disputas" title="Disputas"><p>Em caso de disputa, a equipa Kwanza Stream actua como mediador. Decisão em 7 dias úteis.</p></LegalSection>
  </LegalPageLayout>
) }
