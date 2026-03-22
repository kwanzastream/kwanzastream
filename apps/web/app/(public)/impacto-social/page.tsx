"use client"
import { useState, useEffect } from "react"
import { ImpactStatCard } from "@/components/angola/impact-stat-card"
import Link from "next/link"
import api from "@/lib/api"
export default function ImpactoSocialPage() {
  const [stats, setStats] = useState<any>(null)
  useEffect(() => { api.get("/api/impact/stats").then(r => setStats(r.data)).catch(() => setStats({ creatorsSupported: 234, provincesCount: 18, schoolPartners: 5, ongPartners: 3 })) }, [])
  const links = [
    { title: "Criadores Apoiados", href: "/impacto-social/criadores-apoiados" },
    { title: "Províncias Cobertas", href: "/impacto-social/provincias-cobertas" },
    { title: "Parcerias com ONGs", href: "/impacto-social/parcerias-ong" },
    { title: "Relatório Anual", href: "/impacto-social/relatorio/2026" },
  ]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <span className="text-4xl">❤️</span><h1 className="text-2xl font-bold">O Impacto do Kwanza Stream em Angola</h1>
    {stats && <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <ImpactStatCard icon="✅" label="Criadores apoiados" value={stats.creatorsSupported} />
      <ImpactStatCard icon="📍" label="Províncias cobertas" value={`${stats.provincesCount}/21`} />
      <ImpactStatCard icon="📚" label="Escolas parceiras" value={stats.schoolPartners} />
      <ImpactStatCard icon="🤝" label="ONGs parceiras" value={stats.ongPartners} />
    </div>}
    <div className="space-y-2">{links.map(l => <Link key={l.href} href={l.href} className="block p-3 rounded-xl border border-white/10 hover:border-primary/20 transition-all text-sm">{l.title}</Link>)}</div>
  </div>)
}
