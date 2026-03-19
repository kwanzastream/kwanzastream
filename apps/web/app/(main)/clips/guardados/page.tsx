"use client"
import { useState } from "react"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { Bookmark, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/clips/recentes" },
  { id: "populares", label: "Populares", href: "/clips/populares" },
  { id: "para-ti", label: "Para ti", href: "/clips/para-ti" },
  { id: "trending", label: "Trending", href: "/clips/trending" },
  { id: "guardados", label: "Guardados", href: "/clips/guardados" },
]

const MOCK: ClipData[] = [
  { id: "c2", title: "Dança de kuduro viral", duration: 45, viewCount: 89000, shares: 3400, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
]

export default function ClipsGuardadosPage() {
  const [saved, setSaved] = useState(MOCK)

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Bookmark className="w-5 h-5" />Clips Guardados</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "guardados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      {saved.length === 0 ? (
        <div className="text-center py-16"><Bookmark className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Guarda clips para os ver mais tarde</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {saved.map(c => (
            <div key={c.id} className="relative group">
              <ClipCard clip={c} />
              <button onClick={() => { setSaved(prev => prev.filter(x => x.id !== c.id)); toast.success("Removido") }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 className="w-3.5 h-3.5 text-white" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
