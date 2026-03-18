"use client"
import { useState } from "react"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { Bookmark, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

const TABS = [
  { id: "recentes", label: "Recentes", href: "/videos/recentes" },
  { id: "populares", label: "Populares", href: "/videos/populares" },
  { id: "para-ti", label: "Para ti", href: "/videos/para-ti" },
  { id: "a-seguir", label: "A seguir", href: "/videos/a-seguir" },
  { id: "guardados", label: "Guardados", href: "/videos/guardados" },
]

const MOCK: VodData[] = [
  { id: "v1", title: "Kuduro Session #45", duration: 18000, viewCount: 4200, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
]

export default function VideosGuardadosPage() {
  const [saved, setSaved] = useState(MOCK)

  const handleRemove = (id: string) => { setSaved(prev => prev.filter(v => v.id !== id)); toast.success("Removido dos guardados") }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Bookmark className="w-5 h-5" />Guardados</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "guardados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}
      </div>
      {saved.length === 0 ? (
        <div className="text-center py-16"><Bookmark className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Ainda não guardaste nenhum vídeo</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {saved.map(v => (
            <div key={v.id} className="relative group">
              <VodCard vod={v} />
              <button onClick={() => handleRemove(v.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 className="w-3.5 h-3.5 text-white" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
