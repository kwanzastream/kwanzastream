"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "idade", label: "Idade Mínima" }, { id: "consentimento", label: "Consentimento" }, { id: "dados", label: "Dados" }, { id: "report", label: "Reportar" }]
export default function MenoresPage() { return (
  <LegalPageLayout title="Protecção de Menores" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="idade" title="1. Idade Mínima"><p>A idade mínima para criar conta no Kwanza Stream é <strong>13 anos</strong>. Utilizadores entre 13-17 anos são considerados menores e têm protecções adicionais.</p></LegalSection>
    <LegalSection id="consentimento" title="2. Consentimento Parental"><p>Menores de 16 anos necessitam de consentimento parental para: comprar Salos, fazer streams, participar em torneios com prémios.</p></LegalSection>
    <LegalSection id="dados" title="3. Dados de Menores"><p>Recolhemos o mínimo de dados necessários de menores. Não usamos dados de menores para personalização de anúncios. Os pais podem solicitar a eliminação dos dados do menor.</p></LegalSection>
    <LegalSection id="report" title="4. Reportar"><p>Conteúdo que envolva exploração de menores tem <strong>tolerância zero</strong>. Reporta imediatamente para: seguranca@kwanzastream.ao</p></LegalSection>
  </LegalPageLayout>
) }
