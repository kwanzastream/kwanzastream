"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Bell, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function PagamentoFalhoDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/pagamentos/falhos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Pagamento Falho #{id}</h1></div>
      <div className="space-y-1">{[{l:"Membro",v:"@membro1"},{l:"Tier",v:"2 (1.500 Kz)"},{l:"Motivo",v:"Saldo insuficiente"},{l:"Falhou há",v:"2 dias"},{l:"Próximo retry",v:"Dia 3 (automático)"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <div className="p-3 rounded-xl bg-white/5 text-[9px] text-muted-foreground space-y-1"><p><strong>Política de retry:</strong></p><p>Dia 1: Falha → Notificação 📱</p><p>Dia 3: Retry automático</p><p>Dia 7: Retry + Notificação urgente ⚠️</p><p>Dia 14: Cancelamento automático</p><p className="text-primary font-bold">Durante o período: benefícios mantidos ✅</p></div>
      <div className="space-y-1"><Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => toast.success("Notificação enviada!")}><Bell className="w-3 h-3" />Notificar (Push + WhatsApp)</Button>{[3,7,14].map(d => <Button key={d} variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => toast.success(`${d} dias de graça concedidos`)}><Clock className="w-3 h-3" />Dar {d} dias de graça</Button>)}<Button variant="outline" size="sm" className="w-full text-xs text-red-400 gap-1" onClick={() => { if(confirm("Cancelar subscrição?")) toast.info("Subscrição cancelada") }}><X className="w-3 h-3" />Cancelar subscrição</Button></div>
    </div>
  )
}
