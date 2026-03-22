"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
const TOC = [{ id: "recolha", label: "Recolha" }, { id: "uso", label: "Uso" }, { id: "partilha", label: "Partilha" }, { id: "retencao", label: "Retenção" }, { id: "direitos", label: "Direitos" }]
export default function DadosPage() { return (
  <LegalPageLayout title="Tratamento de Dados Pessoais" lastUpdated="1 Maio 2026" toc={TOC}>
    <LegalSection id="recolha" title="1. Dados que Recolhemos"><ul className="list-disc ml-4 space-y-1"><li><strong>Dados de conta:</strong> nome, email, telefone, BI (para KYC)</li><li><strong>Dados de utilização:</strong> streams visualizados, mensagens de chat</li><li><strong>Dados técnicos:</strong> IP, browser, dispositivo</li><li><strong>Dados de pagamento:</strong> processados pela Multicaixa/EMIS</li></ul></LegalSection>
    <LegalSection id="uso" title="2. Como Usamos"><p>Os dados são usados para: fornecer o serviço, personalizar a experiência, processar pagamentos, cumprir obrigações legais.</p></LegalSection>
    <LegalSection id="partilha" title="3. Com Quem Partilhamos"><p>Partilhamos dados com: processadores de pagamento (Multicaixa/EMIS), CDN (Bunny.net para entrega de vídeo), autoridades quando legalmente obrigados.</p></LegalSection>
    <LegalSection id="retencao" title="4. Retenção"><p>Mantemos os dados enquanto a conta estiver activa. Após eliminação da conta, os dados são apagados em 30 dias, excepto dados fiscais (mantidos 5 anos por lei).</p></LegalSection>
    <LegalSection id="direitos" title="5. Os Teus Direitos"><p>Ao abrigo da Lei n.º 22/11:</p><ul className="list-disc ml-4 space-y-1"><li>Acesso aos teus dados</li><li>Correcção de dados inexactos</li><li>Eliminação da conta e dados</li><li>Portabilidade dos dados</li></ul><p>Contacto: privacidade@kwanzastream.ao</p></LegalSection>
  </LegalPageLayout>
) }
