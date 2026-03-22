"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { WatchPartyChat } from "@/components/watch-party/watch-party-chat"
import { WatchPartyReactions } from "@/components/watch-party/watch-party-reactions"
import api from "@/lib/api"
import Link from "next/link"
export default function WatchPartyActivePage() {
  const { id } = useParams()
  const [party, setParty] = useState<any>(null)
  useEffect(() => { api.get(`/api/watch-parties/${id}`).then(r => setParty(r.data)).catch(() => setParty({ id, name: "Watch Party", code: "ABC123", streamId: "stream1", status: "active", participants: [{ id: "p1", user: { username: "tu" }, isOnline: true }], host: { username: "tu" } })) }, [id])
  if (!party) return <div className="max-w-5xl mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-2">
      <div className="flex items-center justify-between"><div><h1 className="text-sm font-bold">{party.name || "Watch Party"} {party.status === "active" && <span className="text-red-400 text-[9px] animate-pulse">🔴 AO VIVO</span>}</h1><p className="text-[9px] text-muted-foreground">{party.participants?.length || 0} participantes · Código: {party.code}</p></div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl border border-white/10 overflow-hidden" style={{ minHeight: 400 }}>
        <div className="md:col-span-2 bg-black flex flex-col">
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs">{party.streamId ? <iframe src={`/embed/${party.streamId}`} className="w-full h-full" allowFullScreen /> : <p>Sem stream seleccionado</p>}</div>
          <WatchPartyReactions partyId={id as string} />
        </div>
        <div className="h-[400px] md:h-auto"><WatchPartyChat partyId={id as string} username="tu" /></div>
      </div>
      <div className="flex items-center justify-center gap-3 text-[10px]">
        <Link href={`/assistir-junto/${id}/convidar`} className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Convidar</Link>
        <Link href={`/assistir-junto/${id}/participantes`} className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Participantes</Link>
        <Link href={`/assistir-junto/${id}/encerrar`} className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10">Sair</Link>
      </div>
    </div>
  )
}
