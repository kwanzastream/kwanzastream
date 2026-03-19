"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Check, Lock } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function TriboCandidaturaPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const [reason, setReason] = useState("")
  const [social, setSocial] = useState("")
  const [submitting, setSubmitting] = useState(false)

  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para candidatar-te</p><Button onClick={() => router.push(`/entrar?redirectTo=/tribos/${slug}/candidatura`)}>Entrar</Button></div>

  const handleSubmit = () => {
    if (!reason.trim()) { toast.error("Diz-nos porque queres entrar"); return }
    setSubmitting(true)
    setTimeout(() => { toast.success("Candidatura enviada! O moderador vai rever em breve."); router.push(`/tribos/${slug}`) }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Pedir Entrada</h1></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Porque queres juntar-te? *</label><textarea value={reason} onChange={e => setReason(e.target.value)} rows={4} maxLength={300} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Conta-nos..." /><p className="text-[9px] text-muted-foreground text-right">{reason.length}/300</p></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Links redes sociais / canal (opcional)</label><textarea value={social} onChange={e => setSocial(e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Instagram, YouTube, etc." /></div>
      <Button className="w-full gap-2" onClick={handleSubmit} disabled={submitting}>{submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A enviar...</> : <><Check className="w-4 h-4" />Enviar Candidatura</>}</Button>
    </div>
  )
}
