"use client"
import { useState } from "react"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function VodUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/vods"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Upload de VOD</h1></div>
      {!uploading ? (
        <div className="p-8 border-2 border-dashed border-white/20 rounded-2xl text-center space-y-3"><Upload className="w-10 h-10 mx-auto text-muted-foreground" /><p className="text-sm font-bold">Arrasta o ficheiro ou clica para seleccionar</p><p className="text-[10px] text-muted-foreground">MP4, MOV, MKV · Máximo 50GB · Até 12 horas</p><Button onClick={() => { setUploading(true); const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); toast.success("Upload completo! Em processamento..."); return 100 } return p + 10 }), 500) }}>Seleccionar ficheiro</Button></div>
      ) : (
        <div className="p-5 rounded-2xl border border-white/10 space-y-3"><div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-primary" /><p className="text-xs font-bold">A carregar... {progress}%</p></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-primary transition-all" style={{width:`${progress}%`}} /></div>{progress >= 100 && <div className="space-y-2"><p className="text-[10px] text-green-400 font-bold">✅ Upload completo</p><p className="text-[10px] text-muted-foreground">Em processamento (FFmpeg). Receberás notificação quando estiver pronto.</p><Input placeholder="Título do VOD" className="bg-white/5" /><Button className="w-full">Guardar e processar</Button></div>}</div>
      )}
    </div>
  )
}
