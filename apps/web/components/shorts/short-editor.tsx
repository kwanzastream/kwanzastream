"use client"

import { useState } from "react"
import { Scissors, Type, Music, Sliders, AlignLeft } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "cortar", label: "Cortar", icon: Scissors, href: "/shorts/criar/editar/cortar" },
  { id: "legenda", label: "Legenda", icon: AlignLeft, href: "/shorts/criar/editar/legenda" },
  { id: "musica", label: "Música", icon: Music, href: "/shorts/criar/editar/musica" },
  { id: "filtros", label: "Filtros", icon: Sliders, href: "/shorts/criar/editar/filtros" },
  { id: "texto", label: "Texto", icon: Type, href: "/shorts/criar/editar/texto" },
]

interface ShortEditorProps {
  activeTab?: string
  children: React.ReactNode
}

/**
 * Editor shell with preview + tab navigation for editing sub-pages.
 */
export function ShortEditor({ activeTab, children }: ShortEditorProps) {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Preview */}
      <div className="relative aspect-[9/16] max-h-[50vh] rounded-xl bg-black border border-white/10 overflow-hidden mx-auto flex items-center justify-center">
        <div className="text-white/20 text-xs">Preview do vídeo</div>
        {/* Timeline */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <div className="h-1 bg-white/20 rounded-full"><div className="h-full w-1/2 bg-primary rounded-full" /></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 justify-center">
        {TABS.map(t => (
          <Link key={t.id} href={t.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${activeTab === t.id ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:bg-white/[0.04]"}`}>
            <t.icon className="w-4 h-4" />
            {t.label}
          </Link>
        ))}
      </div>

      {/* Tab content */}
      <div>{children}</div>
    </div>
  )
}
