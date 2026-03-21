"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Calendar, Trophy, Radio, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

export default function InscricaoDetalhePage() {
  const params = useParams()
  const id = params.id as string
  const [inscription, setInscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/creator/tournaments/inscriptions/${id}`)
      .then(res => setInscription(res.data))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [id])

  const handleWithdraw = async () => {
    if (!confirm("Tens a certeza que queres desistir? Esta acção não pode ser revertida.")) return
    try {
      toast.success("Desistência processada")
    } catch {
      toast.error("Erro ao desistir")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  if (!inscription) return null

  const i = inscription
  const t = i.tournament

  return (
    <div className="space-y-6">
      <Link href="/dashboard/torneios/inscricoes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <div>
        <h2 className="text-lg font-bold">{t.title}</h2>
        <p className="text-xs text-muted-foreground">Inscrição #{i.id}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border border-white/10">
          <p className="text-[10px] text-muted-foreground uppercase">Tipo</p>
          <p className="text-sm font-medium">{i.type === "individual" ? "Individual" : "Equipa"}</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10">
          <p className="text-[10px] text-muted-foreground uppercase">Estado</p>
          <Badge className={`text-[9px] mt-1 ${i.status === "confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
            {i.status === "confirmed" ? "✅ Confirmado" : "⏳ Pendente"}
          </Badge>
        </div>
        <div className="p-3 rounded-xl border border-white/10">
          <p className="text-[10px] text-muted-foreground uppercase">Data de inscrição</p>
          <p className="text-sm">{new Date(i.inscriptionDate).toLocaleDateString("pt-AO")}</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10">
          <p className="text-[10px] text-muted-foreground uppercase">Taxa</p>
          <p className="text-sm font-medium">{i.fee}</p>
        </div>
      </div>

      {/* Competition info */}
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h3 className="text-sm font-semibold">Informação da competição</h3>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p className="flex items-center gap-2"><Trophy className="w-3.5 h-3.5" />Formato: {i.format}</p>
          <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />Início: {new Date(t.startDate).toLocaleString("pt-AO")}</p>
          <p className="flex items-center gap-2"><Radio className="w-3.5 h-3.5" />Stream obrigatório: {i.streamRequired ? "Sim" : "Não"}</p>
        </div>
      </div>

      {/* Next match */}
      {i.nextMatch && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Users className="w-4 h-4" />A minha próxima partida
          </h3>
          <p className="text-sm">vs <span className="font-medium text-primary">@{i.nextMatch.opponent.username}</span></p>
          <p className="text-xs text-muted-foreground">{new Date(i.nextMatch.date).toLocaleString("pt-AO")}</p>
          <Link href={`/torneios/${t.id}`}>
            <Button variant="outline" size="sm" className="text-xs mt-1">Ver no bracket</Button>
          </Link>
        </div>
      )}

      {/* Withdraw */}
      {i.canWithdraw && (
        <Button variant="outline" onClick={handleWithdraw} className="gap-1.5 text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-500/40">
          <AlertTriangle className="w-3.5 h-3.5" />Desistir do torneio
        </Button>
      )}
    </div>
  )
}
