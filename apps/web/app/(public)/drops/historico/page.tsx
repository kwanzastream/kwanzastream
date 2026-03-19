"use client"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DropCard, type DropData } from "@/components/drops/drop-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Button } from "@/components/ui/button"
import { Clock, Lock, Gift } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Activos", href: "/drops/activos" },
  { id: "historico", label: "Histórico", href: "/drops/historico" },
  { id: "como-funciona", label: "Como funciona", href: "/drops/como-funciona" },
]

const FILTERS = [{ id: "all", label: "Todos" }, { id: "redeemed", label: "Ganhos" }, { id: "expired", label: "Expirados" }, { id: "in_progress", label: "Em progresso" }]

const MOCK: DropData[] = [
  { id: "d0", brandName: "Refriango", prize: "Pack Blu 6 unidades", requirementMinutes: 180, requirementCategory: "Entretenimento", progressMinutes: 180, totalAvailable: 1000, claimed: 1000, endsAt: new Date(Date.now() - 604800000).toISOString(), status: "redeemed" },
  { id: "dx", brandName: "Unitel", prize: "1GB de dados Unitel", requirementMinutes: 240, requirementCategory: "Gaming", progressMinutes: 120, totalAvailable: 3000, claimed: 3000, endsAt: new Date(Date.now() - 1209600000).toISOString(), status: "expired" },
]

export default function DropsHistoricoPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState("all")

  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para ver o histórico</p><Button onClick={() => router.push("/entrar?redirectTo=/drops/historico")}>Entrar</Button></div>

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Histórico de Drops</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "historico" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center"><p className="text-sm font-bold flex items-center justify-center gap-1"><Gift className="w-4 h-4 text-primary" />Valor total ganho: 1.500 Kz + 1GB dados</p></div>
      <SearchFilters filters={FILTERS} active={filter} onChange={setFilter} />
      <div className="space-y-3">{MOCK.map(d => <DropCard key={d.id} drop={d} />)}</div>
    </div>
  )
}
