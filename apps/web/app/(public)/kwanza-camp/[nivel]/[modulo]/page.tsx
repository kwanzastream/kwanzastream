"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import { CampChapterItem } from "@/components/kwanza-camp/camp-chapter-item"
import { CampProgressBar } from "@/components/kwanza-camp/camp-progress-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function ModuloPage() {
  const params = useParams()
  const nivel = params.nivel as string
  const modulo = params.modulo as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    api.get("/api/camp/curriculum").then(res => setData(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const level = data?.curriculum?.[nivel]
  const mod = level?.modules?.find((m: any) => m.slug === modulo)
  const progress: string[] = data?.progress || []

  if (!mod) return <div className="text-center py-20 text-muted-foreground">Módulo não encontrado</div>

  const chapters = mod.chapters.map((ch: any, i: number) => {
    const slug = `${nivel}/${mod.slug}/${ch.slug}`
    const isCompleted = progress.includes(slug)
    const prevDone = i === 0 ? true : progress.includes(`${nivel}/${mod.slug}/${mod.chapters[i - 1].slug}`)
    return { ...ch, slug, status: isCompleted ? "completed" : prevDone ? "current" : "locked" }
  })

  const completed = chapters.filter((c: any) => c.status === "completed").length
  const pct = Math.round((completed / chapters.length) * 100)
  const next = chapters.find((c: any) => c.status === "current")

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/kwanza-camp/${nivel}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Nível {level.level}
      </Link>
      <div>
        <p className="text-[10px] text-muted-foreground">Nível {level.level} · Módulo</p>
        <h1 className="text-xl font-bold mt-1">{mod.title}</h1>
      </div>
      <CampProgressBar percentage={pct} />
      <p className="text-[10px] text-muted-foreground">{completed}/{chapters.length} capítulos</p>
      <div className="space-y-2">
        {chapters.map((ch: any, i: number) => (
          <CampChapterItem key={ch.slug} index={i} title={ch.title} duration={ch.duration} status={ch.status}
            onClick={() => router.push(`/kwanza-camp/${nivel}/${modulo}/${ch.slug}`)} />
        ))}
      </div>
      {next && (
        <Link href={`/kwanza-camp/${nivel}/${modulo}/${next.slug.split('/').pop()}`}>
          <Button className="w-full gap-1.5">Continuar → Cap. {chapters.indexOf(next) + 1}</Button>
        </Link>
      )}
    </div>
  )
}
