"use client"
import { useParams } from "next/navigation"
import { getProvince, ANGOLA_PROVINCES } from "@/lib/angola-provinces"
import Link from "next/link"
import { MapPin } from "lucide-react"

export default function ProvinciaPage() {
  const { slug } = useParams()
  const p = getProvince(slug as string)
  if (!p) return <div className="text-center py-20 text-muted-foreground">Província não encontrada. <Link href="/angola/mapa" className="text-primary">Ver mapa</Link></div>
  const tabs = [
    { label: "Streams", href: `/provincias/${slug}/streams` }, { label: "Criadores", href: `/provincias/${slug}/criadores` },
    { label: "Eventos", href: `/provincias/${slug}/eventos` }, { label: "Top Canais", href: `/provincias/${slug}/top-canais` },
    { label: "Torneios", href: `/provincias/${slug}/torneios` },
  ]
  const mockStats = { streams: Math.floor(Math.random() * 40) + 5, creators: Math.floor(Math.random() * 80) + 10, viewers: Math.floor(Math.random() * 5000) + 500 }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3"><MapPin className="w-8 h-8 text-primary" /><div><h1 className="text-2xl font-bold">{p.name}</h1><p className="text-xs text-muted-foreground">Capital: {p.capital}</p></div></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold text-red-500">🔴 {mockStats.streams}</p><p className="text-[9px] text-muted-foreground">ao vivo agora</p></div>
        <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">{mockStats.creators}</p><p className="text-[9px] text-muted-foreground">criadores</p></div>
        <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">{mockStats.viewers.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">viewers esta semana</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">{tabs.map(t => (
        <Link key={t.href} href={t.href} className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-primary/20 text-xs transition-all">{t.label}</Link>
      ))}</div>
    </div>
  )
}
