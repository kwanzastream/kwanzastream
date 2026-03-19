"use client"
import { ShortEditor } from "@/components/shorts/short-editor"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShortsEditarPage() {
  return (
    <div className="py-4 px-4">
      <div className="flex items-center gap-3 mb-4 max-w-lg mx-auto"><Link href="/shorts/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editor</h1></div>
      <ShortEditor activeTab="cortar">
        <p className="text-xs text-muted-foreground text-center py-8">Selecciona uma aba para editar o teu short</p>
      </ShortEditor>
      <div className="max-w-lg mx-auto mt-4"><Link href="/shorts/criar/publicar"><Button className="w-full">Publicar →</Button></Link></div>
    </div>
  )
}
