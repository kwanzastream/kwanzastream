"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Shield, Database, Eye, Trash2, Lock, Globe } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    icon: Database,
    title: "1. Dados que Recolhemos",
    items: [
      { label: "Dados de Conta", desc: "Número de telemóvel angolano, nome de utilizador, email (opcional), foto de perfil" },
      { label: "Dados de Uso", desc: "Streams visualizadas, interacções no chat, doações enviadas/recebidas" },
      { label: "Dados Financeiros", desc: "Histórico de transacções Multicaixa Express, saldo da carteira, levantamentos (encriptados)" },
      { label: "Dados Técnicos", desc: "Endereço IP, tipo de dispositivo, versão do navegador, operadora móvel" },
    ],
  },
  {
    icon: Eye,
    title: "2. Como Usamos os Teus Dados",
    items: [
      { label: "Funcionamento", desc: "Autenticação via OTP/SMS, processamento de pagamentos, moderação de conteúdo" },
      { label: "Melhoria", desc: "Analytics anónimos para melhorar a experiência (PostHog — dados na UE)" },
      { label: "Comunicação", desc: "Notificações de segurança, actualizações de conta, alertas de transacções" },
      { label: "Legal", desc: "Cumprimento da Lei 22/11 e regulamentações do BNA" },
    ],
  },
  {
    icon: Lock,
    title: "3. Segurança dos Dados",
    items: [
      { label: "Encriptação", desc: "Todos os dados em trânsito usam TLS 1.3. Passwords com bcrypt (12 rounds). Tokens JWT httpOnly" },
      { label: "Acesso", desc: "Princípio do menor privilégio. Logs de auditoria para acções administrativas" },
      { label: "Infraestrutura", desc: "Servidores em provedores certificados (Render, Cloudflare). Base de dados PostgreSQL com backups" },
      { label: "Pagamentos", desc: "Processados via Multicaixa Express (EMIS). Nunca armazenamos dados de cartão/conta bancária directamente" },
    ],
  },
  {
    icon: Globe,
    title: "4. Partilha de Dados",
    items: [
      { label: "Nunca vendemos", desc: "Os teus dados pessoais nunca são vendidos a terceiros" },
      { label: "Processadores", desc: "EMIS/Multicaixa (pagamentos), Africa's Talking (SMS), Cloudflare (CDN), PostHog (analytics — UE)" },
      { label: "Autoridades", desc: "Apenas quando exigido por lei angolana ou decisão judicial" },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Badge className="bg-green-500/20 text-green-400 border-none px-4 py-1">
              Conforme Lei 22/11 de Angola
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">
              Última actualização: 6 de Março de 2026
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              A Kwanza Stream está comprometida com a protecção dos teus dados pessoais,
              em conformidade com a <strong>Lei 22/11 de Protecção de Dados Pessoais</strong> da
              República de Angola e as melhores práticas internacionais.
            </p>
          </div>

          <Separator />

          {/* Sections */}
          {sections.map((section, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <div className="grid gap-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      <span className="font-semibold text-sm min-w-[120px] text-foreground">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Rights Section — Lei 22/11 */}
          <Card className="border-green-500/30">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-xl text-green-500">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold">5. Os Teus Direitos (Lei 22/11)</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Nos termos da Lei de Protecção de Dados Pessoais de Angola, tens os seguintes direitos:
              </p>
              <div className="grid gap-2">
                {[
                  "Direito de acesso — Pedir uma cópia de todos os dados que temos sobre ti",
                  "Direito de rectificação — Corrigir dados incorrectos ou desactualizados",
                  "Direito ao apagamento — Solicitar a eliminação dos teus dados pessoais (Direito ao Esquecimento)",
                  "Direito de oposição — Opor-te ao processamento dos teus dados para fins específicos",
                  "Direito à portabilidade — Receber os teus dados num formato estruturado e legível por máquina",
                ].map((right, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-muted-foreground">{right}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Para exercer qualquer direito, usa a opção <strong>&quot;Apagar Conta&quot;</strong> nas Definições
                ou contacta-nos em <strong>privacidade@kwanza-stream.ao</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Trash2 className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold">6. Retenção de Dados</h2>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex gap-3 items-start">
                  <span className="font-semibold min-w-[160px]">Dados de conta</span>
                  <span className="text-muted-foreground">Enquanto a conta estiver activa. Eliminados 30 dias após pedido de apagamento.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-semibold min-w-[160px]">Dados financeiros</span>
                  <span className="text-muted-foreground">Retidos 7 anos após a transacção (requisito BNA/regulação bancária angolana).</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-semibold min-w-[160px]">Logs de segurança</span>
                  <span className="text-muted-foreground">Retidos 12 meses para investigação de incidentes.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-semibold min-w-[160px]">Analytics</span>
                  <span className="text-muted-foreground">Dados anónimos, sem identificação pessoal. Retidos indefinidamente.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-bold">7. Contacto</h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Para questões de privacidade ou para exercer os teus direitos:</p>
                <p>📧 <strong>privacidade@kwanza-stream.ao</strong></p>
                <p>📍 Luanda, Angola</p>
              </div>
              <div className="flex gap-4 pt-2">
                <Link href="/legal/termos" className="text-sm text-primary hover:underline">Termos de Serviço</Link>
                <Link href="/legal/comunidade" className="text-sm text-primary hover:underline">Regras da Comunidade</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
