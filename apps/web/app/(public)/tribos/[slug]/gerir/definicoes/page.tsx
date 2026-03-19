"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Settings, Link2, Copy, Archive, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"

const ACCESS_OPTIONS = [{ id: "open", label: "Aberta" }, { id: "approval", label: "Por aprovação" }, { id: "invite", label: "Por convite" }]
const FEATURES = [{ id: "tournaments", label: "Torneios" }, { id: "events", label: "Eventos" }, { id: "posts", label: "Posts" }]

export default function TriboGerirDefinicoesPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [access, setAccess] = useState("open")
  const [features, setFeatures] = useState(["tournaments", "events", "posts"])
  const [inviteLink] = useState(`https://kwanzastream.ao/tribos/${slug}/convite/abc123`)

  const toggleFeature = (id: string) => setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}/gerir`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Settings className="w-5 h-5" />Definições</h1></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Tipo de acesso</label><div className="flex gap-2">{ACCESS_OPTIONS.map(a => <button key={a.id} onClick={() => { setAccess(a.id); toast.success(`Acesso alterado para: ${a.label}`) }} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${access === a.id ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground"}`}>{a.label}</button>)}</div></div>

      {access === "invite" && <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Link de convite</label><div className="flex gap-2"><Input value={inviteLink} readOnly className="flex-1 text-xs bg-white/5" /><Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => { navigator.clipboard.writeText(inviteLink); toast.success("Link copiado!") }}><Copy className="w-3 h-3" /></Button></div></div>}

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Funcionalidades</label><div className="space-y-1">{FEATURES.map(f => <label key={f.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer"><input type="checkbox" checked={features.includes(f.id)} onChange={() => toggleFeature(f.id)} className="accent-primary" /><span className="text-xs">{f.label}</span></label>)}</div></div>

      <div className="space-y-2 pt-4 border-t border-white/10">
        <Button variant="outline" className="w-full gap-2 text-xs" onClick={() => toast.info("Funcionalidade ainda não implementada")}><ArrowRightLeft className="w-4 h-4" />Transferir propriedade</Button>
        <Button variant="outline" className="w-full gap-2 text-xs text-yellow-400 border-yellow-500/30" onClick={() => { toast.success("Tribo arquivada"); router.push("/tribos/minhas") }}><Archive className="w-4 h-4" />Arquivar tribo</Button>
      </div>
    </div>
  )
}
