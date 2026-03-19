"use client"
import { TribeCard, type TribeData } from "@/components/tribes/tribe-card"
import { Sparkles } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "explorar", label: "Explorar", href: "/tribos/explorar" },
  { id: "minhas", label: "Minhas Tribos", href: "/tribos/minhas" },
  { id: "sugeridas", label: "Sugeridas", href: "/tribos/sugeridas" },
]

const MOCK: TribeData[] = [
  { slug: "musica-ao", name: "Música AO", description: "Para quem ama música angolana.", category: "Música", memberCount: 3200, weeklyStreams: 8, access: "open", color: "#E11D48" },
  { slug: "comedia-angolana", name: "Comédia Angolana", description: "Humor, stand-up, sketches.", category: "Entretenimento", memberCount: 5600, weeklyStreams: 15, access: "open", color: "#F97316" },
  { slug: "empreendedores-ao", name: "Empreendedores AO", description: "Startups e negócios em Angola.", category: "Negócios", memberCount: 1800, weeklyStreams: 4, access: "approval", color: "#14B8A6" },
]

export default function TribosSuperidasPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-400" />Tribos Sugeridas</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "sugeridas" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <p className="text-xs text-muted-foreground">Baseado nas tuas categorias de interesse, canais seguidos e tribos populares na tua província.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(t => <TribeCard key={t.slug} tribe={t} />)}</div>
    </div>
  )
}
