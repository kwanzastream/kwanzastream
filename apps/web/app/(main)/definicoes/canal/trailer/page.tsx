"use client"
import { ArrowLeft, Video, Upload, Trash2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function TrailerPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Video className="w-5 h-5" />Trailer do Canal</h1></div>
      <p className="text-[10px] text-muted-foreground">Aparece para não-seguidores quando visitam o teu canal.</p>
      <div className="aspect-video rounded-2xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20"><Video className="w-12 h-12 text-muted-foreground/20" /></div>
      <div className="flex gap-2"><Button className="gap-1 text-xs"><Upload className="w-3 h-3" />Carregar vídeo</Button><Button variant="outline" className="gap-1 text-xs"><Trash2 className="w-3 h-3" />Remover</Button></div>
      <div className="p-3 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-0.5"><p className="flex items-center gap-1"><Info className="w-3 h-3 text-primary" />Requisitos:</p><p>• Máximo: 90 segundos</p><p>• Tamanho máximo: 500MB</p><p>• Ou URL de um VOD existente do teu canal</p></div>
    </div>
  )
}
