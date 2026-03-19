"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import Link from "next/link"

const MOCK = [{ id: "s1", title: "Kuduro dance challenge 🔥", creator: "danca_ao", views: 120000 }, { id: "s2", title: "Beat drop reaction", creator: "beats_angola", views: 45000 }]

export default function TriboShortsPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">{MOCK.map(s => <Link key={s.id} href={`/shorts/${s.id}`} className="rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all"><div className="aspect-[9/16] bg-gradient-to-b from-primary/10 to-purple-500/10" /><div className="p-1.5"><p className="text-[9px] font-bold truncate">{s.title}</p><p className="text-[8px] text-muted-foreground">{(s.views/1000).toFixed(0)}K</p></div></Link>)}</div>
    </div>
  )
}
