"use client"
import { useState } from "react"
import { ShortCard, type ShortData } from "@/components/shorts/short-card"
import { Bookmark, Trash2 } from "lucide-react"
import { toast } from "sonner"

const MOCK: ShortData[] = [
  { id: "s4", title: "Comédia: quando a mãe descobre o telefone novo 😂", duration: 45, viewCount: 320000, likes: 28000, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Comédia", creator: { username: "humor_ao", displayName: "Humor AO" } },
]

export default function ShortsGuardadosPage() {
  const [saved, setSaved] = useState(MOCK)
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Bookmark className="w-5 h-5" />Shorts Guardados</h1>
      {saved.length === 0 ? (
        <div className="text-center py-16"><Bookmark className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Guarda shorts para os ver mais tarde</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {saved.map(s => (
            <div key={s.id} className="relative group">
              <ShortCard short={s} />
              <button onClick={() => { setSaved(prev => prev.filter(x => x.id !== s.id)); toast.success("Removido") }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 className="w-3.5 h-3.5 text-white" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
