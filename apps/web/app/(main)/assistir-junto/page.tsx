"use client"
import { useState, useEffect } from "react"
import { WatchPartyCard } from "@/components/watch-party/watch-party-card"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function AssistirJuntoPage() {
  const [parties, setParties] = useState<any[]>([])
  const [code, setCode] = useState("")
  const router = useRouter()
  useEffect(() => { api.get("/api/watch-parties").then(r => setParties(r.data || [])).catch(() => setParties([])) }, [])
  const joinByCode = async () => {
    if (!code) return
    try { const r = await api.get(`/api/watch-parties/join/${code}`); router.push(`/assistir-junto/${r.data.id}`) }
    catch { toast.error("Party não encontrada ou já terminou") }
  }
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <div className="text-center"><h1 className="text-lg font-bold">📺 Assistir Junto</h1><p className="text-xs text-muted-foreground">Vê streams com os teus amigos</p></div>
      <Link href="/assistir-junto/criar" className="block w-full py-3 rounded-xl bg-primary text-white text-center text-xs font-semibold">+ Criar nova Watch Party</Link>
      <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-[10px] text-muted-foreground">Tens convite?</p><div className="flex gap-1"><input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Código (ex: ABC123)" maxLength={6} className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs tracking-widest" /><Button onClick={joinByCode} className="text-xs">Entrar</Button></div></div>
      {parties.length > 0 && <div className="space-y-2"><h2 className="text-sm font-semibold">As tuas parties activas ({parties.length})</h2>{parties.map(p => <WatchPartyCard key={p.id} {...p} participantCount={p._count?.participants || 0} createdAt="agora" isHost />)}</div>}
      <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground"><Link href="/assistir-junto/activas" className="hover:text-primary">Activas</Link><Link href="/assistir-junto/historico" className="hover:text-primary">Histórico</Link></div>
    </div>
  )
}
