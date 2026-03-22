"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { WatchPartyParticipants } from "@/components/watch-party/watch-party-participants"
import api from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
export default function ParticipantesPage() {
  const { id } = useParams()
  const [participants, setParticipants] = useState<any[]>([])
  const [max, setMax] = useState(10)
  useEffect(() => { api.get(`/api/watch-parties/${id}/participants`).then(r => setParticipants(r.data || [])).catch(() => setParticipants([{ id: "p1", user: { username: "tu" }, isOnline: true, isHost: true }, { id: "p2", user: { username: "amigo1" }, isOnline: true, isHost: false }, { id: "p3", user: { username: "amigo2" }, isOnline: true, isHost: false }])) }, [id])
  const remove = (userId: string) => { api.delete(`/api/watch-parties/${id}/participants/${userId}`).catch(() => {}); setParticipants(participants.filter(p => p.id !== userId)); toast.success("Participante removido") }
  const mapped = participants.map(p => ({ id: p.user?.id || p.id, username: p.user?.username || "user", isOnline: p.isOnline !== false, isHost: p.isHost || false }))
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <Link href={`/assistir-junto/${id}`} className="text-[10px] text-muted-foreground hover:text-foreground">← Voltar à party</Link>
      <h1 className="text-lg font-bold">Participantes ({participants.length}/{max})</h1>
      <WatchPartyParticipants participants={mapped} isHost={true} onRemove={remove} />
    </div>
  )
}
