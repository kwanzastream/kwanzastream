"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, ImageIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

const MOCK_IMAGES = [
  { id: "g1", url: "", alt: "Poster oficial", width: 1200, height: 675 },
  { id: "g2", url: "", alt: "Screenshot da transmissão", width: 1920, height: 1080 },
  { id: "g3", url: "", alt: "Equipa vencedora", width: 800, height: 600 },
  { id: "g4", url: "", alt: "Público no local", width: 1200, height: 800 },
]

export default function EventGaleriaPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><ImageIcon className="w-5 h-5" />Galeria</h1></div>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {MOCK_IMAGES.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all break-inside-avoid">
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center" style={{ aspectRatio: `${img.width}/${img.height}` }}>
              <ImageIcon className="w-8 h-8 text-white/10" />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" variant="outline" className="text-xs gap-1 text-white border-white/30" onClick={() => toast.success("A descarregar...")}><Download className="w-3 h-3" />Download</Button>
            </div>
            <p className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-1.5 py-0.5 rounded">{img.alt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
