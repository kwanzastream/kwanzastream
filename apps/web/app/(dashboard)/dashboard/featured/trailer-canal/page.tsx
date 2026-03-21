"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TrailerPlayer } from "@/components/featured/trailer-player"
import { Film, Loader2, Plus, Info } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function TrailerCanalPage() {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => setTrailerUrl(res.data.trailerUrl || null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleRemove = async () => {
    try {
      await api.patch("/api/creator/featured/trailer", { trailerUrl: null })
      setTrailerUrl(null)
      toast.success("Trailer removido")
    } catch {
      toast.error("Erro ao remover")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <Film className="w-5 h-5" /> Trailer do Canal
      </h2>

      {trailerUrl ? (
        <>
          <TrailerPlayer
            src={trailerUrl}
            onReplace={() => {
              window.location.href = "/dashboard/featured/trailer-canal/upload"
            }}
            onRemove={handleRemove}
          />
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground">
              O trailer toca automaticamente para visitantes que não te seguem quando o canal está offline.
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="aspect-video rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 bg-white/[0.02]">
            <Film className="w-10 h-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">Sem trailer configurado</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Os visitantes que ainda não te seguem vêem o teu último VOD.
              </p>
            </div>
            <Link href="/dashboard/featured/trailer-canal/upload">
              <Button variant="outline" size="sm" className="gap-1.5 mt-2">
                <Plus className="w-3.5 h-3.5" /> Adicionar trailer
              </Button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <p className="text-sm font-medium">Porquê adicionar um trailer?</p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                Primeira impressão para novos visitantes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                Aumenta a taxa de follow
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                Explica o teu conteúdo em menos de 90 segundos
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
