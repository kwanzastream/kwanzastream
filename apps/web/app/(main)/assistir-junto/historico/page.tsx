"use client"
import { useState, useEffect } from "react"
import { WatchPartyCard } from "@/components/watch-party/watch-party-card"
import api from "@/lib/api"
export default function PartyHistoricoPage() {
  const [parties, setParties] = useState<any[]>([])
  useEffect(() => { api.get("/api/watch-parties/history").then(r => setParties(r.data || [])).catch(() => setParties([{ id: "h1", name: "Angola Gaming Cup", code: "XYZ456", status: "ended", maxParticipants: 10, _count: { participants: 4 }, createdAt: "20 Mar 2026" }, { id: "h2", name: "Girabola Live", code: "QWE789", status: "ended", maxParticipants: 10, _count: { participants: 8 }, createdAt: "15 Mar 2026" }])) }, [])
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico de Watch Parties</h1>
      {parties.length === 0 ? <div className="text-center py-12"><div className="text-4xl">📺</div><p className="text-xs text-muted-foreground mt-2">Nenhum histórico.</p></div> : <div className="space-y-2">{parties.map(p => <WatchPartyCard key={p.id} {...p} participantCount={p._count?.participants || 0} createdAt={p.createdAt} />)}</div>}
    </div>
  )
}
