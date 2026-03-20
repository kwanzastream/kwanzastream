"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ClipThumbnailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/clips/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Thumbnail do Clip</h1></div>
      <div className="grid grid-cols-5 gap-1">{Array.from({length:10},(_,i) => <button key={i} className="aspect-video rounded bg-primary/10 flex items-center justify-center text-[8px] border-2 border-transparent hover:border-primary">{i*3}s</button>)}</div>
      <div className="p-6 border-2 border-dashed border-white/20 rounded-xl text-center"><Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" /><p className="text-xs text-muted-foreground">Ou carregar imagem</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Thumbnail aplicado!")}><Check className="w-3 h-3" />Aplicar</Button>
    </div>
  )
}
