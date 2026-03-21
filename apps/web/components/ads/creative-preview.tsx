"use client"

import { Image, Video, Code } from "lucide-react"

interface CreativePreviewProps {
  type: "image" | "video" | "overlay"
  url?: string
  destinationUrl?: string
  ctaText?: string
}

export function CreativePreview({ type, url, destinationUrl, ctaText }: CreativePreviewProps) {
  const icons = { image: Image, video: Video, overlay: Code }
  const Icon = icons[type] || Image

  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold">
          {type === "image" ? "Banner estático" : type === "video" ? "Vídeo pre-roll" : "Overlay HTML5"}
        </span>
      </div>

      {url ? (
        <div className="aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
          {type === "image" ? (
            <img src={url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-muted-foreground">
              <Icon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-[10px]">Preview disponível após upload</p>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
          <p className="text-[10px] text-muted-foreground">Nenhum criativo</p>
        </div>
      )}

      {destinationUrl && <p className="text-[10px] text-muted-foreground truncate">🔗 {destinationUrl}</p>}
      {ctaText && <p className="text-[10px] text-primary">{ctaText}</p>}
    </div>
  )
}
