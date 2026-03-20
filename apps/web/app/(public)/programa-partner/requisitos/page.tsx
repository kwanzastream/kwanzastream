"use client"
import { RequirementsChecklist, type Requirement } from "@/components/programs/program-components"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const REQS: Requirement[] = [
  { label: "500 seguidores", met: false, current: 67, required: 500 },
  { label: "25 viewers médios", met: false, current: 8, required: 25 },
  { label: "25 horas transmitidas", met: true, current: 28, required: 25 },
  { label: "12 dias de stream", met: false, current: 9, required: 12 },
  { label: "90 dias de conta", met: true, current: 95, required: 90 },
  { label: "Ser Afiliado", met: true, current: 1, required: 1 },
]
export default function RequisitosPartnerPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/programa-partner"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Requisitos Partner</h1></div>
      <RequirementsChecklist requirements={REQS} />
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-[10px] text-muted-foreground flex items-center gap-2"><Info className="w-3 h-3 text-primary shrink-0" />A candidatura Partner requer revisão humana. Resposta em 5–10 dias úteis.</div>
    </div>
  )
}
