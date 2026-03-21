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
  "transmitir-telemovel": "A app Kwanza Stream funciona bem em Android com 3G. Fecha outras apps para poupar dados.",
  "economizar-dados": "Desliga a opção 'Preview' no OBS para poupar 30% de dados durante o stream.",
  "configuracoes-angola": "Para Luanda com Unitel 4G: resolução 720p, bitrate 1500kbps, keyframe 2s.",
  "melhores-horarios": "Em Angola, o pico de audiência é entre 20h-23h WAT, especialmente sextas e sábados.",
  "partilhar-whatsapp": "Cria um grupo WhatsApp só para o teu canal. Partilha o link 15min antes de ir ao vivo.",
  "activar-salos": "Os Salos podem ser enviados via multicaixa express — sem necessidade de cartão internacional.",
}

const CONTENT: Record<string, string> = {
  "o-que-precisas": "Para começar a transmitir na Kwanza Stream, precisas de muito pouco:\n\n• Um smartphone ou computador\n• Ligação à internet (3G mínimo, 4G recomendado)\n• Uma conta na Kwanza Stream\n• Vontade de criar!\n\nNão precisas de equipamento profissional. Muitos dos melhores criadores angolanos começaram apenas com o telemóvel.",
  "configurar-obs": "O OBS Studio é o software mais usado para streaming.\n\n1. Descarrega o OBS em obsproject.com\n2. Abre o OBS e vai a 'Configurações'\n3. Em 'Stream', seleciona 'Personalizado' e cola o servidor RTMP\n4. Em 'Saída', define o bitrate para 1500-2500 kbps\n5. Em 'Vídeo', usa 1280×720 (720p)",
}

export default function CapituloPage() {
  const params = useParams()
  const nivel = params.nivel as string
  const modulo = params.modulo as string
  const capitulo = params.capitulo as string
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    api.get("/api/camp/curriculum").then(res => setData(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const level = data?.curriculum?.[nivel]
  const mod = level?.modules?.find((m: any) => m.slug === modulo)
  const chIdx = mod?.chapters?.findIndex((c: any) => c.slug === capitulo)
  const chapter = mod?.chapters?.[chIdx]
  const progress: string[] = data?.progress || []
  const slug = `${nivel}/${modulo}/${capitulo}`
  const isCompleted = progress.includes(slug)
  const next = chIdx < (mod?.chapters?.length || 0) - 1 ? mod.chapters[chIdx + 1] : null

  if (!chapter) return <div className="text-center py-20 text-muted-foreground">Capítulo não encontrado</div>

  const handleMark = async () => {
    setMarking(true)
    try {
      const res = await api.post("/api/camp/progress", { chapterSlug: slug })
      if (res.data.certificate) toast.success(`🏆 Certificado Nível ${res.data.certificate.level} ganho!`)
      else toast.success("Capítulo completo!")
      if (next) router.push(`/kwanza-camp/${nivel}/${modulo}/${next.slug}`)
      else router.push(`/kwanza-camp/${nivel}/${modulo}`)
    } catch { toast.error("Erro") }
    finally { setMarking(false) }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/kwanza-camp/${nivel}/${modulo}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> {mod.title} ({chIdx + 1}/{mod.chapters.length})
      </Link>
      <h1 className="text-xl font-bold">{chapter.title}</h1>
      <CampChapterContent title={chapter.title}
        content={CONTENT[capitulo] || `Conteúdo do capítulo "${chapter.title}" em PT-AO.\n\nEste capítulo será expandido com conteúdo completo.`}
        angolaTip={ANGOLA_TIPS[capitulo]} />
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div />
        {isCompleted ? (
          <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" />Completo</span>
        ) : (
          <Button onClick={handleMark} disabled={marking} className="gap-1.5">
            {marking && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <CheckCircle className="w-3.5 h-3.5" />Marcar completo{next && <ChevronRight className="w-3 h-3" />}
          </Button>
        )}
      </div>
    </div>
  )
}
