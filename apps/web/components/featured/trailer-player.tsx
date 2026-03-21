"use client"

import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Trash2 } from "lucide-react"
import { useRef, useState } from "react"

interface TrailerPlayerProps {
  src: string | null
  onReplace?: () => void
  onRemove?: () => void
}

export function TrailerPlayer({ src, onReplace, onRemove }: TrailerPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  if (!src) {
    return (
      <div className="aspect-video rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 bg-white/[0.02]">
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
          <Play className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Sem trailer configurado</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Os visitantes que não te seguem vêem o teu último VOD.
          </p>
        </div>
      </div>
    )
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          onEnded={() => setPlaying(false)}
          playsInline
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {onReplace && (
          <Button variant="outline" size="sm" onClick={onReplace} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Substituir trailer
          </Button>
        )}
        {onRemove && (
          <Button variant="outline" size="sm" onClick={onRemove} className="gap-1.5 text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-500/40">
            <Trash2 className="w-3.5 h-3.5" />
            Remover
          </Button>
        )}
      </div>
    </div>
  )
}
