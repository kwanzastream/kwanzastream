"use client"

import { useState } from "react"
import { Image, FileText, Link as LinkIcon } from "lucide-react"

interface MediaItem { id: string; url: string; type: "image" | "gif" | "link"; title?: string; date: string }

interface MessageMediaGalleryProps {
  items: MediaItem[]
  className?: string
}

export function MessageMediaGallery({ items, className = "" }: MessageMediaGalleryProps) {
  const [filter, setFilter] = useState<"all" | "image" | "gif" | "link">("all")
  const filtered = filter === "all" ? items : items.filter(i => i.type === filter)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2">
        {(["all", "image", "gif", "link"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filter === f ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>
            {f === "all" ? "Todos" : f === "image" ? "Imagens" : f === "gif" ? "GIFs" : "Links"}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-8"><Image className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" /><p className="text-xs text-muted-foreground">Sem media partilhada</p></div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {filtered.map(item => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all">
              {item.type === "link" ? (
                <div className="w-full h-full bg-muted flex flex-col items-center justify-center p-2"><LinkIcon className="w-5 h-5 text-muted-foreground mb-1" /><p className="text-[9px] text-muted-foreground truncate w-full text-center">{item.title || item.url}</p></div>
              ) : (
                <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
