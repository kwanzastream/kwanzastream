"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function TorneioInscreverIndividualPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const [accepted, setAccepted] = useState(false)
  const [extra, setExtra] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!accepted) { toast.error("Aceita o regulamento"); return }
    setSubmitting(true)
    setTimeout(() => { router.push(`/torneios/${id}/inscrever/confirmar`) }, 1000)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/inscrever`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Inscrição Individual</h1></div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold text-muted-foreground">Os teus dados</p>
        <p className="text-sm">@{user?.username || "jogador"}</p>
        <p className="text-[10px] text-muted-foreground">{user?.email || "email@example.com"}</p>
      </div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Informação adicional (opcional)</label><textarea value={extra} onChange={e => setExtra(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Ex: PSN ID, rank, etc." /></div>
      <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1 accent-primary" /><span className="text-xs text-muted-foreground">Li e aceito o <Link href={`/torneios/${id}/regras`} className="text-primary underline">regulamento do torneio</Link></span></label>
      <Button className="w-full gap-2" onClick={handleSubmit} disabled={!accepted || submitting}>{submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Avançar</>}</Button>
    </div>
  )
}
