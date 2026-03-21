"use client"

import { useState, useEffect } from "react"
import { Loader2, GraduationCap, BookOpen } from "lucide-react"
import { CampLevelCard } from "@/components/kwanza-camp/camp-level-card"
import api from "@/lib/api"

export default function KwanzaCampPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/camp/curriculum")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const curriculum = data?.curriculum || {}
  const progress = data?.progress || []

  const getLevelStats = (key: string) => {
    const level = curriculum[key]
    if (!level) return { total: 0, completed: 0 }
    const total = level.modules.reduce((s: number, m: any) => s + m.chapters.length, 0)
    const completed = progress.filter((p: string) => p.startsWith(key)).length
    return { total, completed }
  }

  const levels = ['nivel-1', 'nivel-2', 'nivel-3'].map((key, i) => {
    const stats = getLevelStats(key)
    const prevStats = i > 0 ? getLevelStats(`nivel-${i}`) : { total: 1, completed: 1 }
    const isLocked = i > 0 && prevStats.completed < prevStats.total
    return { key, level: curriculum[key], stats, isLocked }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <GraduationCap className="w-12 h-12 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Kwanza Camp</h1>
        <p className="text-muted-foreground">Aprende a criar conteúdo em Angola</p>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span>🎓 3 níveis</span><span>·</span><span>📚 9 módulos</span><span>·</span><span>📖 36 capítulos</span><span>·</span><span>🏆 Certificado digital</span>
      </div>

      <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
        <span>Tudo em PT-AO</span><span>·</span><span>Criado para Angola</span><span>·</span><span>Gratuito</span><span>·</span><span>No teu ritmo</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {levels.filter(l => l.level).map(({ key, level, stats, isLocked }) => (
          <CampLevelCard key={key} level={level.level} title={level.title} subtitle={level.subtitle}
            totalChapters={stats.total} completedChapters={stats.completed} isLocked={isLocked}
            hasCertificate={stats.completed >= stats.total && stats.total > 0} />
        ))}
      </div>

      {progress.length > 0 && progress.length < 36 && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <BookOpen className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Continua de onde paraste</p>
          <p className="text-xs text-primary mt-1">{progress.length}/36 capítulos completos</p>
        </div>
      )}
    </div>
  )
}
