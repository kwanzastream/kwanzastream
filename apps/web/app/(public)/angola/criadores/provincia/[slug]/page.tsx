"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { CreatorAngolaCard } from "@/components/angola/creator-angola-card"
import { getProvince } from "@/lib/angola-provinces"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"

export default function CriadoresProvinciaPage() {
  const { slug } = useParams()
  const prov = getProvince(slug as string)
  const [creators, setCreators] = useState<any[]>([])
  useEffect(() => { api.get(`/api/angola/creators/province/${slug}`).then(r => setCreators(r.data || [])).catch(() => {}) }, [slug])
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/angola/criadores" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Criadores</Link>
      <h1 className="text-2xl font-bold">Criadores de {prov?.name || slug}</h1>
      <p className="text-xs text-muted-foreground">{creators.length} criadores activos</p>
      <div className="space-y-2">{creators.map((c: any) => <CreatorAngolaCard key={c.id} {...c} />)}</div>
    </div>
  )
}
