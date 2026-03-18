"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StreamSetupSteps } from "@/components/go-live/stream-setup-steps"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const STEPS = [
  { label: "Título" }, { label: "Categoria" }, { label: "Classificação" }, { label: "Privacidade" },
]

const RATINGS = [
  { id: "general", label: "Geral", desc: "Adequado para todos", emoji: "🟢" },
  { id: "13+", label: "13+", desc: "Linguagem moderada, temas maduros", emoji: "🟡" },
  { id: "18+", label: "18+", desc: "Conteúdo adulto (requer verificação de idade)", emoji: "🔴" },
]

export default function GoLiveMobileClassificacaoPage() {
  const router = useRouter()
  const [rating, setRating] = useState("")
  const [accepted, setAccepted] = useState(false)

  // Step guard: require category
  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    if (!state.category) router.replace("/go-live/mobile/categoria")
  }, [router])

  const handleContinue = () => {
    if (!rating || !accepted) return
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    sessionStorage.setItem("go-live-setup", JSON.stringify({ ...state, contentRating: rating }))
    router.push("/go-live/mobile/privacidade")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <StreamSetupSteps steps={STEPS} currentStep={2} />

        <div className="text-center">
          <h2 className="text-xl font-bold">Classificação de conteúdo</h2>
          <p className="text-sm text-muted-foreground mt-1">Passo 3 de 4</p>
        </div>

        <div className="space-y-3">
          {RATINGS.map((r) => (
            <button key={r.id} onClick={() => setRating(r.id)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${rating === r.id ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30"}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <p className="font-bold text-sm">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="guidelines" checked={accepted} onCheckedChange={(v) => setAccepted(!!v)} />
          <label htmlFor="guidelines" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
            Confirmo que este stream cumpre as{" "}
            <Link href="/diretrizes-comunidade" className="text-primary hover:underline" target="_blank">
              Diretrizes da Comunidade
            </Link>{" "}
            do Kwanza Stream
          </label>
        </div>

        <Button className="w-full h-11" onClick={handleContinue} disabled={!rating || !accepted}>Continuar</Button>
      </div>
    </div>
  )
}
