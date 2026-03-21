"use client"

import { useState, useEffect } from "react"
import { Loader2, GraduationCap, BookOpen, ArrowRight, Award } from "lucide-react"
import { CampProgressBar } from "@/components/kwanza-camp/camp-progress-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function DashboardCampPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/camp/progress")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  if (!data) {
    return (
      <div className="max-w-xl space-y-4">
        <h1 className="text-xl font-bold">Kwanza Camp</h1>
        <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/5 to-purple-500/5 text-center space-y-3">
          <GraduationCap className="w-10 h-10 text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Aprende a criar conteúdo profissional em Angola</p>
          <Link href="/kwanza-camp"><Button className="gap-1.5"><BookOpen className="w-3.5 h-3.5" />Começar</Button></Link>
        </div>
      </div>
    )
  }

  const levels = data.levels || []
  const next = data.nextChapter
  const overallPct = levels.length > 0 ? Math.round(levels.reduce((s: number, l: any) => s + l.percentage, 0) / levels.length) : 0

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold">Kwanza Camp — O teu progresso</h1>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Progresso geral: {overallPct}%</p>
        <CampProgressBar percentage={overallPct} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {levels.map((l: any) => (
          <div key={l.level} className="p-3 rounded-xl border border-white/10 text-center">
            <p className="text-[10px] text-muted-foreground">Nível {l.level}</p>
            <p className="text-lg font-bold">{l.percentage}%</p>
            <CampProgressBar percentage={l.percentage} size="sm" showLabel={false} />
            <p className="text-[9px] text-muted-foreground mt-1">{l.completed}/{l.total}</p>
            {l.certificate && <Award className="w-4 h-4 text-yellow-400 mx-auto mt-1" />}
          </div>
        ))}
      </div>

      {next && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
          <p className="text-sm font-semibold">Próximo capítulo</p>
          <p className="text-xs text-muted-foreground">{next.level} · {next.module}</p>
          <p className="text-sm text-primary">"{next.title}"</p>
          <Link href={`/kwanza-camp/${next.slug.split('/').slice(0, 2).join('/')}`}>
            <Button size="sm" className="gap-1.5 mt-1">Continuar <ArrowRight className="w-3 h-3" /></Button>
          </Link>
        </div>
      )}

      <Link href="/kwanza-camp" className="block">
        <Button variant="outline" size="sm" className="gap-1.5"><BookOpen className="w-3.5 h-3.5" />Ver todos os módulos</Button>
      </Link>
    </div>
  )
}
