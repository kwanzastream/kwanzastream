"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CameraPreview } from "@/components/go-live/camera-preview"
import { NetworkIndicator, getRecommendedQuality } from "@/components/go-live/network-indicator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Monitor, Smartphone } from "lucide-react"

export default function GoLiveMobileSetupPage() {
  const router = useRouter()
  const [quality, setQuality] = useState<"auto" | "360p" | "480p">("auto")
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  const handleContinue = () => {
    sessionStorage.setItem("go-live-setup", JSON.stringify({ videoQuality: quality, orientation }))
    router.push("/go-live/mobile/titulo")
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-4 bg-black">
        <CameraPreview videoQuality={quality} orientation={orientation} className="max-w-sm w-full" />
      </div>

      {/* Settings */}
      <div className="lg:w-80 p-6 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10">
        <h2 className="font-bold text-lg">Configuração</h2>

        <NetworkIndicator />

        {/* Quality */}
        <div className="space-y-2">
          <Label className="text-xs">Qualidade de vídeo</Label>
          <div className="grid grid-cols-3 gap-2">
            {(["auto", "360p", "480p"] as const).map((q) => (
              <button key={q} onClick={() => setQuality(q)}
                className={`py-2 rounded-lg text-xs font-bold border transition-all ${quality === q ? "border-primary bg-primary/10 text-primary" : "border-white/10 hover:border-white/30"}`}>
                {q === "auto" ? "Auto" : q}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div className="space-y-2">
          <Label className="text-xs">Orientação</Label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setOrientation("portrait")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold border transition-all ${orientation === "portrait" ? "border-primary bg-primary/10 text-primary" : "border-white/10"}`}>
              <Smartphone className="w-4 h-4" /> Vertical
            </button>
            <button onClick={() => setOrientation("landscape")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold border transition-all ${orientation === "landscape" ? "border-primary bg-primary/10 text-primary" : "border-white/10"}`}>
              <Monitor className="w-4 h-4" /> Horizontal
            </button>
          </div>
        </div>

        <Button className="w-full" onClick={handleContinue}>Continuar</Button>
      </div>
    </div>
  )
}
