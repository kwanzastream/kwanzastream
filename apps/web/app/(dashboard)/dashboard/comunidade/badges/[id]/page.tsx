"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function BadgeDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/badges"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Badge — {id}</h1></div>
      <div className="flex items-center justify-center py-4 gap-3">{[18,36,72].map(s => <div key={s} className="text-center"><div className="rounded bg-primary/10 flex items-center justify-center mx-auto" style={{width:s,height:s}}><span style={{fontSize:s*0.7}}>🥇</span></div><p className="text-[8px] text-muted-foreground mt-1">{s}px</p></div>)}</div>
      <div className="flex gap-1"><Button variant="outline" size="sm" className="flex-1 text-xs gap-1"><Upload className="w-3 h-3" />Substituir imagem</Button><Button variant="outline" size="sm" className="text-xs text-red-400 gap-1"><Trash2 className="w-3 h-3" />Desactivar</Button></div>
    </div>
  )
}
