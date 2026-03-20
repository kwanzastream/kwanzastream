"use client"
import { ArrowLeft, Award, Users, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ComoFuncionaPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/programa-embaixador"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Como Funciona</h1></div>
      {[{icon:Award,t:"Selecção",d:"Partners por 6+ meses com contribuição excepcional são considerados. Não há candidatura aberta."},{icon:Users,t:"Contribuição comunitária",d:"Embaixadores ajudam novos criadores, organizam eventos comunitários e representam a plataforma."},{icon:Heart,t:"Valores",d:"Alinhamento com os valores da plataforma: Angola-First, inclusão, criatividade, fair play."},{icon:Shield,t:"Responsabilidade",d:"Embaixadores são a face pública da Kwanza Stream. O comportamento deve reflectir os valores da comunidade."}].map(item => <div key={item.t} className="p-4 rounded-xl border border-white/10 flex items-start gap-3"><item.icon className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" /><div><p className="text-sm font-bold">{item.t}</p><p className="text-xs text-muted-foreground">{item.d}</p></div></div>)}
    </div>
  )
}
