"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Users, FileCheck, Shield, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MANAGE_LINKS = [
  { id: "membros", label: "Gerir Membros", desc: "Remover, promover, banir", icon: Users },
  { id: "candidaturas", label: "Candidaturas", desc: "Aprovar/rejeitar pedidos de entrada", icon: FileCheck },
  { id: "moderadores", label: "Moderadores", desc: "Adicionar/remover moderadores", icon: Shield },
  { id: "definicoes", label: "Definições", desc: "Acesso, convites, funcionalidades", icon: Settings },
]

export default function TriboGerirPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Settings className="w-5 h-5" />Gestão da Tribo</h1></div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-300">⚠️ Apenas Fundador e Moderadores têm acesso.</div>
      <div className="space-y-3">{MANAGE_LINKS.map(l => <Link key={l.id} href={`/tribos/${slug}/gerir/${l.id}`} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><l.icon className="w-5 h-5 text-primary" /></div><div><p className="text-sm font-bold">{l.label}</p><p className="text-[10px] text-muted-foreground">{l.desc}</p></div></Link>)}</div>
    </div>
  )
}
