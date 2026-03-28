import { Shield, AlertTriangle, FileText } from "lucide-react"
import Link from "next/link"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Direitos de Autor | Kwanza Stream",
  description: "Política de direitos de autor e DMCA do Kwanza Stream. Como reportar violações e proteger o teu conteúdo.",
  openGraph: { title: "Direitos de Autor | Kwanza Stream", description: "Política de direitos de autor e DMCA do Kwanza Stream. Como reportar violações e proteger o teu conteúdo.", type: "website" },
}

export default function CopyrightPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Política de Copyright</h1>
        <p className="text-muted-foreground">Como protegemos os direitos de autor no Kwanza Stream.</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />Protecção de Conteúdo</h2>
          <p>O Kwanza Stream respeita os direitos de propriedade intelectual de terceiros. Conteúdo que viole direitos de autor será removido após notificação válida.</p>
          <p>Todos os criadores são responsáveis pelo conteúdo que transmitem. Ao utilizar a plataforma, concordas em não transmitir conteúdo sobre o qual não tens direitos ou autorização.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><FileText className="w-4 h-4 text-primary" />Procedimento de Reclamação (DMCA)</h2>
          <p>Se acreditas que o teu conteúdo protegido por direitos de autor está a ser utilizado indevidamente no Kwanza Stream, podes enviar-nos uma notificação de remoção. A notificação deve incluir:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identificação da obra protegida por direitos de autor</li>
            <li>URL do conteúdo infractor no Kwanza Stream</li>
            <li>Os teus dados de contacto (nome, email, telefone)</li>
            <li>Declaração de boa-fé de que a utilização não é autorizada</li>
            <li>Assinatura física ou electrónica do titular dos direitos</li>
          </ul>
          <p>Envia a tua notificação para: <a href="mailto:copyright@kwanzastream.ao" className="text-primary hover:underline">copyright@kwanzastream.ao</a></p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500" />Consequências de Violação</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-primary font-bold shrink-0">1ª</span>
              <p>Aviso e remoção do conteúdo. O criador é notificado por email.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-yellow-500 font-bold shrink-0">2ª</span>
              <p>Suspensão temporária do canal por 7 dias.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-red-500 font-bold shrink-0">3ª</span>
              <p>Encerramento permanente do canal e retenção de pagamentos pendentes.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Música em Streams</h2>
          <p>Para utilizar música em streams, recomendamos:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Utilizar música original ou criada por ti</li>
            <li>Obter licenças dos artistas ou editoras</li>
            <li>Utilizar bibliotecas de música livre de royalties</li>
            <li>Dar crédito adequado aos artistas angolanos</li>
          </ul>
        </section>
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-muted-foreground">Última actualização: Março 2026 · <Link href="/termos" className="text-primary hover:underline">Ver Termos de Uso</Link></p>
      </div>
    </div>
  )
}
