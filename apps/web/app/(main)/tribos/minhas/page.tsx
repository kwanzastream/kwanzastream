"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { TribeCard, type TribeData } from "@/components/tribes/tribe-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Crown, Shield, Plus } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "explorar", label: "Explorar", href: "/tribos/explorar" },
  { id: "minhas", label: "Minhas Tribos", href: "/tribos/minhas" },
  { id: "sugeridas", label: "Sugeridas", href: "/tribos/sugeridas" },
]

const MOCK: (TribeData & { userRole: string })[] = [
  { slug: "kuduro-kings", name: "Kuduro Kings", description: "A tribo do Kuduro.", category: "Música", memberCount: 12500, weeklyStreams: 45, access: "open", color: "#CE1126", userRole: "founder" },
  { slug: "gamers-de-luanda", name: "Gamers de Luanda", description: "Comunidade de gaming.", category: "Gaming", memberCount: 8900, weeklyStreams: 120, access: "open", color: "#6C3CE1", userRole: "moderator" },
  { slug: "tech-angola", name: "Tech Angola", description: "Tech em Angola.", category: "Tecnologia", memberCount: 4500, weeklyStreams: 18, access: "open", color: "#0EA5E9", userRole: "member" },
]

const ROLE_ICONS: Record<string, any> = { founder: Crown, moderator: Shield, member: Users }

export default function TribosMinhasPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Users className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para ver as tuas tribos</p><Button onClick={() => router.push("/entrar?redirectTo=/tribos/minhas")}>Entrar</Button></div>

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold flex items-center gap-2"><Users className="w-5 h-5" />Minhas Tribos</h1><Link href="/tribos/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar</Button></Link></div>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "minhas" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(t => <div key={t.slug} className="relative"><Badge className={`absolute top-24 left-2 z-10 text-[9px] gap-0.5 ${t.userRole === "founder" ? "bg-yellow-500/20 text-yellow-400" : t.userRole === "moderator" ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-muted-foreground"}`}>{t.userRole === "founder" ? "Fundador" : t.userRole === "moderator" ? "Moderador" : "Membro"}</Badge><TribeCard tribe={t} /></div>)}</div>
    </div>
  )
}
