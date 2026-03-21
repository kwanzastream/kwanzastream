"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ArrowRight, Image, Video, Code, Upload } from "lucide-react"

export default function CriativoPage() {
  const [type, setType] = useState<string>("image")
  const [url, setUrl] = useState("")
  const [cta, setCta] = useState("Saber mais")
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={3} />
      <Link href="/ads/criar-campanha/audiencia" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Audiência</Link>
      <h1 className="text-xl font-bold">Criativo</h1>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Formato do criativo:</p>
        {[
          { id: "image", icon: Image, title: "Imagem estática (banner)", desc: "PNG/JPG · 1280×720px · máx 2MB" },
          { id: "video", icon: Video, title: "Vídeo curto (pre-roll)", desc: "MP4 · máx 30s · máx 50MB — em breve" },
          { id: "overlay", icon: Code, title: "Overlay no stream", desc: "HTML5 · só managed" },
        ].map(f => (
          <button key={f.id} onClick={() => setType(f.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${type === f.id ? "border-primary bg-primary/5" : "border-white/10"}`}>
            <f.icon className={`w-5 h-5 ${type === f.id ? "text-primary" : "text-muted-foreground"}`} />
            <div><p className="text-sm font-medium">{f.title}</p><p className="text-[10px] text-muted-foreground">{f.desc}</p></div>
          </button>
        ))}
      </div>

      <div className="aspect-video rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/30 transition-all">
        <Upload className="w-8 h-8 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Clica ou arrasta para upload</p>
        <p className="text-[10px] text-muted-foreground">1280×720px · PNG/JPG · máx 2MB</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">URL de destino</label>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..."
            className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Texto do CTA</label>
          <input value={cta} onChange={e => setCta(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
        </div>
      </div>

      <Button onClick={() => { sessionStorage.setItem("ads_cta", cta); router.push("/ads/criar-campanha/orcamento") }} className="w-full gap-1.5">
        Seguinte <ArrowRight className="w-3 h-3" />
      </Button>
    </div>
  )
}
