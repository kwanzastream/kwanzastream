"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Upload, Plus, X } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function TorneioInscreverEquipaPage() {
  const { id } = useParams()
  const router = useRouter()
  const [teamName, setTeamName] = useState("")
  const [members, setMembers] = useState<string[]>([""])
  const [accepted, setAccepted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const addMember = () => setMembers([...members, ""])
  const removeMember = (i: number) => setMembers(members.filter((_, j) => j !== i))
  const updateMember = (i: number, v: string) => { const m = [...members]; m[i] = v; setMembers(m) }

  const handleSubmit = () => {
    if (!teamName.trim()) { toast.error("Nome da equipa obrigatório"); return }
    if (!accepted) { toast.error("Aceita o regulamento"); return }
    setSubmitting(true)
    setTimeout(() => { router.push(`/torneios/${id}/inscrever/confirmar`) }, 1000)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/inscrever`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Inscrição por Equipa</h1></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Nome da equipa *</label><Input value={teamName} onChange={e => setTeamName(e.target.value)} maxLength={50} placeholder="Nome único neste torneio" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Logo da equipa</label><div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Upload logo</span></div></div>
      <div className="space-y-2"><label className="text-xs font-bold text-muted-foreground">Membros (pesquisar por username)</label>
        {members.map((m, i) => (<div key={i} className="flex gap-2"><Input value={m} onChange={e => updateMember(i, e.target.value)} placeholder={`@membro${i + 1}`} className="flex-1 h-9 bg-white/5" />{members.length > 1 && <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => removeMember(i)}><X className="w-3 h-3" /></Button>}</div>))}
        <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={addMember}><Plus className="w-3 h-3" />Adicionar membro</Button>
        <p className="text-[9px] text-muted-foreground">Tu (capitão) és adicionado automaticamente</p>
      </div>
      <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1 accent-primary" /><span className="text-xs text-muted-foreground">Li e aceito o <Link href={`/torneios/${id}/regras`} className="text-primary underline">regulamento</Link></span></label>
      <Button className="w-full gap-2" onClick={handleSubmit} disabled={!accepted || submitting}>{submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Avançar</>}</Button>
    </div>
  )
}
