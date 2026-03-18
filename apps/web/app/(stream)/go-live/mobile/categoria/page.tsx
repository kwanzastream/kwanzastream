"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StreamSetupSteps } from "@/components/go-live/stream-setup-steps"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const STEPS = [
  { label: "Título" }, { label: "Categoria" }, { label: "Classificação" }, { label: "Privacidade" },
]

const CATEGORIES = [
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "musica", label: "Música", emoji: "🎵" },
  { id: "conversa", label: "Conversa", emoji: "💬" },
  { id: "kuduro", label: "Kuduro", emoji: "💃" },
  { id: "culinaria", label: "Culinária AO", emoji: "🍲" },
  { id: "desporto", label: "Desporto", emoji: "⚽" },
  { id: "educacao", label: "Educação", emoji: "📚" },
  { id: "arte", label: "Arte & Criativo", emoji: "🎨" },
  { id: "tech", label: "Tecnologia", emoji: "💻" },
  { id: "irl", label: "IRL / Vida Real", emoji: "📷" },
  { id: "podcast", label: "Podcast", emoji: "🎙️" },
  { id: "outro", label: "Outro", emoji: "✨" },
]

const LANGUAGES = ["PT-AO", "PT-PT", "Inglês", "Kikongo", "Kimbundu", "Umbundu"]

export default function GoLiveMobileCategoriaPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [language, setLanguage] = useState("PT-AO")

  // Step guard: require title
  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    if (!state.title) router.replace("/go-live/mobile/titulo")
  }, [router])

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, "")
    if (t && tags.length < 5 && !tags.includes(t)) {
      setTags([...tags, t]); setTagInput("")
    }
  }

  const handleContinue = () => {
    if (!category) return
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    sessionStorage.setItem("go-live-setup", JSON.stringify({ ...state, category, tags, language }))
    router.push("/go-live/mobile/classificacao")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <StreamSetupSteps steps={STEPS} currentStep={1} />

        <div className="text-center">
          <h2 className="text-xl font-bold">Categoria e Tags</h2>
          <p className="text-sm text-muted-foreground mt-1">Passo 2 de 4</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`p-3 rounded-xl border text-center transition-all ${category === c.id ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30"}`}>
              <span className="text-xl">{c.emoji}</span>
              <p className="text-[10px] font-medium mt-1">{c.label}</p>
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input placeholder="Adicionar tag..." value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="bg-white/5 border-white/10 text-sm" maxLength={30} />
            <Button variant="outline" size="sm" onClick={addTag} disabled={tags.length >= 5}>+</Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Badge key={t} variant="secondary" className="gap-1 text-xs">
                  #{t} <button onClick={() => setTags(tags.filter(x => x !== t))}><X className="w-2.5 h-2.5" /></button>
                </Badge>
              ))}
            </div>
          )}
          <p className="text-[10px] text-muted-foreground">{tags.length}/5 tags</p>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <p className="text-xs font-medium">Idioma do stream</p>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((l) => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${language === l ? "border-primary bg-primary/10 text-primary" : "border-white/10"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full h-11" onClick={handleContinue} disabled={!category}>Continuar</Button>
      </div>
    </div>
  )
}
