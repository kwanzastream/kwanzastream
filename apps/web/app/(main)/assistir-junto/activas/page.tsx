"use client"
import { useState, useEffect } from "react"
import { WatchPartyCard } from "@/components/watch-party/watch-party-card"
import api from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
export default function PartyActivasPage() {
  const [parties, setParties] = useState<any[]>([])
  useEffect(() => { api.get("/api/watch-parties").then(r => setParties(r.data || [])).catch(() => setParties([])) }, [])
  const end = (id: string) => { api.delete(`/api/watch-parties/${id}`).catch(() => {}); setParties(parties.filter(p => p.id !== id)); toast.success("Party encerrada") }
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Watch Parties Activas</h1>
      {parties.length === 0 ? <div className="text-center py-12"><div className="text-4xl">📺</div><p className="text-xs text-muted-foreground mt-2">Nenhuma party activa.</p><Link href="/assistir-junto/criar" className="inline-block mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs">Criar nova →</Link></div> : <div className="space-y-2">{parties.map(p => <WatchPartyCard key={p.id} {...p} participantCount={p._count?.participants || 0} createdAt="agora" isHost onEnd={end} />)}</div>}
    </div>
  )
}
