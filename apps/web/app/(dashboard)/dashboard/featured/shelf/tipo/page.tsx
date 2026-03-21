"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Users, Ban, Loader2, ChevronLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

const TYPES = [
  {
    id: "channels" as const,
    label: "Canais recomendados",
    desc: "Mostro canais que escolho manualmente (max 6)",
    icon: LayoutGrid,
  },
  {
    id: "team" as const,
    label: "Equipa",
    desc: "Mostro os membros da minha equipa automaticamente",
    icon: Users,
  },
  {
    id: "disabled" as const,
    label: "Desactivada",
    desc: "Sem shelf no meu perfil",
    icon: Ban,
  },
]

export default function ShelfTipoPage() {
  const [type, setType] = useState<"channels" | "team" | "disabled">("disabled")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => setType(res.data.shelf?.type || "disabled"))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.patch("/api/creator/featured/shelf", { type })
      toast.success("Tipo de shelf guardado")
    } catch {
      toast.error("Erro ao guardar")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/featured/shelf" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Tipo de Shelf</h2>

      <div className="space-y-2">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`w-full p-4 rounded-xl border text-left transition-all ${
              type === t.id
                ? "border-primary/40 bg-primary/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                type === t.id ? "border-primary" : "border-white/30"
              }`}>
                {type === t.id && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <t.icon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-[10px] text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {type === "team" && (
        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-yellow-200">Funcionalidade de equipas disponível em v2.</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Quando estiver activo, os membros da tua equipa aparecerão automaticamente na shelf.
            </p>
          </div>
        </div>
      )}

      <Button onClick={handleSave} disabled={saving} className="gap-1.5">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Guardar
      </Button>
    </div>
  )
}
