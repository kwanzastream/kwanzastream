"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { Crown, Calendar, Trophy } from "lucide-react"
import Link from "next/link"

export default function TriboSobrePage() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      <div className="space-y-4">
        <div className="prose prose-invert prose-sm max-w-none"><p>A tribo do Kuduro. Música, dança, cultura angolana pura. Junta-te à melhor comunidade de Kuduro da plataforma. Criadores de conteúdo, DJs, dançarinos e fãs — todos são bem-vindos.</p></div>
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <h3 className="text-sm font-bold flex items-center gap-1.5"><Crown className="w-4 h-4 text-yellow-400" />Fundador</h3>
          <Link href="/kuduro_master" className="flex items-center gap-2 text-sm hover:text-primary"><div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-xs font-bold text-yellow-400">K</div>Kuduro Master</Link>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />Criada em Janeiro 2025</p>
        </div>
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <h3 className="text-sm font-bold flex items-center gap-1.5"><Trophy className="w-4 h-4 text-primary" />Conquistas</h3>
          <div className="flex flex-wrap gap-2 text-xs"><span className="px-2 py-1 rounded-lg bg-white/5">🎯 10.000 membros</span><span className="px-2 py-1 rounded-lg bg-white/5">🔥 1.000 streams</span><span className="px-2 py-1 rounded-lg bg-white/5">📱 100K clips views</span></div>
        </div>
        <Link href={`/tribos/${slug}/regras`} className="block text-xs text-primary hover:underline">Ver regras da tribo →</Link>
      </div>
    </div>
  )
}
