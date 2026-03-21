"use client"

import { Monitor, Tablet, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BannerPreviewProps {
  src: string | null
  className?: string
}

const VIEWS = [
  { id: "desktop", icon: Monitor, label: "Desktop", width: "100%", aspect: "aspect-[16/9]" },
  { id: "tablet", icon: Tablet, label: "Tablet", width: "75%", aspect: "aspect-[4/3]" },
  { id: "mobile", icon: Smartphone, label: "Mobile", width: "45%", aspect: "aspect-[9/16]" },
] as const

export function BannerPreview({ src, className }: BannerPreviewProps) {
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const currentView = VIEWS.find((v) => v.id === view)!

  if (!src) {
    return (
      <div className={cn("p-8 rounded-xl border border-dashed border-white/10 text-center", className)}>
        <p className="text-sm text-muted-foreground">Sem banner configurado</p>
        <p className="text-[10px] text-muted-foreground mt-1">Os viewers vêem o teu banner de perfil.</p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* View selector */}
      <div className="flex items-center gap-1 justify-center">
        {VIEWS.map((v) => (
          <Button
            key={v.id}
            variant={view === v.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setView(v.id as any)}
            className="gap-1.5 h-8 text-xs"
          >
            <v.icon className="w-3.5 h-3.5" />
            {v.label}
          </Button>
        ))}
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <div
          className={cn("rounded-lg overflow-hidden border border-white/10 transition-all duration-300", currentView.aspect)}
          style={{ width: currentView.width, maxWidth: "100%" }}
        >
          <img
            src={src}
            alt="Banner preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
