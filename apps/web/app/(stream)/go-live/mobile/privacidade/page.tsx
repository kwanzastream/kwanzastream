"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StreamSetupSteps } from "@/components/go-live/stream-setup-steps"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Globe, Users, Lock } from "lucide-react"

const STEPS = [
  { label: "Título" }, { label: "Categoria" }, { label: "Classificação" }, { label: "Privacidade" },
]

const PRIVACY_OPTIONS = [
  { id: "public", label: "Público", desc: "Visível para todos", icon: Globe },
  { id: "followers", label: "Só seguidores", desc: "Visível para quem te segue", icon: Users },
  { id: "private", label: "Privado", desc: "Só tu podes ver (útil para testes)", icon: Lock },
]

export default function GoLiveMobilePrivacidadePage() {
  const router = useRouter()
  const [privacy, setPrivacy] = useState("public")
  const [saveVod, setSaveVod] = useState(true)
  const [allowClips, setAllowClips] = useState(true)
  const [chatEnabled, setChatEnabled] = useState(true)

  // Step guard: require contentRating
  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    if (!state.contentRating) router.replace("/go-live/mobile/classificacao")
  }, [router])

  const handleGoLive = () => {
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    sessionStorage.setItem("go-live-setup", JSON.stringify({
      ...state, privacy, saveVod, allowClips, chatEnabled
    }))
    router.push("/go-live/mobile/ao-vivo")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <StreamSetupSteps steps={STEPS} currentStep={3} />

        <div className="text-center">
          <h2 className="text-xl font-bold">Privacidade</h2>
          <p className="text-sm text-muted-foreground mt-1">Passo 4 de 4</p>
        </div>

        <div className="space-y-3">
          {PRIVACY_OPTIONS.map((p) => (
            <button key={p.id} onClick={() => setPrivacy(p.id)}
              className={`w-full text-left rounded-xl border p-4 flex items-center gap-3 transition-all ${privacy === p.id ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30"}`}>
              <p.icon className={`w-5 h-5 shrink-0 ${privacy === p.id ? "text-primary" : "text-muted-foreground"}`} />
              <div><p className="font-bold text-sm">{p.label}</p><p className="text-xs text-muted-foreground">{p.desc}</p></div>
            </button>
          ))}
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-bold">Opções adicionais</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="vod" className="text-xs">Guardar como VOD automaticamente</Label>
            <Switch id="vod" checked={saveVod} onCheckedChange={setSaveVod} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="clips" className="text-xs">Permitir clips pelos viewers</Label>
            <Switch id="clips" checked={allowClips} onCheckedChange={setAllowClips} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="chat" className="text-xs">Chat activo</Label>
            <Switch id="chat" checked={chatEnabled} onCheckedChange={setChatEnabled} />
          </div>
        </div>

        <Button className="w-full h-12 text-base font-bold bg-[#CE1126] hover:bg-[#CE1126]/90" onClick={handleGoLive}>
          🔴 Iniciar transmissão
        </Button>
      </div>
    </div>
  )
}
