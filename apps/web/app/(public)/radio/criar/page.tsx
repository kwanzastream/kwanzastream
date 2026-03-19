"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Radio, ArrowRight, Headphones, Zap } from "lucide-react"
import Link from "next/link"

export default function RadioCriarPage() {
  const router = useRouter()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Radio className="w-5 h-5" />Modo Rádio</h1>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Transmite só áudio</h2>
          <p className="text-xs text-muted-foreground">Modo Rádio consome 10–20x menos dados que vídeo. Ideal para DJs, podcasters, músicos e comentadores de futebol.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-white/5"><Headphones className="w-5 h-5 text-primary mx-auto mb-1" /><p className="text-[9px] text-muted-foreground">Menos dados</p></div>
          <div className="p-3 rounded-xl bg-white/5"><Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" /><p className="text-[9px] text-muted-foreground">Mais rápido</p></div>
          <div className="p-3 rounded-xl bg-white/5"><Radio className="w-5 h-5 text-green-400 mx-auto mb-1" /><p className="text-[9px] text-muted-foreground">64–320kbps</p></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-12 gap-2" onClick={() => router.push("/go-live/audio-only")}><Radio className="w-4 h-4" />Ir ao Vivo</Button>
        <Link href="/radio/criar/configurar"><Button variant="outline" className="h-12 w-full gap-2"><ArrowRight className="w-4 h-4" />Configurar</Button></Link>
      </div>
    </div>
  )
}
