"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RequirementsChecklist, type Requirement } from "@/components/programs/program-components"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const REQS: Requirement[] = [
  { label: "50 seguidores (tens: 67)", met: true, current: 67, required: 50 },
  { label: "8 horas (tens: 12h)", met: true, current: 12, required: 8 },
  { label: "7 dias (tens: 9 dias)", met: true, current: 9, required: 7 },
  { label: "Conta activa há 30+ dias", met: true, current: 45, required: 30 },
]
export default function CandidaturaPage() {
  const router = useRouter()
  const [terms, setTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-afiliado"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Candidatura Afiliado</h1></div>
      <p className="text-xs text-muted-foreground">Verificação automática dos critérios:</p>
      <RequirementsChecklist requirements={REQS} />
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} className="rounded" /><span className="text-xs">Li e aceito os Termos do Programa Afiliado</span></label>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!terms || submitting} onClick={() => { setSubmitting(true); setTimeout(() => { toast.success("Candidatura aprovada! Bem-vindo ao Programa Afiliado! 🏅"); router.push("/programa-afiliado/candidatura/estado") }, 2000) }}>{submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A verificar...</> : <><Check className="w-4 h-4" />Submeter candidatura</>}</Button>
    </div>
  )
}
