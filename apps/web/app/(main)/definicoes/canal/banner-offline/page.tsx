"use client"
import { ArrowLeft, Image, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function BannerOfflinePage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Image className="w-5 h-5" />Banner Offline</h1></div>
      <p className="text-[10px] text-muted-foreground">Aparece quando o teu canal está offline.</p>
      <div className="aspect-video rounded-2xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20"><Image className="w-12 h-12 text-muted-foreground/20" /></div>
      <div className="flex gap-2"><Button className="gap-1 text-xs"><Upload className="w-3 h-3" />Carregar imagem</Button><Button variant="outline" className="gap-1 text-xs"><Trash2 className="w-3 h-3" />Remover</Button></div>
      <p className="text-[10px] text-muted-foreground">Recomendado: 1920×1080px · Máx 5MB</p>
    </div>
  )
}
