"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={false} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">
              Última atualização: 15 de Março de 2025
            </p>
          </div>

          <Separator />

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Kwanza Stream respeita a tua privacidade e está comprometida em proteger os teus dados pessoais. 
                  Esta política explica como recolhemos, usamos e protegemos as tuas informações.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Informações que Recolhemos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Recolhemos os seguintes tipos de informações:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Informações de Conta:</strong> Nome, email, telefone, foto de perfil</li>
                  <li><strong>Dados de Uso:</strong> Histórico de visualizações, interações, preferências</li>
                  <li><strong>Dados Financeiros:</strong> Informações de transações e pagamentos (processadas de forma segura)</li>
                  <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de dispositivo, navegador</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Como Usamos as Tuas Informações</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Usamos as tuas informações para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Fornecer e melhorar os nossos serviços</li>
                  <li>Processar transações e pagamentos</li>
                  <li>Personalizar a tua experiência</li>
                  <li>Enviar notificações importantes</li>
                  <li>Garantir a segurança da plataforma</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Partilha de Informações</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Não vendemos os teus dados pessoais. Podemos partilhar informações apenas:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Com o teu consentimento explícito</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Com prestadores de serviços confiáveis (processamento de pagamentos, hospedagem)</li>
                  <li>Em caso de fusão ou aquisição da empresa</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Segurança dos Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger os teus dados, 
                  incluindo criptografia, controlos de acesso e monitorização regular.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Os Teus Direitos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Tens o direito de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Aceder aos teus dados pessoais</li>
                  <li>Corrigir informações incorretas</li>
                  <li>Solicitar a eliminação dos teus dados</li>
                  <li>Opor-te ao processamento dos teus dados</li>
                  <li>Solicitar a portabilidade dos teus dados</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies e Tecnologias Similares</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Usamos cookies e tecnologias similares para melhorar a tua experiência, analisar o uso da 
                  plataforma e personalizar conteúdo. Podes gerir as preferências de cookies nas configurações 
                  do teu navegador.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Retenção de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mantemos os teus dados pessoais apenas pelo tempo necessário para cumprir os propósitos 
                  descritos nesta política ou conforme exigido por lei.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Alterações a Esta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
                  através da plataforma ou por email.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre privacidade ou para exercer os teus direitos, contacta-nos em: 
                  privacidade@kwanza-stream.ao
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
