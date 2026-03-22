"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

interface WatchPartyCreateFormProps { preSelectedStream?: string }

export function WatchPartyCreateForm({ preSelectedStream }: WatchPartyCreateFormProps) {
  const [name, setName] = useState("")
  const [stream, setStream] = useState(preSelectedStream || "")
  const [max, setMax] = useState(10)
  const [pub, setPub] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const create = async () => {
    setLoading(true)
    try {
      const r = await api.post("/api/watch-parties", { streamId: stream || undefined, name: name || undefined, isPublic: pub, maxParticipants: max })
      toast.success(`Party criada! Código: ${r.data.code}`)
      router.push(`/assistir-junto/${r.data.id}/convidar`)
    } catch { toast.error("Erro ao criar party") } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      {!preSelectedStream && <div><label className="text-[10px] text-muted-foreground">Stream a assistir</label><input value={stream} onChange={e => setStream(e.target.value)} placeholder="Pesquisar stream ao vivo..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>}
      <div><label className="text-[10px] text-muted-foreground">Nome da party (opcional)</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da party" maxLength={50} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>
      <div><label className="text-[10px] text-muted-foreground">Máximo de participantes</label><select value={max} onChange={e => setMax(Number(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs">{[2,5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
      <div className="space-y-1"><label className="text-[10px] text-muted-foreground">Privacidade</label>{[{ v: false, l: "Privada — só com link de convite" }, { v: true, l: "Pública — qualquer um pode entrar" }].map(o => <label key={String(o.v)} className="flex items-center gap-2 text-xs cursor-pointer"><input type="radio" checked={pub === o.v} onChange={() => setPub(o.v)} />{o.l}</label>)}</div>
      <Button onClick={create} disabled={loading} className="w-full">{loading ? "A criar..." : "Criar party →"}</Button>
    </div>
  )
}
