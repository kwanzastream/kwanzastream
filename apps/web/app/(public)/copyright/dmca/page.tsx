"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
export default function DmcaPage() { return (
  <LegalPageLayout title="Processo DMCA" lastUpdated="1 Maio 2026">
    <LegalSection id="o-que-e" title="O que é um pedido DMCA?"><p>O Digital Millennium Copyright Act (DMCA) permite a titulares de direitos de autor solicitar a remoção de conteúdo que viole os seus direitos.</p></LegalSection>
    <LegalSection id="como-submeter" title="Como submeter"><p>Envia um email para copyright@kwanzastream.ao com:</p><ul className="list-disc ml-4 space-y-1"><li>Identificação do conteúdo protegido</li><li>URL do conteúdo infractor no Kwanza Stream</li><li>Declaração de boa-fé</li><li>Assinatura (física ou electrónica)</li><li>Dados de contacto</li></ul></LegalSection>
    <LegalSection id="prazo" title="Prazo de resposta"><p>Respondemos a pedidos DMCA válidos em 48-72 horas úteis. O criador é notificado e tem 14 dias para contestar.</p></LegalSection>
  </LegalPageLayout>
) }
