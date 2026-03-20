"use client"
import { useState } from "react"
import { Camera, Upload, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
export default function FotoPage() {
  const [preview, setPreview] = useState<string | null>(null)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/perfil"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Foto de Perfil</h1></div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center border-2 border-dashed border-white/20"><User className="w-12 h-12 text-muted-foreground/30" /></div>
        <div className="flex gap-2"><Button className="gap-1 text-xs"><Upload className="w-3 h-3" />Carregar foto</Button><Button variant="outline" className="gap-1 text-xs"><Trash2 className="w-3 h-3" />Remover</Button></div>
      </div>
      <div className="p-3 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-0.5"><p>• Formatos: JPG, PNG, WebP</p><p>• Tamanho mínimo: 200×200px</p><p>• Tamanho máximo: 5MB</p><p>• Recorte circular automático</p></div>
    </div>
  )
}
