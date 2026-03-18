"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hash, X } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface Tag { id: string; name: string; streamCount: number }

const TABS = [
  { id: "canais", label: "Canais", href: "/a-seguir/canais" },
  { id: "categorias", label: "Categorias", href: "/a-seguir/categorias" },
  { id: "tribos", label: "Tribos", href: "/a-seguir/tribos" },
  { id: "tags", label: "Tags", href: "/a-seguir/tags" },
]

const MOCK: Tag[] = [
  { id: "1", name: "gaming-angola", streamCount: 15 },
  { id: "2", name: "kuduro-ao-vivo", streamCount: 4 },
  { id: "3", name: "girabola", streamCount: 8 },
  { id: "4", name: "luanda-tech", streamCount: 3 },
  { id: "5", name: "musica-angolana", streamCount: 6 },
  { id: "6", name: "culinaria-ao", streamCount: 2 },
]

export default function ASeguirTagsPage() {
  const [tags, setTags] = useState(MOCK)

  const handleUnfollow = (id: string) => {
    const tag = tags.find(t => t.id === id)
    setTags(prev => prev.filter(t => t.id !== id))
    toast.success(`Deixaste de seguir #${tag?.name}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold">A seguir</h1>

      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "tags" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <div key={tag.id} className="flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-primary/5 group">
            <Hash className="w-3 h-3 text-primary" />
            <span className="text-sm font-medium">{tag.name}</span>
            {tag.streamCount > 0 && <Badge variant="outline" className="text-[9px] h-4">{tag.streamCount} streams</Badge>}
            <button onClick={() => handleUnfollow(tag.id)} className="opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3 text-muted-foreground hover:text-destructive" /></button>
          </div>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="text-center py-16"><Hash className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem tags seguidas — explora tags nas páginas de streams</p></div>
      )}
    </div>
  )
}
