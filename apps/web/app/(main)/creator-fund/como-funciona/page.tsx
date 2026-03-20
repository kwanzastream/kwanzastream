"use client"
import { ArrowLeft, Calendar, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ComoFuncionaPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/creator-fund"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Como Funciona o Creator Fund</h1></div>
      {[{icon:Calendar,t:"Ciclos trimestrais",d:"Candidaturas abrem nos meses de Janeiro, Abril, Julho e Outubro. Cada ciclo selecciona 10–20 criadores."},{icon:Users,t:"Selecção",d:"A equipa Kwanza Stream avalia cada candidatura com base no impacto na comunidade, qualidade do conteúdo e alinhamento Angola-First."},{icon:Award,t:"Subsídios",d:"O valor varia por ciclo e depende do fundo disponível. Cada criador recebe um subsídio mensal durante 3 meses."},{icon:TrendingUp,t:"Acompanhamento",d:"Criadores apoiados submetem relatório mensal breve e participam numa sessão de mentoria por mês."}].map(item => <div key={item.t} className="p-4 rounded-xl border border-white/10 flex items-start gap-3"><item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-bold">{item.t}</p><p className="text-xs text-muted-foreground">{item.d}</p></div></div>)}
    </div>
  )
}
