"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import { CampChapterContent } from "@/components/kwanza-camp/camp-chapter-content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

const ANGOLA_TIPS: Record<string, string> = {
  "configurar-obs": "Com 4G Unitel, usa bitrate de 1500 kbps. Com WiFi, podes usar 2500 kbps.",
  "transmitir-telemovel": "A app Kwanza Stream funciona bem em Android com 3G.",
  "economizar-dados": "Desliga a opção 'Preview' no OBS para poupar 30% de dados.",
  "melhores-horarios": "Em Angola, o pico de audiência é entre 20h-23h WAT.",
  "activar-salos": "Os Salos podem ser enviados via multicaixa express.",
}

export default function DashboardCapituloPage() {
  const params = useParams()
  const modulo = params.modulo as string
  const capitulo = params.capitulo as string
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    api.get("/api/camp/curriculum")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const curriculum = data?.curriculum || {}
  const progress: string[] = data?.progress || []
  let mod: any = null, level: any = null, levelKey = ""
  for (const key of ['nivel-1', 'nivel-2', 'nivel-3']) {
    const lv = curriculum[key]
    const m = lv?.modules?.find((m: any) => m.slug === modulo)
    if (m) { mod = m; level = lv; levelKey = key; break }
  }

  const chIdx = mod?.chapters?.findIndex((c: any) => c.slug === capitulo)
  const chapter = mod?.chapters?.[chIdx]
  if (!chapter) return <div className="text-center py-20 text-muted-foreground">Capítulo não encontrado</div>

  const slug = `${levelKey}/${modulo}/${capitulo}`
  const isCompleted = progress.includes(slug)
  const next = chIdx < mod.chapters.length - 1 ? mod.chapters[chIdx + 1] : null

  const handleMark = async () => {
    setMarking(true)
    try {
      const res = await api.post("/api/camp/progress", { chapterSlug: slug })
      if (res.data.certificate) toast.success(`🏆 Certificado de Nível ${res.data.certificate.level} ganho!`)
      else toast.success("Completo!")
      if (next) router.push(`/dashboard/kwanza-camp/${modulo}/${next.slug}`)
      else router.push(`/dashboard/kwanza-camp/${modulo}`)
    } catch { toast.error("Erro") }
    finally { setMarking(false) }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link href={`/dashboard/kwanza-camp/${modulo}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> {mod.title}
      </Link>

      <h1 className="text-xl font-bold">{chapter.title}</h1>

      <CampChapterContent
        title={chapter.title}
        content={`Conteúdo do capítulo "${chapter.title}" em PT-AO.\n\nEste capítulo será expandido com conteúdo completo.`}
        angolaTip={ANGOLA_TIPS[capitulo]}
      />

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div />
        {isCompleted ? (
          <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" />Completo</span>
        ) : (
          <Button onClick={handleMark} disabled={marking} className="gap-1.5">
            {marking && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <CheckCircle className="w-3.5 h-3.5" />Marcar completo
            {next && <ChevronRight className="w-3 h-3" />}
          </Button>
        )}
      </div>
    </div>
  )
}
