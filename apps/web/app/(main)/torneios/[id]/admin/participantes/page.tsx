"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Check, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = [
  { username: "player1", displayName: "Player 1", status: "pending" },
  { username: "player2", displayName: "Player 2", status: "approved" },
  { username: "player3", displayName: "Player 3", status: "pending" },
]

export default function TorneioAdminParticipantesPage() {
  const { id } = useParams()
  const [participants, setParticipants] = useState(MOCK)
  const update = (username: string, status: string) => { setParticipants(prev => prev.map(p => p.username === username ? { ...p, status } : p)); toast.success(`${username} ${status === "approved" ? "aprovado" : "rejeitado"}`) }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/admin`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Users className="w-5 h-5" />Gerir Inscrições</h1></div>
      <div className="space-y-2">
        {participants.map(p => (
          <div key={p.username} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">{p.displayName[0]}</div>
            <div className="flex-1"><p className="text-sm font-bold">@{p.username}</p></div>
            <Badge className={`text-[9px] ${p.status === "approved" ? "bg-green-500/10 text-green-400" : p.status === "rejected" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>{p.status === "approved" ? "Aprovado" : p.status === "rejected" ? "Rejeitado" : "Pendente"}</Badge>
            {p.status === "pending" && <><Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => update(p.username, "approved")}><Check className="w-4 h-4 text-green-400" /></Button><Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => update(p.username, "rejected")}><X className="w-4 h-4 text-red-400" /></Button></>}
          </div>
        ))}
      </div>
    </div>
  )
}
