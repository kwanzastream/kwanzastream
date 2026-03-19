"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, Calendar, Eye, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TorneioBracketJogoPage() {
  const { id, ronda, jogo } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/bracket/${ronda}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Jogo {jogo}</h1></div>
      {/* Versus card */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-around p-6 bg-gradient-to-r from-primary/10 to-yellow-500/10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-black text-primary mx-auto">A</div>
            <p className="text-sm font-bold">Team Alpha</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-primary">2 - 0</p>
            <Badge className="bg-green-500/10 text-green-400 text-[9px] mt-1">Concluído</Badge>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-black text-muted-foreground mx-auto">B</div>
            <p className="text-sm font-bold">Team Beta</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 text-xs text-muted-foreground border-t border-white/10">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />20 Mar 2026</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />14:30 WAT</span>
        </div>
      </div>
      {/* Stream embed placeholder */}
      <div className="aspect-video rounded-xl bg-black border border-white/10 flex items-center justify-center text-white/20 text-sm">Stream do jogo</div>
      <p className="text-[9px] text-muted-foreground text-center">Clips criados durante este jogo aparecerão aqui</p>
    </div>
  )
}
