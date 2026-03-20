"use client"
import { Upload, Trash2, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
export default function BannerPage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/perfil"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Banner do Canal</h1></div>
      <div className="aspect-[3.5/1] rounded-2xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20"><Image className="w-12 h-12 text-muted-foreground/20" /></div>
      <div className="flex gap-2"><Button className="gap-1 text-xs"><Upload className="w-3 h-3" />Carregar banner</Button><Button variant="outline" className="gap-1 text-xs"><Trash2 className="w-3 h-3" />Remover</Button></div>
      <div className="p-3 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-0.5"><p>• Recomendado: 1200×340px</p><p>• Máximo: 10MB</p><p>• O banner será responsivo em desktop, tablet e mobile</p></div>
    </div>
  )
}
