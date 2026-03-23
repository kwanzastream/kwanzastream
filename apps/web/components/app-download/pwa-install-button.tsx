"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
export function PwaInstallButton() {
  const [prompt, setPrompt] = useState<any>(null)
  const [installed, setInstalled] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(display-mode: standalone)").matches) { setInstalled(true); return }
    const handler = (e: any) => { e.preventDefault(); setPrompt(e) }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])
  const install = async () => {
    if (!prompt) return; prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setInstalled(true)
  }
  if (installed) return <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center"><p className="text-xs text-green-400">✅ Kwanza Stream já está instalado!</p></div>
  if (!prompt) return <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"><p className="text-[10px] text-muted-foreground">Abre no Chrome para instalar a PWA</p></div>
  return <Button onClick={install} className="w-full text-xs">📱 Instalar Kwanza Stream</Button>
}
