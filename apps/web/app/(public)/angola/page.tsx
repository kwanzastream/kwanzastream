"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Map, Music, Trophy, TrendingUp, Globe, GraduationCap, Users, Heart } from "lucide-react"
import api from "@/lib/api"

export default function AngolaHubPage() {
  const [stats, setStats] = useState<any>(null)
  useEffect(() => { api.get("/api/angola/stats").then(r => setStats(r.data)).catch(() => setStats({ liveStreams: 234, viewers: 12400, activeProvinces: 18, totalCreators: 1560 })) }, [])

  const sections = [
    { icon: Map, title: "Mapa ao Vivo", desc: "21 províncias em tempo real", href: "/angola/mapa" },
    { icon: Music, title: "Cultura", desc: "Kuduro, Semba, Kizomba", href: "/angola/cultura" },
    { icon: Trophy, title: "Top Criadores", desc: "Os melhores criadores angolanos", href: "/angola/criadores" },
    { icon: TrendingUp, title: "Tendências", desc: "O que está em alta em Angola", href: "/angola/tendencias" },
    { icon: Globe, title: "Diáspora", desc: "Angolanos no mundo", href: "/angola/diaspora" },
    { icon: GraduationCap, title: "Educação", desc: "Formação para criadores", href: "/educacao" },
    { icon: Heart, title: "Impacto Social", desc: "O nosso impacto em Angola", href: "/impacto-social" },
    { icon: Trophy, title: "Kwanza Awards", desc: "Cerimónia anual de premiação", href: "/kwanza-awards" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-5xl">🇦🇴</span>
        <h1 className="text-3xl font-bold">Angola no Kwanza Stream</h1>
        <p className="text-muted-foreground">Descobre o que Angola tem de melhor</p>
      </div>
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold text-red-500">🔴 {stats.liveStreams}</p><p className="text-[9px] text-muted-foreground">streams ao vivo</p></div>
          <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">👁 {stats.viewers?.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">viewers angolanos</p></div>
          <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">{stats.activeProvinces}/21</p><p className="text-[9px] text-muted-foreground">províncias</p></div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sections.map((s, i) => (
          <Link key={i} href={s.href} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all text-center space-y-1">
            <s.icon className="w-6 h-6 text-primary mx-auto" /><p className="text-sm font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
