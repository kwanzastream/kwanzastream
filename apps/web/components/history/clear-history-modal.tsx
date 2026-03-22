"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api"

interface ClearHistoryModalProps { type: "tudo" | "streams" | "pesquisas"; onCleared?: () => void; onCancel?: () => void }

export function ClearHistoryModal({ type, onCleared, onCancel }: ClearHistoryModalProps) {
  const [loading, setLoading] = useState(false)
  const labels = { tudo: "todo o histórico", streams: "histórico de streams e VODs", pesquisas: "histórico de pesquisas" }
  const endpoints = { tudo: "/api/history/all", streams: "/api/history/streams/all", pesquisas: "/api/history/searches" }

  const handleClear = async () => {
    setLoading(true)
    try { await api.delete(endpoints[type]); toast.success("Histórico limpo!"); onCleared?.() }
    catch { toast.error("Erro ao limpar.") }
    finally { setLoading(false) }
  }

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-background max-w-sm mx-auto space-y-4">
      <h2 className="text-sm font-bold">⚠️ Limpar {labels[type]}</h2>
      <p className="text-xs text-muted-foreground">Esta acção não pode ser desfeita.</p>
      {type === "tudo" && <ul className="text-[10px] text-muted-foreground space-y-1"><li>→ Histórico de streams e VODs</li><li>→ Clips e shorts vistos</li><li>→ Pesquisas</li><li>→ Canais visitados</li><li>→ Progresso de VODs em curso</li></ul>}
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onCancel} className="flex-1 text-xs">Cancelar</Button>
        <Button onClick={handleClear} disabled={loading} className="flex-1 text-xs bg-red-600 hover:bg-red-700">{loading ? "A limpar..." : "Confirmar"}</Button>
      </div>
    </div>
  )
}
