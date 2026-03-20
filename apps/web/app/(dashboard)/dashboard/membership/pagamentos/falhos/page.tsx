"use client"
import { ArrowLeft, Bell, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function PagamentosFalhosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⚠️ Pagamentos Falhos</h1>
      <div className="flex gap-1"><Link href="/dashboard/membership/pagamentos/proximos"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Próximos</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Falhos</button></div>
      <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-center"><p className="text-xs font-bold text-red-400">3 pagamentos falhos</p><p className="text-[9px] text-muted-foreground">6.000 Kz em risco</p></div>
      {[{id:"1",u:"@membro1",t:2,days:2,reason:"Saldo insuficiente"},{id:"2",u:"@membro2",t:1,days:5,reason:"Cartão expirado"},{id:"3",u:"@membro3",t:1,days:1,reason:"Erro de rede"}].map(p => <Link key={p.id} href={`/dashboard/membership/pagamentos/falhos/${p.id}`}><div className="p-3 rounded-xl border border-white/10 hover:border-red-500/20"><div className="flex justify-between"><span className="text-xs font-bold">{p.u}</span><span className="text-[8px] text-red-400">Há {p.days} dias</span></div><p className="text-[8px] text-muted-foreground">Tier {p.t} · {p.reason}</p><div className="flex gap-1 mt-1"><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.success("Notificação enviada!") }}><Bell className="w-2.5 h-2.5" />Notificar</Button><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.success("3 dias de graça") }}><Clock className="w-2.5 h-2.5" />3d graça</Button></div></div></Link>)}
    </div>
  )
}
