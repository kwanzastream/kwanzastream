"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

const GENRES = ["Kuduro", "Semba", "Kizomba", "Afrohouse", "Hip-Hop AO", "Gospel", "Podcast", "Notícias", "Desporto", "Outro"]
const QUALITIES = [
  { value: 64, label: "64 kbps", desc: "Dados baixos (3G)" },
  { value: 128, label: "128 kbps", desc: "Padrão — recomendado" },
  { value: 320, label: "320 kbps", desc: "Alta qualidade (WiFi)" },
]

export default function ConfigurarRadioPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [extraGenres, setExtraGenres] = useState<string[]>([])
  const [quality, setQuality] = useState(128)

  useEffect(() => {
    api.get("/api/creator/radio")
      .then(res => {
        const c = res.data.config
        if (c) {
          setName(c.programName || "")
          setDescription(c.description || "")
          setGenre(c.primaryGenre || "")
          setExtraGenres(c.extraGenres || [])
          setQuality(c.quality || 128)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.patch("/api/creator/radio/config", {
        programName: name, description, primaryGenre: genre, extraGenres, quality,
      })
      toast.success("Configuração guardada!")
    } catch { toast.error("Erro ao guardar") }
    finally { setSaving(false) }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/dashboard/radio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Configuração do Modo Rádio</h2>

      {/* Program name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome do programa</label>
        <Input value={name} onChange={e => setName(e.target.value.slice(0, 100))} placeholder="ex: Kuduro Mix AO" />
        <p className="text-[10px] text-muted-foreground">{name.length}/100</p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Descrição</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value.slice(0, 500))}
          placeholder="O melhor Kuduro angolano todas as noites"
          className="w-full h-20 px-3 py-2 rounded-lg bg-background border border-white/10 text-sm resize-none focus:outline-none focus:border-primary/50"
        />
        <p className="text-[10px] text-muted-foreground">{description.length}/500</p>
      </div>

      {/* Primary genre */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Género principal</label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${genre === g ? "bg-primary/20 text-primary border border-primary/30" : "border border-white/10 text-muted-foreground hover:border-white/20"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Extra genres */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Géneros adicionais (até 3)</label>
        <div className="flex flex-wrap gap-2">
          {GENRES.filter(g => g !== genre).map(g => (
            <button
              key={g}
              onClick={() => {
                if (extraGenres.includes(g)) {
                  setExtraGenres(extraGenres.filter(x => x !== g))
                } else if (extraGenres.length < 3) {
                  setExtraGenres([...extraGenres, g])
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${extraGenres.includes(g) ? "bg-primary/10 text-primary border border-primary/20" : "border border-white/10 text-muted-foreground hover:border-white/20"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Quality */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Qualidade de áudio</label>
        <div className="space-y-2">
          {QUALITIES.map(q => (
            <button
              key={q.value}
              onClick={() => setQuality(q.value)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${quality === q.value ? "border border-primary/30 bg-primary/5" : "border border-white/10 hover:border-white/20"}`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${quality === q.value ? "border-primary" : "border-white/20"}`}>
                {quality === q.value && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <div>
                <p className="text-sm font-medium">{q.label}</p>
                <p className="text-[10px] text-muted-foreground">{q.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="gap-1.5">
        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
        Guardar configuração
      </Button>
    </div>
  )
}
