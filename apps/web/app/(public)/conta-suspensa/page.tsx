import Link from "next/link"
import { Ban, Mail, AlertTriangle, Clock } from "lucide-react"

export default function ContaSuspensaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
        <Ban className="w-8 h-8 text-yellow-500" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold">Conta Suspensa</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A tua conta foi temporariamente suspensa por violação das nossas diretrizes. Revê as razões abaixo e contacta o suporte se achas que é um erro.
        </p>
      </div>
      <div className="w-full max-w-md space-y-3">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />Razões comuns de suspensão</h3>
          <ul className="text-xs text-muted-foreground space-y-1 pl-5 list-disc">
            <li>Conteúdo que viola as diretrizes da comunidade</li>
            <li>Spam ou comportamento abusivo no chat</li>
            <li>Violação de direitos de autor (3 strikes)</li>
            <li>Fraude ou manipulação de Salos</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" />Próximos passos</h3>
          <ul className="text-xs text-muted-foreground space-y-1 pl-5 list-disc">
            <li>Revê as <Link href="/diretrizes-comunidade" className="text-primary hover:underline">Diretrizes da Comunidade</Link></li>
            <li>Contacta o suporte para apelar da suspensão</li>
            <li>Resposta dentro de 48 horas úteis</li>
          </ul>
        </div>
      </div>
      <a href="mailto:suporte@kwanzastream.ao?subject=Appeal de suspensão de conta" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
        <Mail className="w-4 h-4" /> Contactar suporte
      </a>
    </div>
  )
}
