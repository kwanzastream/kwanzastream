"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { AchievementCard, type AchievementData } from "@/components/drops/achievement-card"
import { Button } from "@/components/ui/button"
import { Trophy, Lock, Sparkles } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "minhas", label: "Minhas", href: "/conquistas/minhas" },
  { id: "progresso", label: "Em Progresso", href: "/conquistas/progresso" },
  { id: "desbloqueadas", label: "Desbloqueadas", href: "/conquistas/desbloqueadas" },
  { id: "vitrine", label: "Vitrine", href: "/conquistas/vitrine" },
]

const RECENT: AchievementData[] = [
  { id: "mwana-wa-angola", name: "Mwana wa Angola", description: "Assiste 10h de streams angolanos", emoji: "🇦🇴", unlocked: true, unlockedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "clip-viral", name: "Clip Viral", description: "Um clip teu chega a 10.000 views", emoji: "🔥", unlocked: true, unlockedAt: new Date(Date.now() - 604800000).toISOString() },
]

const ALL: AchievementData[] = [
  ...RECENT,
  { id: "rei-dos-salos", name: "Rei dos Salos", description: "Envia 10.000 Salos no total", emoji: "💰", unlocked: false, progress: 6230, target: 10000 },
  { id: "kuduro-king", name: "Kuduro King", description: "Faz 10 streams de Kuduro", emoji: "🎵", unlocked: false, progress: 3, target: 10 },
  { id: "voz-de-angola", name: "Voz de Angola", description: "Atinge 1.000 seguidores", emoji: "📢", unlocked: false, progress: 450, target: 1000 },
  { id: "ngola-criador", name: "Ngola Criador", description: "Faz 50 streams ao vivo", emoji: "🎬", unlocked: false, progress: 12, target: 50 },
  { id: "luanda-ao-vivo", name: "Luanda ao Vivo", description: "Assiste 5 streams de Luanda", emoji: "🏙️", unlocked: false, progress: 2, target: 5 },
  { id: "construtor-tribo", name: "Construtor de Tribo", description: "Funda uma Tribo com 50+ membros", emoji: "🏛️", unlocked: false, progress: 0, target: 50 },
  { id: "raid-master", name: "Raid Master", description: "Envia 10 raids", emoji: "⚔️", unlocked: false, progress: 4, target: 10 },
  { id: "fiel-subscritor", name: "Fiel Subscritor", description: "Subscreve 3 meses seguidos", emoji: "⭐", unlocked: false, progress: 1, target: 3 },
  { id: "embaixador-cultural", name: "Embaixador Cultural", description: "Cria conteúdo em 3 categorias", emoji: "🌍", unlocked: false, progress: 1, target: 3 },
  { id: "girabola-caster", name: "Girabola Caster", description: "Faz 10 streams de futebol", emoji: "⚽", unlocked: false, progress: 0, target: 10 },
]

export default function ConquistasMinhasPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para ver conquistas</p><Button onClick={() => router.push("/entrar?redirectTo=/conquistas/minhas")}>Entrar</Button></div>

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" />Conquistas</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "minhas" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      {RECENT.length > 0 && <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-yellow-400" />Recentemente desbloqueadas</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{RECENT.map(a => <AchievementCard key={a.id} achievement={a} />)}</div></div>}
      <div className="space-y-2"><h2 className="text-sm font-bold">Todas ({ALL.filter(a => a.unlocked).length}/{ALL.length})</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{ALL.map(a => <AchievementCard key={a.id} achievement={a} />)}</div></div>
    </div>
  )
}
