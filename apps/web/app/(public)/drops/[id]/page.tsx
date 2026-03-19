"use client"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gift, Clock, Radio, Eye, UserPlus } from "lucide-react"
import Link from "next/link"

export default function DropDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const pct = user ? 80 : 0
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/drops/activos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Drop</h1></div>

      {/* Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-yellow-500/10 flex items-center justify-center">
        <div className="text-center space-y-2"><Gift className="w-12 h-12 text-primary mx-auto" /><p className="text-lg font-black">500MB de dados Unitel</p><p className="text-xs text-muted-foreground">Patrocinado por Unitel</p></div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3"><Badge className="bg-blue-500/10 text-blue-400 text-[9px]">Em progresso</Badge><span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Termina em 2 dias</span><span className="text-[10px] text-muted-foreground">2.340 de 5.000 disponíveis</span></div>

      {/* Progress */}
      {user ? (
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <p className="text-xs font-bold">O teu progresso</p>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
          <p className="text-[10px] text-muted-foreground">{pct}% — 96 de 120 minutos assistidos</p>
          {pct >= 100 && <Link href={`/drops/${id}/resgatar`}><Button size="sm" className="w-full mt-2 gap-1"><Gift className="w-3 h-3" />Resgatar agora</Button></Link>}
        </div>
      ) : <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3"><UserPlus className="w-5 h-5 text-primary" /><p className="text-xs">Cria conta para acompanhar progresso</p><Link href="/registar"><Button size="sm" className="text-[10px]">Criar conta</Button></Link></div>}

      {/* Requirement */}
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold">Requisito</p>
        <p className="text-sm">Assiste 120 minutos em streams de <span className="text-primary font-bold">Gaming</span> entre 15–31 Março 2026</p>
      </div>

      {/* T&C */}
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold">Termos e Condições</p>
        <ul className="text-[10px] text-muted-foreground space-y-1 list-disc list-inside"><li>Limite de 1 drop por utilizador</li><li>Código válido por 7 dias após resgate</li><li>Dados creditados em 24h</li><li>Exclusivo Angola (número Unitel)</li></ul>
      </div>

      {/* Eligible streams */}
      <div className="space-y-2">
        <p className="text-xs font-bold flex items-center gap-1"><Radio className="w-4 h-4 text-red-400 animate-pulse" />Streams elegíveis ao vivo</p>
        <div className="space-y-2">{[{ channel: "esports_ao", title: "FIFA 25 — Torneio Luanda Cup", viewers: 890 }, { channel: "gamer_angola", title: "CS2 Ranked grind", viewers: 340 }].map(s => <Link key={s.channel} href={`/${s.channel}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all"><Radio className="w-4 h-4 text-red-400 animate-pulse shrink-0" /><div className="flex-1"><p className="text-xs font-bold">{s.title}</p><p className="text-[9px] text-muted-foreground">@{s.channel}</p></div><span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Eye className="w-3 h-3" />{s.viewers}</span></Link>)}</div>
      </div>

      <Link href={`/drops/${id}/como-ganhar`} className="block text-xs text-primary hover:underline text-center">Saber mais sobre como ganhar →</Link>
    </div>
  )
}
