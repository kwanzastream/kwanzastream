"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import { CampModuleCard } from "@/components/kwanza-camp/camp-module-card"
import { CampProgressBar } from "@/components/kwanza-camp/camp-progress-bar"
import Link from "next/link"
import api from "@/lib/api"

export default function NivelPage() {
  const params = useParams()
  const nivel = params.nivel as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/camp/curriculum")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const level = data?.curriculum?.[nivel]
  const progress: string[] = data?.progress || []

  if (!level) return <div className="text-center py-20 text-muted-foreground">Nível não encontrado</div>

  const totalChapters = level.modules.reduce((s: number, m: any) => s + m.chapters.length, 0)
  const completedChapters = progress.filter((p: string) => p.startsWith(nivel)).length
  const percentage = Math.round((completedChapters / totalChapters) * 100)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/kwanza-camp" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Kwanza Camp
      </Link>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Nível {level.level}</p>
        <h1 className="text-2xl font-bold mt-1">{level.title}</h1>
        <p className="text-sm text-muted-foreground">{level.subtitle}</p>
      </div>
      <CampProgressBar percentage={percentage} />
      <p className="text-[10px] text-muted-foreground">{completedChapters}/{totalChapters} capítulos</p>
      <div className="space-y-3">
        {level.modules.map((mod: any, i: number) => {
          const prevDone = i === 0 ? true : (() => {
            const prev = level.modules[i - 1]
            return prev.chapters.filter((ch: any) => progress.includes(`${nivel}/${prev.slug}/${ch.slug}`)).length >= prev.chapters.length
          })()
          const modCompleted = mod.chapters.filter((ch: any) => progress.includes(`${nivel}/${mod.slug}/${ch.slug}`)).length
          return <CampModuleCard key={mod.slug} levelSlug={nivel} slug={mod.slug} title={mod.title}
            chapterCount={mod.chapters.length} completedCount={modCompleted} duration={mod.duration}
            isLocked={!prevDone} index={i + (level.level - 1) * 3} />
        })}
      </div>
    </div>
  )
}
