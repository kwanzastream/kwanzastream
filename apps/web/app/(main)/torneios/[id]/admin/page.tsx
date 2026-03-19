"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Settings, Users, BarChart3, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ADMIN_LINKS = [
  { id: "participantes", label: "Gerir Inscrições", desc: "Aprovar/rejeitar inscrições", icon: Users, href: "participantes" },
  { id: "bracket", label: "Gerar/Editar Bracket", desc: "Criar bracket e editar seed", icon: Settings, href: "bracket" },
  { id: "resultados", label: "Introduzir Resultados", desc: "Registar resultados dos jogos", icon: BarChart3, href: "resultados" },
]

export default function TorneioAdminPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Settings className="w-5 h-5" />Painel do Torneio</h1></div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-300">⚠️ Apenas o organizador e admins da plataforma têm acesso.</div>
      <div className="space-y-3">
        {ADMIN_LINKS.map(l => (
          <Link key={l.id} href={`/torneios/${id}/admin/${l.href}`} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><l.icon className="w-5 h-5 text-primary" /></div>
            <div><p className="text-sm font-bold">{l.label}</p><p className="text-[10px] text-muted-foreground">{l.desc}</p></div>
          </Link>
        ))}
      </div>
    </div>
  )
}
