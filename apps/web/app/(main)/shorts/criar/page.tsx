"use client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Smartphone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ShortsCriarPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Smartphone className="w-12 h-12 text-muted-foreground/30" />
      <p className="text-lg font-bold">Faz login para criar shorts</p>
      <Button onClick={() => router.push("/entrar?redirectTo=/shorts/criar")}>Entrar</Button>
    </div>
  )

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/shorts/feed"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Criar Short</h1></div>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/shorts/criar/gravar" className="p-8 rounded-2xl border border-white/10 hover:border-primary/30 bg-white/[0.02] hover:bg-primary/5 flex flex-col items-center gap-3 transition-all group">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20"><Camera className="w-6 h-6 text-primary" /></div>
          <p className="font-bold text-sm">Gravar</p>
          <p className="text-[10px] text-muted-foreground text-center">Usar câmara para gravar em tempo real</p>
        </Link>
        <Link href="/shorts/criar/upload" className="p-8 rounded-2xl border border-white/10 hover:border-primary/30 bg-white/[0.02] hover:bg-primary/5 flex flex-col items-center gap-3 transition-all group">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20"><Upload className="w-6 h-6 text-primary" /></div>
          <p className="font-bold text-sm">Upload</p>
          <p className="text-[10px] text-muted-foreground text-center">Enviar vídeo já gravado</p>
        </Link>
      </div>

      <p className="text-[10px] text-muted-foreground text-center">Formatos: MP4, MOV, WebM · Máximo 60 segundos · Até 100MB</p>
    </div>
  )
}
