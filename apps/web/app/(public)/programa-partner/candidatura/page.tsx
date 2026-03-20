"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
const CATS = ["Gaming","Música","Comédia","Desporto","Educação","Arte","Culinária","Tecnologia","Lifestyle","Outro"]
export default function CandidaturaPartnerPage() {
  const router = useRouter()
  const [conteudo, setConteudo] = useState("")
  const [descCanal, setDescCanal] = useState("")
  const [porque, setPorque] = useState("")
  const [externas, setExternas] = useState("")
  const [terms, setTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-partner"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Candidatura Partner</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Tipo de conteúdo principal</p><select value={conteudo} onChange={e => setConteudo(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{CATS.map(c => <option key={c}>{c}</option>)}</select></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Descreve o teu canal em 3 frases</p><textarea value={descCanal} onChange={e => setDescCanal(e.target.value)} rows={3} maxLength={300} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Porque queres ser Partner?</p><textarea value={porque} onChange={e => setPorque(e.target.value)} rows={3} maxLength={500} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /><p className="text-[8px] text-muted-foreground text-right">{porque.length}/500</p></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Presença noutras plataformas (opcional)</p><Input value={externas} onChange={e => setExternas(e.target.value)} placeholder="YouTube, Instagram, TikTok..." className="bg-white/5" /></div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} className="rounded" /><span className="text-xs">Li e aceito os Termos do Programa Partner</span></label>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!terms || !descCanal || submitting} onClick={() => { setSubmitting(true); setTimeout(() => { toast.success("Candidatura submetida! Resposta em 5–10 dias úteis."); router.push("/programa-partner/candidatura/estado") }, 2000) }}>{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" />Submeter candidatura</>}</Button>
    </div>
  )
}
