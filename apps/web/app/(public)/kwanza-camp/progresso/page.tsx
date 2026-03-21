"use client"

import { useState, useEffect } from "react"
import { Loader2, BookOpen, ArrowRight } from "lucide-react"
import { CampProgressBar } from "@/components/kwanza-camp/camp-progress-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import api from "@/lib/api"

export default function ProgressoPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/camp/progress").then(res => setData(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!data) return <div className="text-center py-20 text-muted-foreground">Inicia sessão para ver o progresso</div>

  const levels = data.levels || []
  const totalMin = data.totalMinutes || 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Progresso no Kwanza Camp</h1>
      {levels.map((l: any) => (
        <div key={l.level} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nível {l.level}</span>
            {l.certificate && <Badge className="bg-green-500/10 text-green-400 text-[9px]">✅ Certificado</Badge>}
          </div>
          <CampProgressBar percentage={l.percentage} />
          <p className="text-[10px] text-muted-foreground">{l.completed}/{l.total} capítulos</p>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">⏱ Tempo total: {Math.floor(totalMin / 60)}h{totalMin % 60 > 0 ? ` ${totalMin % 60}m` : ""}</p>
      {data.nextChapter && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
          <p className="text-sm font-semibold flex items-center gap-2"><BookOpen className="w-4 h-4" />Próxima acção</p>
          <p className="text-sm text-primary">"{data.nextChapter.title}"</p>
          <Link href={`/kwanza-camp/${data.nextChapter.slug.split('/').slice(0, 2).join('/')}`}>
            <Button size="sm" className="gap-1.5 mt-1">Continuar <ArrowRight className="w-3 h-3" /></Button>
          </Link>
        </div>
      )}
    </div>
  )
}
