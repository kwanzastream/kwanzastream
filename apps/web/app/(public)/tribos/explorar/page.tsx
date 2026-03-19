"use client"
import { TribeCard, type TribeData } from "@/components/tribes/tribe-card"
import { Compass, Flame, Sparkles, Clock } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "explorar", label: "Explorar", href: "/tribos/explorar" },
  { id: "minhas", label: "Minhas Tribos", href: "/tribos/minhas" },
  { id: "sugeridas", label: "Sugeridas", href: "/tribos/sugeridas" },
]

const FEATURED: TribeData[] = [
  { slug: "kuduro-kings", name: "Kuduro Kings", description: "A tribo do Kuduro. Música, dança, cultura angolana.", category: "Música", memberCount: 12500, weeklyStreams: 45, access: "open", color: "#CE1126" },
  { slug: "gamers-de-luanda", name: "Gamers de Luanda", description: "Comunidade de gaming da capital.", category: "Gaming", memberCount: 8900, weeklyStreams: 120, access: "open", color: "#6C3CE1" },
  { slug: "futebol-angolano", name: "Futebol Angolano", description: "Girabola, seleção, futebol de rua.", category: "Futebol", memberCount: 22000, weeklyStreams: 30, access: "open", color: "#16A34A" },
]

const ACTIVE: TribeData[] = [
  { slug: "tech-angola", name: "Tech Angola", description: "Programação, startups, tech em Angola.", category: "Tecnologia", memberCount: 4500, weeklyStreams: 18, access: "open", color: "#0EA5E9" },
  { slug: "culinaria-angolana", name: "Culinária Angolana", description: "Receitas, live cooking, muamba.", category: "Culinária", memberCount: 6700, weeklyStreams: 12, access: "open", color: "#F59E0B" },
]

const NEW: TribeData[] = [
  { slug: "cosplay-ao", name: "Cosplay AO", description: "Cosplay e cultura pop em Angola.", category: "Entretenimento", memberCount: 230, weeklyStreams: 3, access: "approval", color: "#EC4899" },
]

export default function TribosExplorarPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Compass className="w-5 h-5" />Explorar Tribos</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "explorar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>

      <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Flame className="w-4 h-4 text-red-400" />Em Destaque</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{FEATURED.map(t => <TribeCard key={t.slug} tribe={t} />)}</div></div>

      <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-yellow-400" />Mais Activas</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{ACTIVE.map(t => <TribeCard key={t.slug} tribe={t} />)}</div></div>

      <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" />Novas</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{NEW.map(t => <TribeCard key={t.slug} tribe={t} />)}</div></div>
    </div>
  )
}
