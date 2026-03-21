"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import { CampChapterItem } from "@/components/kwanza-camp/camp-chapter-item"
import { CampProgressBar } from "@/components/kwanza-camp/camp-progress-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function DashboardModuloPage() {
  const params = useParams()
  const modulo = params.modulo as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    api.get("/api/camp/curriculum")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  // Find module across all levels
  const curriculum = data?.curriculum || {}
  const progress: string[] = data?.progress || []
  let foundMod: any = null, foundLevel: any = null, foundLevelKey = ""
  for (const key of ['nivel-1', 'nivel-2', 'nivel-3']) {
    const level = curriculum[key]
    const mod = level?.modules?.find((m: any) => m.slug === modulo)
    if (mod) { foundMod = mod; foundLevel = level; foundLevelKey = key; break }
  }

  if (!foundMod) return <div className="text-center py-20 text-muted-foreground">Módulo não encontrado</div>

  const chapters = foundMod.chapters.map((ch: any, i: number) => {
    const slug = `${foundLevelKey}/${foundMod.slug}/${ch.slug}`
    const isCompleted = progress.includes(slug)
    const prevDone = i === 0 ? true : progress.includes(`${foundLevelKey}/${foundMod.slug}/${foundMod.chapters[i - 1].slug}`)
    return { ...ch, slug, status: isCompleted ? "completed" : prevDone ? "current" : "locked" }
  })

  const completed = chapters.filter((c: any) => c.status === "completed").length
  const pct = Math.round((completed / chapters.length) * 100)

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/dashboard/kwanza-camp" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Camp
      </Link>

      <div>
        <p className="text-[10px] text-muted-foreground">Nível {foundLevel.level}</p>
        <h1 className="text-xl font-bold">{foundMod.title}</h1>
      </div>

      <CampProgressBar percentage={pct} />
      <p className="text-[10px] text-muted-foreground">{completed}/{chapters.length} capítulos</p>

      <div className="space-y-2">
        {chapters.map((ch: any, i: number) => (
          <CampChapterItem
            key={ch.slug}
            index={i}
            title={ch.title}
            duration={ch.duration}
            status={ch.status}
            onClick={() => router.push(`/dashboard/kwanza-camp/${modulo}/${ch.slug.split('/').pop()}`)}
          />
        ))}
      </div>
    </div>
  )
}
