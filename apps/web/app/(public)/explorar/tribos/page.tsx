"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Flame } from "lucide-react"
import Link from "next/link"
import { ContentFilters } from "@/components/public/content-filters"
import { useState } from "react"

const MOCK_TRIBOS = Array.from({ length: 12 }, (_, i) => ({
  id: `tribo-${i}`, name: `Tribo ${["Kwanza Gamers", "Kizomba Nation", "Angola Tech", "Girabola Fans", "Kuduro Kings", "Luanda Creators", "Benguela Streamers", "Semba Forever", "Afrohouse AO", "Hip-Hop Angola", "Gospel AO", "IRL Explorers"][i]}`,
  description: "Comunidade de criadores e fãs angolanos apaixonados por conteúdo local",
  members: Math.floor(Math.random() * 5000) + 100,
  activeThisWeek: Math.floor(Math.random() * 200) + 10,
  category: ["Gaming", "Música", "Tech", "Futebol", "Música", "Variedades", "Variedades", "Música", "Música", "Música", "Música", "IRL"][i],
  isOpen: i !== 3,
  isHot: i < 3,
}))

export default function ExplorarTribosPage() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Tribos</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Tribos Kwanza</h1>
        <p className="text-sm text-muted-foreground">Comunidades de criadores. Junta-te a uma tribo, encontra a tua gente.</p>
      </div>

      <div className="mb-6">
        <ContentFilters
          categories={[
            { value: "gaming", label: "🎮 Gaming" }, { value: "musica", label: "🎵 Música" },
            { value: "tech", label: "💻 Tech" }, { value: "futebol", label: "⚽ Futebol" },
          ]}
          sortOptions={[
            { value: "active", label: "Mais activas" },
            { value: "members", label: "Mais membros" },
            { value: "recent", label: "Mais recentes" },
          ]}
          onFilterChange={setFilters}
        />
      </div>

      {/* Hot Tribos */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-4 h-4 text-[#F9D616]" />
          <h2 className="font-bold">Em Destaque esta Semana</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_TRIBOS.filter(t => t.isHot).map((tribo) => (
            <TribeCard key={tribo.id} {...tribo} featured />
          ))}
        </div>
      </section>

      {/* All Tribos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MOCK_TRIBOS.filter(t => !t.isHot).map((tribo) => (
          <TribeCard key={tribo.id} {...tribo} />
        ))}
      </div>
    </div>
  )
}

function TribeCard({ id, name, description, members, activeThisWeek, category, isOpen, featured }: any) {
  return (
    <Link href={`/tribos/${id}`} className="block group">
      <div className={`rounded-xl border transition-all p-4 bg-card card-hover ${featured ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50 hover:border-primary/40"}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-lg">
            👥
          </div>
          <div className="flex items-center gap-1.5">
            {isOpen ? (
              <Badge variant="outline" className="text-[9px] text-[var(--success)] border-[var(--success)]/30">Aberta</Badge>
            ) : (
              <Badge variant="outline" className="text-[9px]">Fechada</Badge>
            )}
            <Badge variant="secondary" className="text-[9px]">{category}</Badge>
          </div>
        </div>
        <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{members.toLocaleString()} membros</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{activeThisWeek} activos</span>
        </div>
      </div>
    </Link>
  )
}
