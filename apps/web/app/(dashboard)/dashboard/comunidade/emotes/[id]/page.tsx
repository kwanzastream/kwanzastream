"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function EmoteDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/emotes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Emote :hype:</h1></div>
      <div className="flex gap-4 items-end justify-center py-4">{[28,56,112].map(s => <div key={s} className="text-center"><div className="rounded bg-primary/10 flex items-center justify-center mx-auto" style={{width:s,height:s}}><span style={{fontSize:s*0.6}}>🔥</span></div><p className="text-[8px] text-muted-foreground mt-1">{s}×{s}</p></div>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Tier: Todos os viewers</p></div>
      <div className="flex gap-1"><Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => toast.info("Emote desactivado")}>Desactivar</Button><Button variant="outline" size="sm" className="text-xs text-red-400 border-red-500/20 gap-1" onClick={() => toast.success("Emote eliminado")}><Trash2 className="w-3 h-3" />Eliminar</Button></div>
    </div>
  )
}
