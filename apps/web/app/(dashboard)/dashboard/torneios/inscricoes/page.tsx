"use client"

import { useState, useEffect } from "react"
import { Loader2, Award, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function InscricoesPage() {
  const [inscriptions, setInscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/tournaments")
      .then(res => setInscriptions(res.data.inscriptions || []))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  const active = inscriptions.filter(i => i.status !== "COMPLETED")
  const past = inscriptions.filter(i => i.status === "COMPLETED")

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Inscrições activas</h2>
          {active.map(i => (
            <Link key={i.inscriptionId} href={`/dashboard/torneios/inscricoes/${i.inscriptionId}`} className="block">
              <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors flex items-center gap-3">
                <Award className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{i.title}</p>
                  <p className="text-[10px] text-muted-foreground">{i.type === "individual" ? "Individual" : "Equipa"} · {i.inscriptionStatus === "confirmed" ? "Confirmado" : "Pendente"}</p>
                </div>
                <Badge className={`text-[9px] ${i.inscriptionStatus === "confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {i.inscriptionStatus === "confirmed" ? "✓" : "⏳"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Inscrições passadas</h2>
          {past.map(i => (
            <Link key={i.inscriptionId} href={`/dashboard/torneios/inscricoes/${i.inscriptionId}`} className="block">
              <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors flex items-center gap-3">
                <Award className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{i.title}</p>
                  {i.result && <p className="text-[10px] text-primary">🏆 {i.result.position}º lugar · {i.result.prize}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {inscriptions.length === 0 && (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center space-y-2">
          <Award className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">Sem inscrições em torneios.</p>
          <Link href="/torneios">
            <Button variant="outline" size="sm" className="gap-1.5 mt-2"><ExternalLink className="w-3 h-3" />Explorar torneios</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
