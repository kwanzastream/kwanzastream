"use client"
import { useState } from "react"
import { AchievementBadge, type AchievementData } from "@/components/drops/achievement-card"
import { Button } from "@/components/ui/button"
import { Star, Check, Eye } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const TABS = [
  { id: "minhas", label: "Minhas", href: "/conquistas/minhas" },
  { id: "progresso", label: "Em Progresso", href: "/conquistas/progresso" },
  { id: "desbloqueadas", label: "Desbloqueadas", href: "/conquistas/desbloqueadas" },
  { id: "vitrine", label: "Vitrine", href: "/conquistas/vitrine" },
]

const UNLOCKED: AchievementData[] = [
  { id: "mwana-wa-angola", name: "Mwana wa Angola", description: "Assiste 10h de streams", emoji: "🇦🇴", unlocked: true },
  { id: "clip-viral", name: "Clip Viral", description: "10.000 views num clip", emoji: "🔥", unlocked: true },
]

export default function ConquistasVitrinePage() {
  const [selected, setSelected] = useState<string[]>(["mwana-wa-angola"])

  const toggle = (id: string) => {
    if (selected.includes(id)) setSelected(selected.filter(s => s !== id))
    else if (selected.length < 5) setSelected([...selected, id])
    else toast.error("Máximo 5 conquistas na vitrine")
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" />Vitrine Pública</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "vitrine" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <p className="text-xs text-muted-foreground">Selecciona até 5 conquistas para mostrar no teu perfil público.</p>

      {/* Preview */}
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold flex items-center gap-1"><Eye className="w-3 h-3" />Preview do perfil</p>
        <div className="flex flex-wrap gap-2">{selected.length > 0 ? selected.map(id => { const a = UNLOCKED.find(u => u.id === id); return a ? <AchievementBadge key={id} achievement={a} /> : null }) : <p className="text-[10px] text-muted-foreground">Nenhuma conquista seleccionada</p>}</div>
      </div>

      {/* Select */}
      <div className="space-y-2">
        {UNLOCKED.map(a => (
          <button key={a.id} onClick={() => toggle(a.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selected.includes(a.id) ? "border-primary/30 bg-primary/5" : "border-white/10"}`}>
            <span className="text-xl">{a.emoji}</span>
            <div className="flex-1"><p className="text-sm font-bold">{a.name}</p><p className="text-[10px] text-muted-foreground">{a.description}</p></div>
            {selected.includes(a.id) && <Check className="w-4 h-4 text-primary" />}
          </button>
        ))}
      </div>
      <Button className="w-full gap-2" onClick={() => toast.success("Vitrine actualizada!")}><Check className="w-4 h-4" />Guardar Vitrine</Button>
      <p className="text-[8px] text-muted-foreground text-center">{selected.length}/5 seleccionadas</p>
    </div>
  )
}
