"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RotateCcw, Disc, Square, ArrowLeft, Timer } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ShortsGravarPage() {
  const router = useRouter()
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [segments, setSegments] = useState(0)

  const handleRecord = () => {
    if (recording) { setRecording(false); setSegments(prev => prev + 1) }
    else { setRecording(true) }
  }

  return (
    <div className="max-w-lg mx-auto flex flex-col h-screen">
      <div className="flex items-center gap-3 p-4"><Link href="/shorts/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Gravar Short</h1></div>

      {/* Camera preview */}
      <div className="flex-1 relative bg-black rounded-xl mx-4 overflow-hidden flex items-center justify-center">
        <Camera className="w-16 h-16 text-white/20" />
        {recording && <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 px-2 py-1 rounded-full text-white text-[10px] font-bold animate-pulse"><Disc className="w-3 h-3" />REC</div>}
        <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded-full text-white text-xs font-mono">{seconds}s / 60s</div>
        {/* Flip camera */}
        <button className="absolute top-3 right-16 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"><RotateCcw className="w-4 h-4 text-white" /></button>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-primary transition-all" style={{ width: `${(seconds / 60) * 100}%` }} /></div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 p-6">
        <button className="text-[10px] text-muted-foreground flex flex-col items-center gap-1"><Timer className="w-5 h-5" />3s</button>
        <button onClick={handleRecord} className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${recording ? "border-red-500 bg-red-500/20" : "border-white bg-white/10 hover:bg-white/20"}`}>
          {recording ? <Square className="w-6 h-6 text-red-500 fill-red-500" /> : <div className="w-10 h-10 rounded-full bg-red-500" />}
        </button>
        <button onClick={() => router.push("/shorts/criar/editar")} className="text-[10px] text-primary font-bold flex flex-col items-center gap-1 disabled:opacity-30">Seguinte →</button>
      </div>

      {segments > 0 && <p className="text-[9px] text-muted-foreground text-center pb-4">{segments} segmento{segments > 1 ? "s" : ""} gravado{segments > 1 ? "s" : ""}</p>}
    </div>
  )
}
