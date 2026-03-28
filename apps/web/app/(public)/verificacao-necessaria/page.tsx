import type { Metadata } from "next"
export const metadata: Metadata = { title: "Verificacao Necessaria | Kwanza Stream", description: "Verifica a tua conta Kwanza Stream para aceder a todas as funcionalidades." }

import Link from "next/link"
import { ShieldCheck, Phone, Mail, ArrowRight } from "lucide-react"

export default function VerificacaoNecessariaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold">Verificação Necessária</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Para aceder a esta funcionalidade, precisas de verificar a tua conta. Escolhe um método de verificação abaixo.
        </p>
      </div>
      <div className="w-full max-w-sm space-y-3">
        <Link href="/registar/telefone" className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors text-left group">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Verificar por telefone</p>
            <p className="text-[10px] text-muted-foreground">Recebe um código SMS no teu número angolano</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
        <Link href="/definicoes/perfil" className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors text-left group">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Verificar por email</p>
            <p className="text-[10px] text-muted-foreground">Confirma o teu endereço de email</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">A verificação protege a tua conta e desbloqueia funcionalidades como monetização e chat.</p>
    </div>
  )
}
