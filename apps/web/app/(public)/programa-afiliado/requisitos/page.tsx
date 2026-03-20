"use client"
import { RequirementsChecklist, type Requirement } from "@/components/programs/program-components"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const REQS: Requirement[] = [
  { label: "50 seguidores", met: true, current: 67, required: 50 },
  { label: "8 horas transmitidas", met: true, current: 12, required: 8 },
  { label: "7 dias de stream", met: true, current: 9, required: 7 },
  { label: "Conta activa há 30 dias", met: true, current: 45, required: 30 },
  { label: "Sem violações", met: true, current: 0, required: 0 },
]
const EXPLANATIONS = [
  { q: "Porque 50 seguidores?", a: "Garante uma audiência mínima para que subscrições e Salos tenham retorno." },
  { q: "Como são calculadas as horas?", a: "Contamos horas em streams públicos nas últimas 4 semanas (28 dias). Streams privados ou de teste não contam." },
  { q: "E se eu perder elegibilidade?", a: "Se os requisitos deixarem de ser cumpridos após seres Afiliado, o estatuto mantém-se por 60 dias. Após isso, é revogado até que os critérios sejam novamente atingidos." },
]
export default function RequisitosPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/programa-afiliado"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Requisitos do Afiliado</h1></div>
      <RequirementsChecklist requirements={REQS} />
      <div className="space-y-3">{EXPLANATIONS.map(e => <div key={e.q} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-bold flex items-center gap-1"><Info className="w-3 h-3 text-primary" />{e.q}</p><p className="text-[10px] text-muted-foreground mt-1">{e.a}</p></div>)}</div>
    </div>
  )
}
