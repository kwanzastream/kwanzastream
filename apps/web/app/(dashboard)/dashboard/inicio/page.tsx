"use client"
import { DashboardStatCard, ChecklistProgressBar, ChecklistCard, NewsItem, type ChecklistStep } from "@/components/dashboard/dashboard-home-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Radio, BookOpen, FolderOpen, Newspaper } from "lucide-react"

const CHECKLIST: ChecklistStep[] = [
  { id: "account", title: "Criar conta", desc: "Bem-vindo à plataforma!", completed: true },
  { id: "username", title: "Definir username", desc: "O teu nome único na plataforma", completed: true },
  { id: "photo", title: "Adicionar foto de perfil", desc: "A tua cara é a tua marca", href: "/definicoes/perfil/foto", completed: false },
  { id: "bio", title: "Escrever bio do canal", desc: "Conta aos viewers quem és", href: "/definicoes/perfil/bio", completed: false },
  { id: "category", title: "Escolher categoria principal", desc: "Para que te encontrem", href: "/definicoes/canal", completed: false },
  { id: "stream-key", title: "Configurar stream key", desc: "Conecta o OBS ou telemóvel", href: "/dashboard/stream-config/stream-key", completed: false },
  { id: "first-stream", title: "Fazer o primeiro stream", desc: "O mais importante!", href: "/go-live", completed: false },
]

const NEWS = [
  { title: "Creator Fund — Ciclo Abril 2026", date: "18 Mar 2026", desc: "Candidaturas abertas até 31 de Março.", isNew: true, href: "/creator-fund" },
  { title: "Modo Rádio disponível", date: "15 Mar 2026", desc: "Transmissões áudio-only com 10-20x menos dados.", href: "/radio" },
  { title: "Torneios na Kwanza Stream", date: "10 Mar 2026", desc: "Organiza torneios de até 256 participantes." },
]

export default function DashboardInicioPage() {
  const completed = CHECKLIST.filter(s => s.completed).length
  const isNewChannel = completed < 5

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-black">Olá, @streamer_ao! 👋</h1><p className="text-xs text-muted-foreground">{isNewChannel ? "Vamos configurar o teu canal" : "Dashboard do criador"}</p></div>
        <Link href="/go-live"><Button className="gap-2 bg-red-600 hover:bg-red-700 font-bold"><Radio className="w-4 h-4" />Iniciar Stream</Button></Link>
      </div>

      {/* State A: New channel — checklist */}
      {isNewChannel && (
        <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-bold">Checklist de Activação</h2><Link href="/dashboard/inicio/checklist"><span className="text-[10px] text-primary">Ver mais →</span></Link></div>
          <ChecklistProgressBar completed={completed} total={CHECKLIST.length} />
          <div className="space-y-1.5">{CHECKLIST.map((s, i) => <ChecklistCard key={s.id} step={s} index={i} />)}</div>
          <Link href="/dashboard/inicio/checklist"><Button className="w-full font-bold">Continuar configuração →</Button></Link>
        </div>
      )}

      {/* State B: Active channel — stats */}
      {!isNewChannel && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <DashboardStatCard icon="👁" label="Viewers únicos" value="1.234" change="+12%" positive />
          <DashboardStatCard icon="💛" label="Salos recebidos" value="5.600" change="+8%" positive />
          <DashboardStatCard icon="👥" label="Novos seguidores" value="23" change="+5%" positive />
          <DashboardStatCard icon="⏱" label="Horas transmitidas" value="14h" />
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/dashboard/inicio/guia-rapido" className="p-4 rounded-xl border border-white/10 hover:border-primary/20 text-center transition-all"><BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" /><p className="text-[10px] font-bold">Guia Rápido</p></Link>
        <Link href="/dashboard/inicio/recursos" className="p-4 rounded-xl border border-white/10 hover:border-primary/20 text-center transition-all"><FolderOpen className="w-5 h-5 mx-auto mb-1 text-primary" /><p className="text-[10px] font-bold">Recursos</p></Link>
        <Link href="/dashboard/inicio/novidades" className="p-4 rounded-xl border border-white/10 hover:border-primary/20 text-center transition-all"><Newspaper className="w-5 h-5 mx-auto mb-1 text-primary" /><p className="text-[10px] font-bold">Novidades</p></Link>
      </div>

      {/* News */}
      <div className="space-y-2"><h2 className="text-sm font-bold">Novidades da Plataforma</h2>{NEWS.map(n => <NewsItem key={n.title} {...n} />)}</div>
    </div>
  )
}
