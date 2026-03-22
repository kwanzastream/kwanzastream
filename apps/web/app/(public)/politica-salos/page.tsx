"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function PoliticaSalosPage() { return (
  <LegalPageLayout title="Política de Salos" lastUpdated="1 Maio 2026">
    <LegalSection id="o-que-sao" title="O que são Salos"><p>Salos são a moeda virtual do Kwanza Stream. 1 Salo = 1 Kz. Podes comprar Salos com Multicaixa Express ou Unitel Money.</p></LegalSection>
    <LegalSection id="uso" title="Uso"><p>Salos são usados para: gifting a streamers, subscribe a canais, compras na loja, participação em torneios.</p></LegalSection>
    <LegalSection id="validade" title="Validade"><p>Os Salos não expiram. Mantêm o valor enquanto a tua conta estiver activa.</p></LegalSection>
    <LegalSection id="conversao" title="Conversão"><p>Streamers podem converter Salos recebidos em Kwanzas via levantamento. Comissão de 20% aplica-se (apoio à plataforma).</p></LegalSection>
  </LegalPageLayout>
) }
