"use client"
import { ArrowLeft, FileText, Shield, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ContratoPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-partner"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5" />Contrato Partner</h1></div>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">{[{icon:Shield,l:"Exclusividade",d:"Não obrigatória — podes transmitir noutras plataformas"},{icon:Clock,l:"Obrigações",d:"Mínimo 8 streams/mês, 20h total"},{icon:FileText,l:"Revenue share",d:"70% criador / 30% plataforma (ads)"},{icon:RefreshCw,l:"Duração",d:"12 meses, renovação automática"}].map(item => <div key={item.l} className="flex items-center gap-3"><item.icon className="w-4 h-4 text-primary shrink-0" /><div><p className="text-xs font-bold">{item.l}</p><p className="text-[9px] text-muted-foreground">{item.d}</p></div></div>)}</div>
      <Link href="/programa-partner/contrato/v1"><Button variant="outline" className="w-full text-xs">Ver contrato completo (v1) →</Button></Link>
    </div>
  )
}
