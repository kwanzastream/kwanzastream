"use client"
import { ArrowLeft, Database, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function DadosPessoaisPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/privacidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Database className="w-5 h-5" />Os Meus Dados</h1></div>
      {[{t:"Dados recolhidos",items:["Perfil (nome, bio, foto)","Histórico de streams","Mensagens e chat","Transacções financeiras","Endereço IP e dispositivo"]},{t:"Utilização",items:["Personalizar experiência","Processar pagamentos","Melhorar a plataforma","Prevenir fraude"]},{t:"Partilha",items:["Não vendemos dados a terceiros","Partilhados com providers de pagamento (Multicaixa, EMIS)","Autoridades quando legalmente obrigatório"]},{t:"Os teus direitos",items:["Aceder aos teus dados","Corrigir informações","Exportar dados","Eliminar conta","Lei angolana de protecção de dados aplica-se"]}].map(s => <div key={s.t} className="space-y-1"><p className="text-xs font-bold flex items-center gap-1"><Shield className="w-3 h-3 text-primary" />{s.t}</p><ul className="text-[10px] text-muted-foreground space-y-0.5 pl-4">{s.items.map(i => <li key={i} className="list-disc">{i}</li>)}</ul></div>)}
    </div>
  )
}
