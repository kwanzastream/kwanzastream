"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Radio } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface Category { id: string; name: string; icon: string; liveCount: number; followed: boolean }

const TABS = [
  { id: "canais", label: "Canais", href: "/a-seguir/canais" },
  { id: "categorias", label: "Categorias", href: "/a-seguir/categorias" },
  { id: "tribos", label: "Tribos", href: "/a-seguir/tribos" },
  { id: "tags", label: "Tags", href: "/a-seguir/tags" },
]

const MOCK: Category[] = [
  { id: "gaming", name: "Gaming", icon: "🎮", liveCount: 12, followed: true },
  { id: "musica", name: "Música", icon: "🎵", liveCount: 5, followed: true },
  { id: "irl", name: "IRL", icon: "📹", liveCount: 3, followed: true },
  { id: "culinaria", name: "Culinária", icon: "🍲", liveCount: 1, followed: false },
  { id: "desporto", name: "Desporto", icon: "⚽", liveCount: 4, followed: true },
  { id: "tecnologia", name: "Tecnologia", icon: "💻", liveCount: 2, followed: false },
  { id: "arte", name: "Arte & Design", icon: "🎨", liveCount: 0, followed: false },
  { id: "educacao", name: "Educação", icon: "📚", liveCount: 1, followed: false },
]

export default function ASeguirCategoriasPage() {
  const [categories, setCategories] = useState(MOCK)

  const toggleFollow = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, followed: !c.followed } : c))
    const cat = categories.find(c => c.id === id)
    toast.success(cat?.followed ? `Deixaste de seguir ${cat.name}` : `Agora segues ${cat?.name}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold">A seguir</h1>

      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "categorias" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map(cat => (
          <div key={cat.id} className={`rounded-xl border p-4 text-center transition-all cursor-pointer ${cat.followed ? "border-primary/30 bg-primary/5" : "border-white/10 hover:border-white/20"}`} onClick={() => toggleFollow(cat.id)}>
            <p className="text-3xl mb-2">{cat.icon}</p>
            <p className="text-sm font-bold">{cat.name}</p>
            {cat.liveCount > 0 && (
              <div className="flex items-center justify-center gap-1 mt-1"><Radio className="w-2.5 h-2.5 text-[#CE1126]" /><span className="text-[10px] text-muted-foreground">{cat.liveCount} ao vivo</span></div>
            )}
            <Badge className={`mt-2 text-[9px] ${cat.followed ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"}`}>
              {cat.followed ? "✓ A seguir" : "Seguir"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
