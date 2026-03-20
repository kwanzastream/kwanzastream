"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function CandidaturaFundPage() {
  const router = useRouter()
  const [desc, setDesc] = useState("")
  const [impacto, setImpacto] = useState("")
  const [objectivos, setObjectivos] = useState("")
  const [orcamento, setOrcamento] = useState("")
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/creator-fund"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Candidatura ao Creator Fund</h1></div>
      <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 text-xs text-muted-foreground text-center">Ciclo Abril 2026 — candidaturas abertas até 31 Mar</div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Descrição do projecto</p><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={5} maxLength={1000} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /><p className="text-[8px] text-muted-foreground text-right">{desc.length}/1000</p></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Que impacto terá na comunidade angolana?</p><textarea value={impacto} onChange={e => setImpacto(e.target.value)} rows={3} maxLength={500} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Objectivos para os próximos 3 meses</p><textarea value={objectivos} onChange={e => setObjectivos(e.target.value)} rows={3} maxLength={500} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Orçamento estimado (opcional)</p><textarea value={orcamento} onChange={e => setOrcamento(e.target.value)} rows={2} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /></div>
      </div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!desc || !impacto || !objectivos || submitting} onClick={() => { setSubmitting(true); setTimeout(() => { toast.success("Candidatura submetida! Boa sorte! 🇦🇴"); router.push("/creator-fund/estado") }, 2000) }}>{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" />Submeter candidatura</>}</Button>
    </div>
  )
}
