"use client"
import { ArrowLeft, CreditCard, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function MetodosPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/pagamentos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Métodos de Pagamento</h1></div>
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-2"><CreditCard className="w-10 h-10 text-muted-foreground/30 mx-auto" /><p className="text-xs font-bold">Sem métodos guardados</p><p className="text-[10px] text-muted-foreground">Para maior segurança, cada pagamento é feito individualmente. Guardar métodos estará disponível em breve.</p></div>
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-[10px] text-muted-foreground flex items-center gap-2"><Info className="w-3 h-3 text-primary shrink-0" />Métodos disponíveis: Multicaixa Express, e-Kwanza, Unitel Money, Transferência bancária</div>
    </div>
  )
}
