"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "uso-chat", label: "Uso do Chat" }, { id: "salos", label: "Salos e Gifting" }, { id: "comportamento", label: "Comportamento" }, { id: "conta", label: "Conta" }]
export default function TermosViewersPage() { return (
  <LegalPageLayout title="Termos para Viewers" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="uso-chat" title="1. Uso do Chat"><p>Ao participar no chat, concordas em seguir as Diretrizes da Comunidade. O uso do chat é um privilégio, não um direito.</p><p>Os moderadores podem aplicar timeouts ou bans a utilizadores que violem as regras.</p></LegalSection>
    <LegalSection id="salos" title="2. Salos e Gifting"><p>Os Salos são a moeda virtual do Kwanza Stream. Ao comprar Salos, concordas que:</p><ul className="list-disc ml-4 space-y-1"><li>Os Salos não são reembolsáveis após envio ao streamer</li><li>Os Salos não têm prazo de validade</li><li>O valor dos Salos pode ser ajustado com aviso de 30 dias</li></ul></LegalSection>
    <LegalSection id="comportamento" title="3. Comportamento na Comunidade"><p>Esperamos que todos os viewers tratem os streamers e outros viewers com respeito. Assédio, discurso de ódio e spam resultam em acção disciplinar.</p></LegalSection>
    <LegalSection id="conta" title="4. Conta"><p>Cada pessoa pode ter apenas uma conta. Contas múltiplas para evitar bans resultam em suspensão permanente.</p></LegalSection>
  </LegalPageLayout>
) }
