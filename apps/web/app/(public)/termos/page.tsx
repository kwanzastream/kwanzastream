"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: 15 de Março de 2025
            </p>
          </div>

          <Separator />

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao aceder e usar a plataforma Kwanza Stream, aceitas estar vinculado a estes Termos de Uso. 
                  Se não concordas com qualquer parte destes termos, não deves usar a nossa plataforma.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Descrição do Serviço</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A Kwanza Stream é uma plataforma de streaming ao vivo que permite:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Transmissão de conteúdo ao vivo em vídeo e áudio</li>
                  <li>Interação entre criadores e espectadores</li>
                  <li>Sistema de monetização através de Salos (presentes digitais)</li>
                  <li>Gestão de eventos digitais</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Conta de Usuário</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Para usar certas funcionalidades da plataforma, deves criar uma conta. És responsável por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Manter a confidencialidade das tuas credenciais</li>
                  <li>Todas as atividades que ocorrem sob a tua conta</li>
                  <li>Fornecer informações precisas e atualizadas</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Conteúdo do Usuário</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Manténs todos os direitos sobre o conteúdo que transmites. Ao usar a plataforma, concedes à 
                  Kwanza Stream uma licença não exclusiva para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Transmitir, armazenar e exibir o teu conteúdo</li>
                  <li>Usar o conteúdo para fins promocionais da plataforma</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Condutas Proibidas</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  És proibido de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Transmitir conteúdo ilegal, ofensivo ou que viole direitos de terceiros</li>
                  <li>Usar a plataforma para atividades fraudulentas</li>
                  <li>Interferir com o funcionamento da plataforma</li>
                  <li>Violar leis locais ou internacionais</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Monetização e Pagamentos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A plataforma cobra uma taxa de 5% sobre cada Salo enviado. Os saques estão sujeitos a uma 
                  taxa adicional de 2%. Todas as transações são processadas de forma segura e transparente.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Moderação</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamo-nos o direito de moderar conteúdo, suspender ou encerrar contas que violem estes 
                  termos ou as diretrizes da comunidade.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Limitação de Responsabilidade</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Kwanza Stream não se responsabiliza por perdas ou danos resultantes do uso da plataforma, 
                  incluindo interrupções de serviço ou perda de dados.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Alterações nos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar estes termos periodicamente. Notificaremos os usuários sobre mudanças 
                  significativas através da plataforma ou por email.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Lei Aplicável</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estes termos são regidos pelas leis da República de Angola. Qualquer disputa será resolvida 
                  nos tribunais competentes de Angola.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4">Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre estes termos, contacta-nos em: legal@kwanza-stream.ao
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
