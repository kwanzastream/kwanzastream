import Link from "next/link"
import { FileText } from "lucide-react"

export default function TermosStreamersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Termos para Streamers</h1>
        <p className="text-muted-foreground">Condições adicionais para criadores de conteúdo no Kwanza Stream.</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">1. Elegibilidade</h2>
          <p>Para transmitir no Kwanza Stream, deves ter pelo menos 16 anos e possuir uma conta verificada. Para monetizar (receber Salos, subscrições), deves ter pelo menos 18 anos e completar o processo de KYC (verificação de identidade).</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">2. Conteúdo Permitido</h2>
          <p>Podes transmitir qualquer conteúdo que respeite as <Link href="/diretrizes-comunidade" className="text-primary hover:underline">Diretrizes da Comunidade</Link>. Isto inclui gaming, música, conversas, educação, criatividade, desporto e mais.</p>
          <p>Conteúdo proibido: violência gráfica, conteúdo sexual explícito, incitação ao ódio, fraude, venda de drogas e actividades ilegais ao abrigo da lei angolana.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">3. Monetização e Receitas</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Salos (doações):</strong> O streamer retém 80% do valor. 20% é comissão da plataforma.</li>
            <li><strong>Subscrições:</strong> O streamer retém 70% do valor mensal da subscrição.</li>
            <li><strong>Sponsorships:</strong> Negociados directamente entre streamer e marca. Kwanza Stream não retém comissão.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">4. Pagamentos e Levantamentos</h2>
          <p>Os rendimentos são acumulados na Carteira (Wallet). Levantamentos mínimos: 5.000 Kz. Métodos: Multicaixa Express, transferência bancária, E-Kwanza. O processamento demora até 3 dias úteis.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">5. Obrigações Fiscais</h2>
          <p>Como criador, és responsável pelas tuas obrigações fiscais ao abrigo da legislação angolana. O Kwanza Stream fornece relatórios mensais de rendimentos para efeitos contabilísticos.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">6. Propriedade de Conteúdo</h2>
          <p>Tu manténs a propriedade do conteúdo que crias. Ao transmitir no Kwanza Stream, concedes à plataforma uma licença não-exclusiva para facilitar a distribuição do conteúdo (incluindo clips e VODs).</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">7. Programa Partner</h2>
          <p>Streamers seleccionados podem ser convidados para o Programa Partner, que oferece: taxas de comissão reduzidas, suporte prioritário, badge de Partner verificado, acesso antecipado a novas funcionalidades e prioridade em sponsorships.</p>
        </section>
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-muted-foreground">Última actualização: Março 2026 · <Link href="/termos" className="text-primary hover:underline">Termos Gerais</Link> · <Link href="/copyright" className="text-primary hover:underline">Copyright</Link></p>
      </div>
    </div>
  )
}
