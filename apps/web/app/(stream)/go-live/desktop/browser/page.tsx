"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CameraPreview } from "@/components/go-live/camera-preview"
import { NetworkIndicator } from "@/components/go-live/network-indicator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MonitorPlay, ScreenShare } from "lucide-react"

export default function GoLiveDesktopBrowserPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [screenShare, setScreenShare] = useState(false)

  const handleStart = () => {
    if (!title.trim()) return
    sessionStorage.setItem("go-live-desktop-setup", JSON.stringify({ title, screenShare }))
    router.push("/go-live/desktop/browser/ao-vivo")
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-6 bg-black">
        <CameraPreview orientation="landscape" className="max-w-2xl w-full" />
      </div>

      {/* Settings */}
      <div className="lg:w-96 p-6 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
        <h2 className="text-lg font-bold flex items-center gap-2"><MonitorPlay className="w-5 h-5 text-primary" />Configuração</h2>

        <NetworkIndicator />

        <div className="space-y-2">
          <Label className="text-xs">Título do stream</Label>
          <Input placeholder="O que vais transmitir?" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 140))} maxLength={140} className="bg-white/5 border-white/10" />
          <p className="text-[10px] text-muted-foreground text-right">{title.length}/140</p>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <ScreenShare className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="screenshare" className="text-xs">Partilhar ecrã (em vez de câmara)</Label>
          </div>
          <Switch id="screenshare" checked={screenShare} onCheckedChange={setScreenShare} />
        </div>

        <Button className="w-full h-12 bg-[#CE1126] hover:bg-[#CE1126]/90 font-bold" onClick={handleStart} disabled={!title.trim()}>
          🔴 Iniciar transmissão
        </Button>
      </div>
    </div>
  )
}
