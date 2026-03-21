"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Users, Download, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticipantManagementRow } from "@/components/dashboard/tournaments/participant-management-row"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

export default function GerirTorneioPage() {
  const params = useParams()
  const id = params.id as string
  const [tournament, setTournament] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"participants" | "bracket" | "results" | "config">("participants")

  useEffect(() => {
    api.get(`/api/creator/tournaments/${id}`)
      .then(res => setTournament(res.data))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [id])

  const handleApprove = async (userId: string) => {
    try {
      await api.patch(`/api/creator/tournaments/${id}/participants/${userId}`, { action: "approve" })
      toast.success("Participante aprovado")
      setTournament((t: any) => ({
        ...t,
        participants: t.participants.map((p: any) => p.id === userId ? { ...p, status: "confirmed" } : p),
      }))
    } catch { toast.error("Erro") }
  }

  const handleReject = async (userId: string) => {
    try {
      await api.patch(`/api/creator/tournaments/${id}/participants/${userId}`, { action: "reject" })
      toast.success("Participante rejeitado")
      setTournament((t: any) => ({
        ...t,
        participants: t.participants.filter((p: any) => p.id !== userId),
      }))
    } catch { toast.error("Erro") }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  if (!tournament) return null

  const participants = tournament.participants || []
  const confirmed = participants.filter((p: any) => p.status === "confirmed")
  const pending = participants.filter((p: any) => p.status === "pending")

  const TABS = [
    { id: "participants", label: "Participantes" },
    { id: "bracket", label: "Bracket" },
    { id: "results", label: "Resultados" },
    { id: "config", label: "Configurações" },
  ] as const

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/torneios/organizados/${id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> {tournament.title}
      </Link>

      <h2 className="text-lg font-bold">Gerir Torneio</h2>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 pb-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => {
              if (t.id === "bracket") {
                window.location.href = `/dashboard/torneios/organizados/${id}/bracket`
              } else if (t.id === "results") {
                window.location.href = `/dashboard/torneios/organizados/${id}/resultados`
              } else {
                setTab(t.id as any)
              }
            }}
            className={`px-3 py-2 text-xs rounded-t-lg transition-colors ${tab === t.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Participants tab */}
      {tab === "participants" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <Users className="w-4 h-4 inline mr-1" />
              Aprovados: {confirmed.length} · Pendentes: {pending.length}
            </div>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <Download className="w-3 h-3" />Exportar CSV
            </Button>
          </div>

          {pending.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-yellow-400">Pendentes ({pending.length})</h3>
                <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => {
                  pending.forEach((p: any) => handleApprove(p.id))
                }}>
                  <CheckCircle className="w-3 h-3" />Aprovar todos
                </Button>
              </div>
              {pending.map((p: any) => (
                <ParticipantManagementRow
                  key={p.id}
                  participant={p}
                  onApprove={() => handleApprove(p.id)}
                  onReject={() => handleReject(p.id)}
                />
              ))}
            </div>
          )}

          {confirmed.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Confirmados ({confirmed.length})</h3>
              {confirmed.map((p: any) => (
                <ParticipantManagementRow key={p.id} participant={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Config tab */}
      {tab === "config" && (
        <div className="p-6 rounded-xl border border-dashed border-white/10 text-center">
          <p className="text-sm text-muted-foreground">Configurações do torneio disponíveis em v2.</p>
        </div>
      )}
    </div>
  )
}
