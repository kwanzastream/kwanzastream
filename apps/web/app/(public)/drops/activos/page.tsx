"use client"
import { DropCard, type DropData } from "@/components/drops/drop-card"
import { Gift, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Activos", href: "/drops/activos" },
  { id: "historico", label: "Histórico", href: "/drops/historico" },
  { id: "como-funciona", label: "Como funciona", href: "/drops/como-funciona" },
]

const MOCK: DropData[] = [
  { id: "d1", brandName: "Unitel", prize: "500MB de dados Unitel", requirementMinutes: 120, requirementCategory: "Gaming", progressMinutes: 96, totalAvailable: 5000, claimed: 2660, endsAt: new Date(Date.now() + 172800000).toISOString(), status: "in_progress" },
  { id: "d2", brandName: "Jumia", prize: "Voucher 500 Kz Jumia", requirementMinutes: 60, requirementCategory: "Música", progressMinutes: 12, totalAvailable: 2000, claimed: 890, endsAt: new Date(Date.now() + 604800000).toISOString(), status: "in_progress" },
  { id: "d3", brandName: "BAI", prize: "100 Salos + Badge exclusivo", requirementMinutes: 30, requirementCategory: "Qualquer", progressMinutes: 30, totalAvailable: 10000, claimed: 3200, endsAt: new Date(Date.now() + 259200000).toISOString(), status: "ready" },
]

export default function DropsActivosPage() {
  const { user } = useAuth()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Drops Activos</h1><span className="text-xs text-muted-foreground">{MOCK.length} disponíveis</span></div>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "activos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      {!user && <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3"><UserPlus className="w-5 h-5 text-primary shrink-0" /><div><p className="text-xs font-bold">Cria conta para ganhar drops</p><p className="text-[9px] text-muted-foreground">Progresso pessoal disponível após login</p></div><Link href="/registar"><Button size="sm" className="text-[10px] shrink-0">Criar conta</Button></Link></div>}
      <div className="space-y-3">{MOCK.map(d => <DropCard key={d.id} drop={user ? d : { ...d, progressMinutes: undefined, status: "available" }} />)}</div>
    </div>
  )
}
