"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Gamepad2, Wifi } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { TabPills, ContentFilters } from "@/components/public/content-filters"

const MOCK_TOURNAMENTS = Array.from({ length: 10 }, (_, i) => ({
  id: `tournament-${i}`, title: `Torneio Kwanza ${["Free Fire", "FIFA", "Mobile Legends", "Tekken", "COD Mobile"][i % 5]} #${i + 1}`,
  game: ["Free Fire", "FIFA 25", "Mobile Legends", "Tekken 8", "COD Mobile"][i % 5],
  prize: [50000, 100000, 25000, 75000, 150000][i % 5],
  participants: Math.floor(Math.random() * 64) + 8,
  maxParticipants: [16, 32, 64, 128][i % 4],
  status: i < 2 ? "open" : i < 5 ? "ongoing" : "closed",
  isOnline: i % 3 !== 0,
}))

export default function ExplorarTorneiosPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = MOCK_TOURNAMENTS.filter(t => statusFilter === "all" || t.status === statusFilter)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Torneios</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Torneios</h1>
        <p className="text-sm text-muted-foreground">Competições abertas e em curso na plataforma</p>
      </div>

      <div className="mb-6">
        <TabPills
          tabs={[
            { value: "all", label: "Todos" },
            { value: "open", label: "Inscrições abertas" },
            { value: "ongoing", label: "Em curso" },
            { value: "closed", label: "Encerrado" },
          ]}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tournament) => (
          <Link key={tournament.id} href={`/torneios/${tournament.id}`} className="block group">
            <div className="rounded-xl border border-border/50 hover:border-primary/40 transition-all p-5 bg-card card-hover relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{tournament.title}</h3>
                    <p className="text-xs text-muted-foreground">{tournament.game}</p>
                  </div>
                </div>
                <Badge className={`shrink-0 text-[10px] ${tournament.status === "open" ? "bg-[var(--success)] text-white" : tournament.status === "ongoing" ? "bg-[#CE1126] text-white" : "bg-muted text-muted-foreground"}`}>
                  {tournament.status === "open" ? "Inscrições abertas" : tournament.status === "ongoing" ? "Em curso" : "Encerrado"}
                </Badge>
              </div>

              {/* Prize */}
              <div className="bg-[var(--surface-2)] rounded-lg p-3 mb-3">
                <p className="text-xs text-muted-foreground">Prémio</p>
                <p className="text-lg font-bold text-[#F9D616]">{tournament.prize.toLocaleString("pt-AO")} Kz</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tournament.participants}/{tournament.maxParticipants}</span>
                <span className="flex items-center gap-1"><Gamepad2 className="w-3 h-3" />{tournament.game}</span>
                <span className="flex items-center gap-1">
                  {tournament.isOnline ? <Wifi className="w-3 h-3" /> : <span>📍</span>}
                  {tournament.isOnline ? "Online" : "Presencial"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
