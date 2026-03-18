"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StreamSetupSteps } from "@/components/go-live/stream-setup-steps"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STEPS = [
  { label: "Título" }, { label: "Categoria" }, { label: "Classificação" }, { label: "Privacidade" },
]

export default function GoLiveMobileTituloPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")

  const handleContinue = () => {
    if (!title.trim()) return
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    sessionStorage.setItem("go-live-setup", JSON.stringify({ ...state, title: title.trim() }))
    router.push("/go-live/mobile/categoria")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <StreamSetupSteps steps={STEPS} currentStep={0} />

        <div className="text-center">
          <h2 className="text-xl font-bold">Título do stream</h2>
          <p className="text-sm text-muted-foreground mt-1">Passo 1 de 4</p>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="O que estás a fazer hoje?"
            value={title} onChange={(e) => setTitle(e.target.value.slice(0, 140))}
            maxLength={140} className="h-12 text-base bg-white/5 border-white/10"
            autoFocus
          />
          <p className="text-[10px] text-muted-foreground text-right">{title.length}/140</p>
        </div>

        <Button className="w-full h-11" onClick={handleContinue} disabled={!title.trim()}>Continuar</Button>
      </div>
    </div>
  )
}
