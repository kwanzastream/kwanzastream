"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const FRAMES = ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30"]
export default function VodThumbnailPage() {
  const { id } = useParams()
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/vods/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Thumbnail do VOD</h1></div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Opção A: Escolher frame</p><div className="grid grid-cols-5 gap-1">{FRAMES.map(f => <button key={f} onClick={() => setSelected(f)} className={`aspect-video rounded bg-primary/10 flex items-center justify-center text-[8px] border-2 transition-all ${selected === f ? "border-primary" : "border-transparent"}`}>{f}</button>)}</div></div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Opção B: Upload</p><div className="p-6 border-2 border-dashed border-white/20 rounded-xl text-center"><Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" /><p className="text-xs text-muted-foreground">JPG, PNG, WebP · 1280×720px · Máx 5MB</p></div></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Thumbnail aplicado!")}><Check className="w-3 h-3" />Aplicar thumbnail</Button>
    </div>
  )
}
