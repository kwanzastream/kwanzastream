import Link from "next/link"
import { Clock, CreditCard, AlertCircle } from "lucide-react"

export default function PagamentoPendentePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
        <Clock className="w-8 h-8 text-yellow-500" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold">Pagamento Pendente</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          O teu pagamento está a ser processado. Isto pode demorar alguns minutos dependendo do método de pagamento.
        </p>
      </div>
      <div className="w-full max-w-sm space-y-3">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Método</span><span className="font-medium flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" />Multicaixa Express</span></div>
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Estado</span><span className="text-yellow-500 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" />A processar</span></div>
        </div>
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex gap-2">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">Confirma o pagamento na app do teu banco. Se o pagamento falhar, o valor será devolvido automaticamente.</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/wallet/saldo" className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors">Ver carteira</Link>
        <Link href="/feed" className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Voltar ao feed</Link>
      </div>
    </div>
  )
}
