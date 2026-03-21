"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FeaturedChannelRow, type FeaturedChannel } from "@/components/featured/featured-channel-row"
import { Users, Sparkles, Hand, Loader2 } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function CanaisSugeridosPage() {
  const [mode, setMode] = useState<"auto" | "manual">("auto")
  const [channels, setChannels] = useState<FeaturedChannel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => {
        const data = res.data
        setMode(data.suggestedChannels?.mode || "auto")
        setChannels(data.suggestedChannels?.channels || [])
      })
      .catch(() => toast.error("Erro ao carregar configurações"))
      .finally(() => setLoading(false))
  }, [])

  const handleModeChange = async (newMode: "auto" | "manual") => {
    setMode(newMode)
    try {
      await api.patch("/api/creator/featured/suggested-channels", { mode: newMode })
      toast.success(`Modo alterado para ${newMode === "auto" ? "automático" : "manual"}`)
    } catch {
      toast.error("Erro ao guardar modo")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Modo:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleModeChange("auto")}
            className={`p-4 rounded-xl border text-left transition-all ${
              mode === "auto"
                ? "border-primary/40 bg-primary/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Automático</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              A plataforma sugere canais similares ao teu conteúdo.
            </p>
          </button>
          <button
            onClick={() => handleModeChange("manual")}
            className={`p-4 rounded-xl border text-left transition-all ${
              mode === "manual"
                ? "border-primary/40 bg-primary/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Hand className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Manual</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Eu escolho os canais que recomendo.
            </p>
          </button>
        </div>
      </div>

      {/* Channel list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Canais seleccionados: {channels.length}/10
          </h2>
          {mode === "manual" && (
            <Link href="/dashboard/featured/canais-sugeridos/gerir">
              <Button variant="outline" size="sm" className="text-xs">
                Gerir canais →
              </Button>
            </Link>
          )}
        </div>

        {channels.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed border-white/10 text-center">
            <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              {mode === "auto"
                ? "A plataforma ainda não identificou canais para sugerir."
                : "Nenhum canal adicionado. Clica em 'Gerir canais' para começar."}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {channels.map((ch, i) => (
              <FeaturedChannelRow
                key={ch.id}
                channel={ch}
                index={i}
                total={channels.length}
                showReorder={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
